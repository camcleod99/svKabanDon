import PocketBase, {RecordModel} from "pocketbase";
import { writable, Writable } from 'svelte/store';
import { setupDB } from "./database";
import { catchError, catchPBError } from "./errors";

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
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    // Clear Tasks in Collection
    const tasks : Array<Task> = await pbInstance.collection('tasks').getFullList();
    if (tasks.length !== 0) {
      for (let task of tasks) {
        try {
          const record: any = await pbInstance.collection('tasks').delete(task.id);
          if (record.code) {
            catchPBError(record, "controllers_tasks", 17);
            // remove from the store
          } else {
            tasksStore.update(tasks => tasks.filter(t => t.id !== task.id));
          }
        } catch (e: any) {
          catchError(e, "controllers_tasks");
        }
      }
    }

    // Create Five Tasks in Each Column
    const columns = await pbInstance.collection('columns').getFullList();
    // Quit Out if there are no columns
    if (columns.length === 0) {
      return;
    } else {
      // Loop for task creation
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

// Pull Tasks from Database on Project Load
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
    "weight": -1,
    "column": column
  };

  let record : RecordModel;
  try{
    record = await pbInstance.collection('tasks').create(data);
    if (record.code) {
      catchPBError(record, "controllers_tasks", 46);
    } else {
      data.id = record.id;
      tasksStore.update(tasks => [...tasks, data]);
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }

  // Let's import the bit from "move task" because bollucks to that
  let tasks : Array<Task> = [];
  try {
    tasks = await pbInstance.collection('tasks').getFullList( { filter: `column="${column}"`, requestKey: 'createT' });
    tasks.sort((a, b) => a.weight - b.weight);
    console.log(tasks)
  }
  catch (e: any) {
    catchError(e, "controllers_tasks");
  }

  // Loop through the sorted tasks and update their weight to be in order
  for (let i = 0; i < tasks.length; i++) {
    try {
      const reorderResult = await pbInstance.collection('tasks').update(tasks[i].id, { weight: i+1 });
      const newItem = await pbInstance.collection('tasks').getFirstListItem(`id="${tasks[i].id}"`);
    } catch (e: any) {
      catchError(e, "controllers_tasks");
    }
    // update the store to update the task's weight
    tasksStore.update(tasks => {
      const index = tasks.findIndex(task => task.id === data.id);
      tasks[index].weight = (i+1);
      return tasks;
    });
  }

  // Find all the tasks in the new column, which is now sorted and update the store
  try {
    const newColumnResult = await pbInstance.collection('tasks').getFullList( { filter: `column="${column}"`, requestKey: 'moveT' });
    // Go Through the newColumnResult and update the task in the store completely
    for (let task of newColumnResult) {
      tasksStore.update(tasks => {
        const index = tasks.findIndex(t => t.id === task.id);
        // @ts-ignore - This works, fuck off.
        tasks[index] = task;
        return tasks;
      });
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

//  All
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
//  Rename
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
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks")
  }
}

//  Describe
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
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}

// TODO : THIS FUNCTION IS NOT IMPLEMENTED 100%
//  Move
export async function moveTask(id: string, newColumn: string | undefined) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  // Set the column (id) of the task to the new column and set it's weight to -1 to be sorted to the top, then update the store
  try {
    const moveRestult = await pbInstance.collection('tasks').update(id, { column: newColumn, weight: -1 });
    if (!moveRestult.code){
      tasksStore.update(tasks => {
        const index = tasks.findIndex(task => task.id === id);
        if (newColumn != null) {
          tasks[index].column = newColumn;
        }
        tasks[index].weight = -1;
        return tasks;
      });
    }
  }
  catch (e: any) {
    catchError(e, "controllers_tasks");
  }

  // Get all the tasks in the updated column and sort them by weight
  let tasks : Array<Task> = [];
  try {
    tasks = await pbInstance.collection('tasks').getFullList( { filter: `column="${newColumn}"`, requestKey: 'moveT' });
    tasks.sort((a, b) => a.weight - b.weight);
  }
  catch (e: any) {
    catchError(e, "controllers_tasks");
  }

  // Loop through the sorted tasks and update their weight to be in order
  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i])
    try {
      const reorderResult = await pbInstance.collection('tasks').update(tasks[i].id, { weight: i+1 });
      const newItem = await pbInstance.collection('tasks').getFirstListItem(`id="${tasks[i].id}"`);
      console.log(newItem)
    } catch (e: any) {
      catchError(e, "controllers_tasks");
    }
    // update the store to update the task's weight
    tasksStore.update(tasks => {
      const index = tasks.findIndex(task => task.id === id);
      tasks[index].weight = (i+1);
      return tasks;
    });
  }

  // Find all the tasks in the new column, which is now sorted and update the store
  try {
    const newColumnResult = await pbInstance.collection('tasks').getFullList( { filter: `column="${newColumn}"`, requestKey: 'moveT' });
    // Go Through the newColumnResult and update the task in the store completely
    for (let task of newColumnResult) {
      tasksStore.update(tasks => {
        const index = tasks.findIndex(t => t.id === task.id);
        // @ts-ignore - This works, fuck off.
        tasks[index] = task;
        return tasks;
      });
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }

}


//Delete
//  One
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
      tasksStore.update(tasks => tasks.filter(task => task.id !== id));
      return true;
    }
  } catch (e: any) {
    catchError(e, "controllers_tasks");
  }
}