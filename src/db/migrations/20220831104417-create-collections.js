'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      organisationId: {
        type: Sequelize.STRING
      },
      Fullname: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
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
    await queryInterface.dropTable('collections');
  }
};