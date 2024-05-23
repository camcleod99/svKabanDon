import PocketBase from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "../Scripts/functions";

const pb : Promise<PocketBase | null> = setupDB()
let customError = new Error();
interface Task{
  id: string;
  name: string;
  description: string;
  weight: number;
  column: string;
}

export const tasksStore : Writable<Task[]> = writable();

//Create
export async function createTask(name: string, description: string, weight: number, column: string) {
  if (!name || !description || !weight || !column) {
    customError.name = "Missing Fields";
    customError.message = "All fields are required";
    catchError(customError, "controllers_tasks", 23);
    return
  }

  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  const data : {id: string, name: string, description: string, weight: number, column: string} = {
    "id": "",
    "name": name,
    "description": description,
    "weight": weight,
    "column": column
  };

  const record = await pbInstance.collection('tasks').create(data);

  if (record.code) {
    catchPBError(record, "controllers_tasks", 46);
  } else {
    catchPBSuccess(record, "controllers_tasks", 48, "task created");
    data.id = record.id;
    tasksStore.update(tasks => [...tasks, data]);
  }
}

//Read - All in Column
export async function readTasksInColumn(id: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    return await pbInstance.collection('tasks').getFullList( { filter: `column.id = "${id}"`, requestKey: `${id}` } );
  } catch (e: any) {
    catchError(e, "Storage_tasks", 63);
  }
}

//- One
export async function readOneTask(id: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    return await pbInstance.collection('tasks').getFirstListItem(`id="${id}"`, { requestKey: id })
  } catch (e: any) {
    catchError(e, "Storage_tasks", 65);
  }
}

//Update

//Delete
export async function deleteTask(id: string){
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const record: any = await pbInstance.collection('tasks').delete(id);
    if (record.code) {
      catchPBError(record, "controllers_tasks", 90);
    } else {
      catchPBSuccess(record, "controllers_tasks", 92, "task deleted");
      tasksStore.update(tasks => tasks.filter(task => task.id !== id));
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks", 96);
  }
}

// Functions
