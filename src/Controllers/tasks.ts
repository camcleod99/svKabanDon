import PocketBase, {RecordModel} from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "./errors";

const pb : Promise<PocketBase | null> = setupDB()
let customError = new Error();
export interface Task{
  id: string;
  name: string;
  description: string;
  column: string;
  weight: number;
  created?: any;
  updated?: any;
}

export const tasksStore : Writable<Task[]> = writable([]);

export async function setUpTasks() {
  console.log("Setting up tasks")
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {

    // Clear the tasks collection
    const tasks : Array<Task> = await pbInstance.collection('tasks').getFullList();
    if (tasks.length !== 0) {
      for (let task of tasks) {
        try {
          const record: any = await pbInstance.collection('tasks').delete(task.id);
          if (record.code) {
            catchPBError(record, "controllers_tasks", 17);
            // remove from the store
          } else {
            catchPBSuccess(record, "controllers_tasks", 19, "task deleted");
            tasksStore.update(tasks => tasks.filter(t => t.id !== task.id));
          }
        } catch (e: any) {
          catchError(e, "controllers_tasks");
        }
      }
    }

    // For the Five Columns in the board create five tasks
    const columns = await pbInstance.collection('columns').getFullList();
    if (columns.length === 0) {
      return;
    } else {
      for (let column of columns) {
        try {
          for (let i = 1; i < 6; i++) {
            const data : {id: string, name: string, description: string, weight: number, column: string} = {
              "id": "",
              "name": `Task ${i} in ${column.name}`,
              "description": `Description ${String.fromCharCode(96 + i)} in ${column.name}`,
              "weight": i,
              "column": column.id
            };
            let record : RecordModel;
            try {
              record = await pbInstance.collection('tasks').create(data);
              if (record.code) {
                catchPBError(record, "controllers_tasks", 28);
              } else {
                catchPBSuccess(record, "controllers_tasks", 30, "task created");
                data.id = record.id;
                tasksStore.update(tasks => [...tasks, data]);
              }
            } catch (e: any) {
              catchError(e, "controllers_tasks");
            }
          }
        } catch (e: any) {
          catchError(e, "controllers_tasks");
        }
      }
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}

export async function initTasks() {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const tasks : Array<Task> = await pbInstance.collection('tasks').getFullList({ requestKey: 'initT' });
    tasksStore.set(tasks);
    return true;
  }
  catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}

//Create
export async function createTask(name: string, description: string, weight: number, column: string) {
  if (!name || !description || !weight || !column) {
    customError.name = "Missing Fields";
    customError.message = "All fields are required";
    catchError(customError, "controllers_tasks");
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
    "weight": 1,
    "column": column
  };

  let record : RecordModel;
  try{
    record = await pbInstance.collection('tasks').create(data);
    if (record.code) {
      catchPBError(record, "controllers_tasks", 46);
    } else {
      catchPBSuccess(record, "controllers_tasks", 48, "task created");
      data.id = record.id;
      tasksStore.update(tasks => [...tasks, data]);
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}

//Read

//  One
export async function readOneTask(id: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    return await pbInstance.collection('tasks').getFirstListItem(`id="${id}"`, { requestKey: id })
  } catch (e: any) {
    catchError(e, "Storage_tasks");
  }
}
// All
export async function readTasks() {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    return await pbInstance.collection('tasks').getFullList();
  } catch (e: any) {
    catchError(e, "Storage_tasks");
  }
}

//Update
export async function renameTask(id: string, name: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try{
    const result = await pbInstance.collection('tasks').update(id, { name });
    if (result.code){
      catchPBError(result, "controllers_tasks", 82);
    } else {
      tasksStore.update(tasks => {
        const index = tasks.findIndex(task => task.id === id);
        tasks[index].name = name;
        return tasks;
      });
      catchPBSuccess(result, "controllers_tasks", 84, "task updated");
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks")
  }
}

export async function describeTask(id: string, description: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const result = await pbInstance.collection('tasks').update(id, { description });
    if (result.code){
      catchPBError(result, "controllers_tasks", 82);
    } else {
      tasksStore.update(tasks => {
        const index = tasks.findIndex(task => task.id === id);
        tasks[index].description = description;
        return tasks;
      });
      catchPBSuccess(result, "controllers_tasks", 84, "task updated");
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}

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
      return true;
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}