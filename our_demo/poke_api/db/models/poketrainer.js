'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokeTrainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PokeTrainer.init({
    pokemonId: DataTypes.INTEGER,
    trainerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PokeTrainer',
  });
  return PokeTrainer;
};