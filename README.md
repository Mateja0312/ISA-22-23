# ISA-22-23

### IMPORTANT NOTES
Application has been tested on Ubuntu 22.04 LTS with node version v16.13.0  
Ports 8080 and 8081 should be free before starting the application, as frontend and backend are meant to use them

### Setup guide:

##### Database setup:
1. Install mysql (for ubuntu: sudo apt-get install mysql-server)
2. Install mysql workbench (for ubuntu: sudo apt install mysql-workbench)
3. Create '.env' file, by copying the '.env.example' file.
4. Create a new connection (credentials should match with .env content)
5. Once conected, create a new schema with the same name defined in .env

##### Frontend/Backend setup:

6. Use 'npm install' command inside both 'server' and 'client' folders to install needed npm modules
7. Use 'npm run serve' command inside both 'server' and 'client' folders to start backend and frontend, respectively

##### Database seeding:
8. Use 'npx sequelize-cli db:seed:all' inside the 'server' folder to seed the database

##### Application: 
9. App should be running on: http://localhost:8080
10. Login credentials for every seeded user:  
    username: 'users_role'@gmail.com, e.g. client@gmail.com  
    password: 123
