import {RecordModel} from "pocketbase";

export function catchError(e: Error, location:string, line: number, id?: string) {
  console.error(`ERROR: ${location} - ${line}: ${e.message} ${id ? id : ''}`);
}

export function catchPBError(record: RecordModel, location:string, line: number){
  console.error(`POCKETBASE ERROR: ${location} - ${line} : ${record.code} - ${record.message}`);
}

export function catchPBSuccess(record: RecordModel, location:string, line:number, item: string, task: string = "created"){
  console.log(`%cPOCKETBASE SUCCESS: ${location} - ${line} : ${item} ${task} successfully ${record.id}`, 'color: green;');
}