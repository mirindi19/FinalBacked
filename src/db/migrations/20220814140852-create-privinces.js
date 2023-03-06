'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('privinces', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('privinces');
  }
};