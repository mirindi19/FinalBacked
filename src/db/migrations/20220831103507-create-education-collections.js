'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('educationCollections', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      organisationId: {
        type: Sequelize.STRING
      },
      studentName: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      level: {
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
    await queryInterface.dropTable('educationCollections');
  }
};