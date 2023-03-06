'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class organisations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      organisations.hasMany(models.users,{
          foreignKey:'organizationId',
          onDelete:'CASCADE',
          onUpdate:'CASCADE',
        })
        organisations.hasMany(models.educationCollections,{
          foreignKey:'organisationId',
          onDelete:'CASCADE',
          onUpdate:'CASCADE',
        })

          organisations.hasMany(models.collections,{
          foreignKey:'organisationId',
          onDelete:'CASCADE',
          onUpdate:'CASCADE',
        })
        
    }
  }
  organisations.init({
    name: DataTypes.STRING,
    provinceName: DataTypes.STRING,
    districtName: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'organisations',
  });
  return organisations ;
};