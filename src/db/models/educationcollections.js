'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class educationCollections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      educationCollections.belongsTo(models.organisations,{
        foreignKey:'organisationId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      })

    }
  }
  educationCollections.init({
    organisationId: DataTypes.STRING,
    studentName: DataTypes.STRING,
    age: DataTypes.STRING,
    gender: DataTypes.STRING,
    subject: DataTypes.STRING,
    level: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'educationCollections',
  });
  return educationCollections;
};