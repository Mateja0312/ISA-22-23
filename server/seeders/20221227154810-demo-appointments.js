'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Appointments', [{
      start: new Date(),
      end: new Date(new Date().getTime() + 30*60000),
      status: "predefined",
      center_id: 1,
      employee_id: 2,
      client_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Appointments', null, {});
  }
};
