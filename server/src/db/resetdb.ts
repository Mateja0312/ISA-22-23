import { sequelize } from './service'

sequelize.sync({ force: true });
console.log("The table for the User model was just (re)created!");