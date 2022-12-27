'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startTime: {
        type: Sequelize.DATE
      },
      durationInMinutes: {
        type: Sequelize.INTEGER
      },
      // clientId:{
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: {
      //       tableName: 'Users',
      //       schema: 'ISA2022'
      //     },
      //     key: 'id'
      //   },
      //   allowNull: true
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Appointments');
  }
};