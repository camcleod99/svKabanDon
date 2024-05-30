import PocketBase from "pocketbase";
import { writable } from "svelte/store";
import { setupDB } from "./database";
import { catchError, catchPBError, catchPBSuccess } from "./errors";

const pb : Promise<PocketBase | null> = setupDB()

export const titleStore = writable("");

// Read System Setting
export async function readSettings(key: string) {
  const pbInstance = await pb;
  if (!pbInstance) {
    return;
  }

  try {
    const settings = await pbInstance.collection('system').getFirstListItem(`key="${key}"`);
    return settings;
  } catch (e: any) {
    catchError(e, 'controllers_system_readSystemSettings');
  }
}

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
    catchError(e, "controllers_title_updateTitle");
  }
}