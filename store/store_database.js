const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbUser = import.meta.env.VITE_DATABASE_USER;
const dbPassword = import.meta.env.VITE_DATABASE_PASSWORD;

import { writable } from 'svelte/store';
export const titleStore = writable("Waiting for PocketBase");


import PocketBase from 'pocketbase';
const pb = new PocketBase(dbUrl);

try{
  const authData = await pb.admins.authWithPassword(dbUser, dbPassword)
} catch (e) {
  catchError(e, 11);
}

// Create Functions
export async function createTask(name, description, weight, column){
  if(!name || !description || !weight || !column){
    const e = new Error("All fields are required");
    catchError (e, 12);
    // TODO: Send Error to UI
    return
  }

  const data = {
    "Name": name,
    "Description": description,
    "Weight": weight,
    "column": column
  };

  const record = await pb.collection('tasks').create(data);

  if(record.code){
    catchCode(record, 31);
  } else {
    catchSuccess(record, 'Tasks');
  }
}

export async function createColumn(name, description,position){
  if(!name || !description || !position ){
    const e = new Error("All fields are required");
    catchError (e, 12);
    return
  }

  const data = {
    "name": name,
    "description": description,
    "position": position
  };

  const record = await pb.collection('columns').create(data);

  if(record.code){
    catchCode(record, 50);
  } else {
    catchSuccess(record, 'Tasks');
  }
}

// Read Functions
export async function readSystemSettings(key) {
  try {
    const settings = await pb.collection('system').getFirstListItem(`key="${key}"`);
    return settings;
  } catch (e) {
    catchError(e, 62);
  }
}

// TODO - 20/5 - Make this work with sections/board so it will display the columns in
export async function readColumns(){
  try {
    const columns = await pb.collection('columns').getFullList()
    return columns;
  } catch (e) {
    catchError(e, 81);
  }
}

export async function readTasksOnColumn(id){
  try{
    const tasks = await pb.collection('tasks').getList(`column="${id}"`);
    return tasks;
  } catch (e) {
    catchError(e, 90);
  }
}

export async function readTask(id){
  try {
    const task = await pb.collection('tasks').getFirstListItem(`id="${id}"`)
    return task;
  } catch (e) {
    catchError(e, 99);
  }
}

// Update function
export async function updateTitle(id, value){
  try {
    const record = await pb.collection('system').update(id,{value: value});
    if(record.code){
      catchCode(record, 71);
    } else {
      // We can update the local store with the given at this point as the database has been successfully updated
      catchSuccess(record, 'System')
      titleStore.set(value);
    }
  } catch (e){
    catchError(e, 81);
  }
}

// Destroy Function
export async function destroy(table, id)  {
  try{
    const record = await pb.collection(table).delete(id);
    if(record.code){
      catchCode(record, 86);
    } else {
      catchSuccess(record, table);
    }
  } catch (e) {
    catchError(e, 91);
  }
}

// Dehydration
function catchError(e, line){
  console.error(`ERROR IN store_database - ${line}: ${e}`);
}

function catchCode(record, line){
  console.error(`DATABASE ERROR in store_database - ${line} : ${record.code} - ${record.message}`);
}

function catchSuccess(record, table){
  console.log(`%c${table} created successfully ${record.id}`, 'color: green;');
}