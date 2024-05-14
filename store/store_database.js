const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbUser = import.meta.env.VITE_DATABASE_USER;
const dbPassword = import.meta.env.VITE_DATABASE_PASSWORD;

import PocketBase from 'pocketbase';
// const pb = new PocketBase('http://127.0.0.1:8090')
const pb = new PocketBase(dbUrl);
const authData = await pb.admins.authWithPassword(dbUser, dbPassword)

// Create Functions
export async function createTask(name, description, weight, column){

  if(!name || !description || !weight || !column){
    console.error("All fields are required")
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
    console.error(record);
  } else {
    console.log(record)
    console.log(record.id)
    console.log(`%cTask created successfully ${record.id}`, 'color: green;');
  }

}

export async function createColumn(name, description,position){

  if(!name || !description || !position ){
    console.error("All fields are required")
    return
  }

  const data = {
    "name": name,
    "description": description,
    "position": position
  };

  const record = await pb.collection('columns').create(data);

  if(record.code){
    console.error(record);
  } else {
    console.log(record)
    console.log(record.id)
    console.log(`%cColumn created successfully ${record.id}`, 'color: green;');
  }

}

// Destroy Function
export async function destroy(table, id)  {
  try{
    const record = await pb.collection(table).delete(id);

    if(record.code){
      console.error(`destroy() Ln 96: \n ${record}`);
    } else {
      console.log(`%cItem in ${table} destroyed successfully ${id}`, 'color: green;');
    }
  } catch (error){
    console.error(`ERROR IN destroy() Ln 101: ${error}`);
  }
}

// Read Functions
export async function getSystemSettings(key) {
  try {
    const settings = await pb.collection('system').getFirstListItem(`key="${key}"`);
    return settings;
  } catch (e) {
    console.error(`ERROR IN getSystemSettings() Ln 111: ${e}`);
  }
}