'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pokedexNum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    evolves: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    popularity: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};