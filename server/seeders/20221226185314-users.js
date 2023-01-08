'use strict';
const bcrypt = require( 'bcrypt' );

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@email.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Glavni',
      lastName: 'Arhivator',
      role: 'admin',
      active: 'activated',
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
      email: 'employee@email.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Medicinski',
      lastName: 'Radnik',
      role: 'employee',
      active: 'activated',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      employedAt: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'centeradmin@email.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Admin',
      lastName: 'Centra',
      role: 'employee',
      active: 'activated',
      address: 'ND',
      city: 'ND',
      country: 'ND',
      phone: 'ND',
      JMBG: 'ND',
      profession: 'ND',
      gender: true,
      institution: 'ND',
      employedAt: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'client@email.com',
      password: bcrypt.hashSync( '123', 10 ),
      firstName: 'Blood',
      lastName: 'Bag',
      role: 'client',
      active: 'activated',
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
