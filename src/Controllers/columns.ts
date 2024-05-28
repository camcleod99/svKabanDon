import PocketBase from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "./errors";

const pb : Promise<PocketBase | null> = setupDB()
let customError = new Error();
export interface Column{
  id: string;
  name: string;
  description: string;
  position: number;
}

export const columnsStore : Writable<Column[]> = writable([]);

export async function initColumns() {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const columns : Array<Column> = await pbInstance.collection('columns').getFullList({ requestKey: 'initC' });
    columnsStore.set(columns);
    return true;
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }

}

//Create
export async function createColumn(name: string, description: string, position: number) {
  if (!name || !description || !position) {
    customError.name = "Missing Fields";
    customError.message = "All fields are required";
    catchError(customError, "controllers_columns");
    return
  }

  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  const data : {id: string, name: string, description: string, position: number} = {
    "id": "",
    "name": name,
    "description": description,
    "position": 1
  };

  const record = await pbInstance.collection('columns').create(data);

  if (record.code) {
    catchPBError(record, "controllers_columns", 46);
  } else {
    catchPBSuccess(record, "controllers_columns", 48, "task created");
    data.id = record.id;
    columnsStore.update(columns => [...columns, data]);
  }
}

//Read
export async function readColumns() {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const columns = await pbInstance.collection('columns').getFullList({ requestKey: 'columns' });
    return columns;
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }
}

//Update

//Delete
export async function deleteColumn(id: string){
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const record: any = await pbInstance.collection('tasks').delete(id);
    if (record.code) {
      catchPBError(record, "controllers_columns", 90);
    } else {
      catchPBSuccess(record, "controllers_columns", 92, "task deleted");
      columnsStore.update(columns => columns.filter(column => column.id !== id));
    }
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }
}

// Functions
