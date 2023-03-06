'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          collections.belongsTo(models.organisations,{
          foreignKey:'organisationId',
          onDelete:'CASCADE',
          onUpdate:'CASCADE',
        })
    }
  }
  collections.init({
    organisationId: DataTypes.STRING,
    Fullname: DataTypes.STRING,
    position: DataTypes.STRING,
    age: DataTypes.STRING,
    salary: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'collections',
  });
  return collections;
};