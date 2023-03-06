'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // define association here
      users.belongsTo(models.organisations,{
        foreignKey:'organizationId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      })
    }
  }
  users.init({
    Fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING,
    registrationCode: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    organizationId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};