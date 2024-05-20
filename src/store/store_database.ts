const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbUser = import.meta.env.VITE_DATABASE_USER;
const dbPassword = import.meta.env.VITE_DATABASE_PASSWORD;

import { writable, Writable } from 'svelte/store';
export const titleStore = writable("Waiting for PocketBase");
export const columnsStore : Writable<[]> = writable();
export const tasksStore : Writable<[]> = writable();

import PocketBase, { RecordModel } from 'pocketbase';
const pb = new PocketBase(dbUrl);
// Setup Pocketbase Auth
try {
  await pb.admins.authWithPassword(dbUser, dbPassword)
} catch (e: any) {
  catchError(e, 11);
}

// Create Functions
export async function createTask(name: string, description: string, weight: number, column: string) {
  if (!name || !description || !weight || !column) {
    const e = new Error("All fields are required");
    catchError(e, 12);
    // TODO - LATER - Send Error to UI
    return
  }

  const data = {
    "Name": name,
    "Description": description,
    "Weight": weight,
    "column": column
  };

  const record = await pb.collection('tasks').create(data);

  if (record.code) {
    catchCode(record, 31);
  } else {
    catchSuccess(record, 'Tasks');
  }
}

export async function createColumn(name: string, description: string, position: number) {
  if (!name || !description || !position) {
    const e = new Error("All fields are required");
    catchError(e, 12);
    return
  }

  const data = {
    "name": name,
    "description": description,
    "position": position
  };

  const record = await pb.collection('columns').create(data);

  if (record.code) {
    catchCode(record, 50);
  } else {
    catchSuccess(record, 'Tasks');
  }
}

// Read Functions
export async function readSystemSettings(key: string) {
  try {
    const settings = await pb.collection('system').getFirstListItem(`key="${key}"`);
    return settings;
  } catch (e: any) {
    catchError(e, 62);
  }
}

// TODO - 20 / 5 - Make this work with sections/board so it will display the columns in
export async function readColumns() {
  try {
    const columns = await pb.collection('columns').getFullList()
    return columns;
  } catch (e: any) {
    catchError(e, 81);
  }
}

export async function readTasksOnColumn(id: string) {
  try {
    const tasks = await pb.collection('tasks').getFullList( { filter: `column.id = "${id}"`, requestKey: `${id}` } );
    return tasks;
  } catch (e: any) {
    catchError(e, 90, id);
  }
}

export async function readTask(id: any) {
  try {
    const task = await pb.collection('tasks').getFirstListItem(`id="${id}"`)
    return task;
  } catch (e: any) {
    catchError(e, 99);
  }
}

// Update function
export async function updateTitle(id: string, value: string) {
  try {
    const record= await pb.collection('system').update(id, {value: value});
    if (record.code) {
      catchCode(record, 71);
    } else {
      // We can update the local store with the given at this point as the database has been successfully updated
      catchSuccess(record, 'System')
      titleStore.set(value);
    }
  } catch (e: any) {
    catchError(e, 81);
  }
}

// Destroy Function
export async function destroy(table: string, id: string) {
  try {
    // @ts-ignore TS Is being a whiney brat about this, so this is to shut it up.
    const record : RecordModel = await pb.collection(table).delete(id);
    if (record.code) {
      catchCode(record, 86);
    } else {
      catchSuccess(record, table);
    }
  } catch (e: any) {
    catchError(e, 91);
  }
}

// Dehydration
function catchError(e: Error, line: number, id?) {
  console.error(`ERROR IN store_database - ${line}: ${e.message} ${id ? id : ''}`);
}

function catchCode(record: RecordModel, line: number){
  console.error(`DATABASE ERROR in store_database - ${line} : ${record.code} - ${record.message}`);
}

function catchSuccess(record:  RecordModel, table: string){
  console.log(`%c${table} created successfully ${record.id}`, 'color: green;');
}