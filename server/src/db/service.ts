
const { Sequelize, DataTypes } = require('sequelize');

export const sequelize = new Sequelize('ISA2022', 'root', 'LOZINKA', {
    host: 'localhost',
    dialect: 'mysql'
  });

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
})
.catch((error :any ) =>{
    console.error('Unable to connect to the database:', error);
})

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });
  
  // `sequelize.define` also returns the model
  console.log(User === sequelize.models.User);

  export const db : any = null;