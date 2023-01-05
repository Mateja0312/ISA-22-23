import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  "username": "root",
  "password": "LOZINKA",
  "host": "127.0.0.1",
  dialect: 'mysql',
  database: 'ISA2022',
  storage: ':memory:',
  models: [__dirname + '/../models']
});
