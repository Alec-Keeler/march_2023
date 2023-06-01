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
      Pokemon.belongsTo(models.PokeOrigin, {
        foreignKey: 'originId'
      })
      //SELECT * FROM Pokemons
      // JOIN PokeOrigins ON (Pokemons.originId = PokeOrigins.id)

      Pokemon.belongsToMany(models.Trainer, {
        through: models.PokeTrainer,
        foreignKey: 'pokemonId',
        otherKey: 'trainerId'
      })
      //SELECT * FROM Pokemons
      // JOIN PokeTrainers ON (Pokemons.id = PokeTrainers.pokemonId)
      // JOIN Trainers ON (Trainers.id = PokeTrainers.trainerId)
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
    popularity: DataTypes.NUMERIC,
    originId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};