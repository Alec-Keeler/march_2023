'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 100]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        max: 9002,
        min: 18,
        isOdd(value) {
          if ( value % 2 === 0) {
            throw new Error('Age must be an odd number')
          }
        }
      }
    },
    gender: DataTypes.STRING,
    gymLeader: DataTypes.BOOLEAN,
    numBadges: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};