import {RecordModel} from "pocketbase";

export function catchError(e: Error, location:string) {
  console.error(`ERROR: ${location} - ${location}: ${e}}`);
}

export function catchCustomError(message: string, location: string){
  console.error(`ERROR: ${location}: ${message}`);
}

export function catchPBError(record: RecordModel, location:string, line: number){
  console.error(`POCKETBASE ERROR: ${location} - ${line} : ${record.code} - ${record.message}`);
}

export function catchPBSuccess(record: RecordModel, location:string, line:number, item: string, task: string = "created"){
  console.log(`%cPOCKETBASE SUCCESS: ${location} - ${line} : ${item} ${task} successfully ${record.id}`, 'color: green;');
}