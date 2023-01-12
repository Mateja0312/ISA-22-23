'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Feedbacks', [{
      title: "Vise puta koristi spric",
      content: "Strasno boze sacuvaj ne sme to nikako obolece ljudi",
      status: "pending",
      client_id: 4,
      employee_id: 2,
      center_id: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Budjav zid",
      content: "Zid budjaviji nego u bajicu",
      status: "pending",
      client_id: 4,
      employee_id: null,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Ozbiljni problemovi",
      content: "Nesto nesto, ovde je status responded pa se nece nigde prikazati",
      status: "responded",
      client_id: 4,
      employee_id: null,
      center_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      title: "Ozbiljni problemovi 2",
      content: "Nesto nesto, ovde je status responded pa se nece nigde prikazati",
      status: "responded",
      client_id: 4,
      employee_id: null,
      center_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Feedbacks', null, {});
  }
};
