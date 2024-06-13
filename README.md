# svKabanDon

A Kanban Board built in Svelte

At present the board has a button for initializing the board and filling it with five tasks.

Tasks can be moved between boards and moved up and down with buttons provided inside the task.

The board's stat is saved to a pocketbase database.

## Development Instructions
Clone the repository and install the dependencies with npm
```bash
git clone https://github.com/camcleod99/svKabanDon.git 
cd svKabanDon
npm install
```

Create a `.env` file in the root directory with the following content:
```env
// Database Admin Login Credentials
VITE_DATABASE_URL=[Your Database URL, this will be exposed when running the database]
VITE_DATABASE_USER=[The username for the admin user of the databse, default is genie@lamp.cave
VITE_DATABASE_PASSWORD=[The password for the admin user: Default is GrantY0uThreeW1shes]
```

Initalise the pocketbase database with the following command:
```bash
npm run db
```

This is an alias for pocketbase's serve command which you can use as an alternetive as noted below;
```bash
./databse/pocketbase serve
```
please note that you may need to have the pocketbase application verified by your
system's security settings before you can run the command.

Run the development server with the following command:
```bash
npm run dev
```
You can run the application by running npm run dev and npm run db in two separate terminals.