'use strict';
const bcrypt = require( 'bcrypt' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Glavni',
      lastName: 'Arhivator',
      email: 'example@example.com',
      role: 'Admin',
      active: 'active',
      address: 'DataTypes.STRING',
      city: 'DataTypes.STRING',
      country: 'DataTypes.STRING',
      phone: 'DataTypes.STRING',
      JMBG: 'DataTypes.STRING',
      profession: 'DataTypes.STRING',
      gender: true,
      institution: 'DataTypes.STRING',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
