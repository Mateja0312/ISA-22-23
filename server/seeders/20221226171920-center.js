'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Centers', [{
      name: 'Telep',
      address: 'Adresa na Telepu 37',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Telep2',
      address: 'indjija 45',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Telep3',
      address: 'beska 11',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Centers', null, {});
  }
};
