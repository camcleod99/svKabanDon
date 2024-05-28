// TODO: REPLACE ALL STORE_DATABASE WITH CONTROLLERS
const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbUser = import.meta.env.VITE_DATABASE_USER;
const dbPassword = import.meta.env.VITE_DATABASE_PASSWORD;

import { writable, Writable } from 'svelte/store';

import { catchError } from '../Controllers/errors';
export const titleStore = writable("Waiting for PocketBase");

interface Column{
  id: string;
  name: string;
  description: string;
  position: number;
}
export const columnsStore : Writable<Column[]> = writable();

interface Task {
  id: string;
  name: string;
  description: string;
  weight: number;
  column: string;
}
export const tasksStore : Writable<Task[]> = writable();

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
    const e = new Error("User Input Error: All fields are required");
    catchError(e, 12);
    return
  }

  const data : {id: string, name: string, description: string, weight: number, column: string} = {
    "id": "",
    "name": name,
    "description": description,
    "weight": weight,
    "column": column
  };

  const record = await pb.collection('tasks').create(data);

  if (record.code) {
    catchCode(record, 31);
  } else {
    catchSuccess(record, 'Tasks');
    const inputID = record.id;
    data.id = inputID;
    tasksStore.update(tasks => [...tasks, data]);
  }
}

export async function createColumn(name: string, description: string, position: number) {
  if (!name || !description || !position) {
    const e = new Error("All fields are required");
    catchError(e, 12);
    return
  }

  const data = {
    "id": "",
    "name": name,
    "description": description,
    "position": position,
  };

  const record = await pb.collection('columns').create(data);
  if (record.code) {
    catchCode(record, 50);
  } else {
    catchSuccess(record, 'Columns');
    data.id = record.id;
    columnsStore.update(columns => [...columns, data]);
  }
}

// Read Functions
export async function readSystemSettings(key: string) {
  try {
    const settings = await pb.collection('system').getFirstListItem(`key="${key}"`);
    return settings;
  } catch (e: any) {
    catchError(e, 'store_database_readSystemSettings');
  }
}

export async function readColumns() {
  try {
    const columns = await pb.collection('columns').getFullList({ requestKey: 'columns' });
    return columns;
  } catch (e: any) {
    catchError(e, 'store_database_readColumns');
  }
}

export async function readTasksOnColumn(id: string) {
  try {
    const tasks = await pb.collection('tasks').getFullList( { filter: `column.id = "${id}"`, requestKey: `${id}` } );
    return tasks;
  } catch (e: any) {
    catchError(e, 'store_database_readTasksOnColumn');
  }
}

export async function readTask(id: any) {
  try {
    const task = await pb.collection('tasks').getFirstListItem(`id="${id}"`)
    return task;
  } catch (e: any) {
    catchError(e, 'store_database_readTask');
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
    catchError(e, 'store_database_updateTitle');
  }
}

// Destroy Function
export async function destroy(table: string, id: string) {
  try {
    const record : any = await pb.collection(table).delete(id);
    if (record.code) {
      catchCode(record, 86);
      switch (table) {
        case 'columns':
          columnsStore.update(columns => columns.filter(column => column.id !== id));
          break;
        case 'tasks':
          tasksStore.update(tasks => tasks.filter(task => task.id !== id));
          break;
      }
    } else {
      catchSuccess(record, table);
    }
  } catch (e: any) {
    catchError(e, 91);
  }
}



// Dehydration
function catchCode(record: RecordModel, line: number){
  console.error(`DATABASE ERROR in store_database - ${line} : ${record.code} - ${record.message}`);
}

function catchSuccess(record:  RecordModel, table: string){
  console.log(`%c${table} created successfully ${record.id}`, 'color: green;');
}

export function catchFuckup(e: Error, file: string, line: number){
  console.error(`ERROR IN ${file} - ${line}: ${e.message}`)
}