import PocketBase from "pocketbase";
import { writable } from "svelte/store";
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "../Scripts/functions";
export const titleStore = writable("[DEFAULT TITLE]");

const pb : Promise<PocketBase | null> = setupDB()

// Update Title
export async function updateTitle(id: string, value: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const record= await pbInstance.collection('system').update(id, {value: value});
    if (record.code) {
      catchPBError(record, "controllers_title", 19);
    } else {
      catchPBSuccess(record, "controllers_title", 21, "System", "updated")
      titleStore.set(value);
    }
  } catch (e: any) {
    catchError(e, "controllers_title", 23);
  }
}