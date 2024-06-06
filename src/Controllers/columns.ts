import PocketBase from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "./errors";
import { setUpTasks } from "./tasks";

const pb : Promise<PocketBase | null> = setupDB()
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

  // Delete all current columns
  try {
    const columns : Array<Column> = await pbInstance.collection('columns').getFullList();
    if (columns.length === 0) {
      return;
    } else {
      for (let column of columns) {
        try {
          if (!column.id) {
            return;
          }
          const record: any = await pbInstance.collection('columns').delete(column.id);
          if (record.code) {
            catchPBError(record, "controllers_columns", 17);
          } else {
            catchPBSuccess(record, "controllers_columns", 19, "column deleted");
            columnsStore.update(columns => columns.filter(c => c.id !== column.id));
          }
        } catch (e: any) {
          catchError(e, "controllers_columns");
        }
      }
    }
  } catch (e: any) {
    catchError(e, "controllers_columns");
  }

  // Create the Columns and call the setUpTasks function
  try {
    // A for loop that creates five columns with the names One, Two, Three,
    // Four, and Five and a description with the number of the column
    for (let i = 1; i < 6; i++) {
      const data: { id: string, name: string, description: string, position: number, limit: number } = {
        "id": "",
        "name": `Column ${i}`,
        "description": `Column number ${i}`,
        "position": i,
        "limit": 5
      }
      const record = await pbInstance.collection('columns').create(data);
      if (record.code) {
        catchPBError(record, "controllers_columns", 46);
      } else {
        catchPBSuccess(record, "controllers_columns", 48, "column created");
        data.id = record.id;
        columnsStore.update(columns => [...columns, data]);
      }
    }
    await setUpTasks()
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
    return await pbInstance.collection('columns').getFullList({ requestKey: 'columns' });
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
    return await pbInstance.collection('columns').getFirstListItem(`id = "${id}"`);
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
