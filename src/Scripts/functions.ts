import {RecordModel} from "pocketbase";

export function catchError(e: Error, location:string, line: number, id?: string) {
  console.error(`ERROR: ${location} - ${line}: ${e.message} ${id ? id : ''}`);
}

export function catchPBError(record: RecordModel, location:string, line: number){
  console.error(`POCKETBASE ERROR: ${location} - ${line} : ${record.code} - ${record.message}`);
}

const dummyRecord = {"id": "", "code": 0, "message": "", collectionId: "", collectionName: "", created: "", updated: "",};
export function catchPBSuccess(record:  RecordModel = dummyRecord, location:string, line:number, item: string, task: string = "created"){
  console.log(`%cPOCKETBASE SUCCESS: ${location} - ${line} : ${item} ${task} successfully ${record.id}`, 'color: green;');
  if(record.id){
    console.log(`%cRECORD DETAILS: ${record.collectionName} - ${record.id}`, 'color: green;');
  }
}