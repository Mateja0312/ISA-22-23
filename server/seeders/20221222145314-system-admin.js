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
      role: 'Admin',
      active: 'active',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'employee@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Medicinski',
      lastName: 'Radnik',
      role: 'Employee',
      active: 'active',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'centeradmin@gmail.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Admin',
      lastName: 'Centra',
      role: 'CenterAdmin',
      active: 'active',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
