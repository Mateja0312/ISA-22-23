# ISA-22-23

### IMPORTANT NOTES
Application has been tested on Ubuntu 22.04 LTS with node version v16.13.0  
Ports 8080 and 8081 should be free before starting the application, as frontend and backend are meant to use them

### Setup guide:

##### Database setup:
1. Install mysql (for ubuntu: sudo apt-get install mysql-server)
2. Install mysql workbench (for ubuntu: sudo apt install mysql-workbench)
3. Create a new connection (credentials should match with .env content)
4. Once conected, create a new schema with the same name defined in .env

##### Frontend/Backend setup:

5. Use 'npm install' command inside both 'server' and 'client' folders to install needed npm modules
6. Use 'npm run serve' command inside both 'server' and 'client' folders to start backend and frontend, respectively

##### Database seeding:
7. Use 'npx sequelize-cli db:seed:all' inside the 'server' folder to seed the database

##### Application: 
8. App should be running on: http://localhost:8080
9. Login credentials for every seeded user:  
    username: 'users_role'@gmail.com, i.e. client@gmail.com  
    password: 123
