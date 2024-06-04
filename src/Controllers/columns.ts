import PocketBase from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "./errors";
import { tasksStore } from "./tasks";

const pb : Promise<PocketBase | null> = setupDB()
let customError = new Error();
export interface Column{
  id?: string;
  name: string;
  description: string;
  position: number;
  limit: number;
}

export const columnsStore : Writable<Column[]> = writable([]);

export async function setUpColumns() {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  const columns:Array<Column> = [{
      name: "One",
      description: "First Column",
      position: 1,
      limit: 0,
    },
    {
      name: "Two",
      description: "Second Column",
      position: 2,
      limit: 0,
    },
    {
      name: "Three",
      description: "Third Column",
      position: 3,
      limit: 0,
    },
    {
      name: "Four",
      description: "Fourth Column",
      position: 4,
      limit: 0,
    },
    {
      name: "Five",
      description: "Fifth Column",
      position: 5,
      limit: 0,
    }
  ]

  try {
    for (const column of columns) {
      const result = await pbInstance.collection('columns').create(column);
      if (result.code) {
        catchPBError(result, "controllers_columns", 46);
      } else {
        catchPBSuccess(result, "controllers_columns", 48, "column created");
        column.id = result.id;
      }
    }
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }

}

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


//Read - Get All Columns
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

export async function readOneColumn(id: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    console.log(id)
    const column = await pbInstance.collection('columns').getFirstListItem(`id = "${id}"`);
    return column;
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }

}

//Update
export async function renameColumn(id: string, name: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try{
    const result = await pbInstance.collection('columns').update(id, {name: name});
    if (result.code) {
      catchPBError(result, "controllers_columns", 46);
    } else {
      columnsStore.update(columns => {
        const index = columns.findIndex(column => column.id === id);
        columns[index].name = name;
        return columns;
      });
      catchPBSuccess(result, "controllers_columns", 48, "column updated");
    }
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }
}

export async function describeColumn(id: string, description: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try{
    const result = await pbInstance.collection('columns').update(id, {description: description});
    if (result.code) {
      catchPBError(result, "controllers_columns", 46);
    } else {
      columnsStore.update(columns => {
        const index = columns.findIndex(column => column.id === id);
        columns[index].description = description;
        return columns;
      });
      catchPBSuccess(result, "controllers_columns", 48, "column updated");
    }
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }
}
// Functions
