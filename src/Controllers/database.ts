import PocketBase from "pocketbase";
import { catchError, catchPBSuccess } from "../Scripts/functions";

const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbUser = import.meta.env.VITE_DATABASE_USER;
const dbPassword = import.meta.env.VITE_DATABASE_PASSWORD;

export async function setupDB(): Promise<PocketBase | null>{
  const pb : PocketBase = new PocketBase(dbUrl);

  try {
    await pb.admins.authWithPassword(dbUser, dbPassword)
  } catch (e: any) {
    catchError(e, "controllers_database", 13);
    return null;
  }

  const dummyRecord = {"id": "", "code": 0, "message": "", collectionId: "", collectionName: "", created: "", updated: "",};
  catchPBSuccess(dummyRecord, "controllers_database", 17, "PocketBase", "initialized")
  return pb;
}

