'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokeOrigin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PokeOrigin.hasMany(models.Pokemon, {
        foreignKey: 'originId'
      })
      // SELECT * FROM PokeOrigins
      // JOIN Pokemon ON (Pokemons.originId = PokeOrigins.id)
    }
  }
  PokeOrigin.init({
    region: DataTypes.STRING,
    generation: DataTypes.STRING,
    mentor: DataTypes.STRING,
    rival: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PokeOrigin',
  });
  return PokeOrigin;
};