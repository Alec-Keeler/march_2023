'use strict';
const data = [
  {
    region: 'Kanto',
    pokemon: [
      { name: 'Charmander', type: 'fire', pokedexNum: 4, evolves: 1, popularity: 90.6},
      { name: 'Ditto', type: 'normal', pokedexNum: 132, evolves: 0, popularity: 100},
      { name: 'Rapidash', type: 'fire', pokedexNum: 78, evolves: 0, popularity: 94.89},
      { name: 'Tentacool', type: 'water', pokedexNum: 72, evolves: 0, popularity: 30.75},
      { name: 'Geodude', type: 'rock', pokedexNum: 74, evolves: 0, popularity: 42.42},
      { name: 'Snorlax', type: 'normal', pokedexNum: 143, evolves: 1, popularity: 86},
      { name: 'Mewtwo', type: 'psychic', pokedexNum: 150, evolves: 0, popularity: 99.9}
    ]
  },
  {
    region: 'Hoenn',
    pokemon: [
      { name: 'Mudkip', type: 'water', pokedexNum: 258, evolves: 1, popularity: 88.88 },
      { name: 'Jirachi', type: 'steel', pokedexNum: 385, evolves: 0, popularity: 94.2 },
    ]
  },
  {
    region: 'Sinnoh',
    pokemon: [
      { name: 'Garchomp', type: 'dragon', pokedexNum: 445, evolves: 0, popularity: 90.0 },
    ]
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   const {Pokemon, PokeOrigin} = require('../models')

    for (let i = 0; i < data.length; i++) {
      const origin = data[i];
      const pokeOrigin = await PokeOrigin.findOne({where: {region: origin.region}})
      for (let j = 0; j < origin.pokemon.length; j++) {
        const pokemon = origin.pokemon[j];
        // Pokemon.create({
        //   originId: pokeOrigin.id
        // })
        await pokeOrigin.createPokemon({
          name: pokemon.name,
          type: pokemon.type,
          pokedexNum: pokemon.pokedexNum,
          evolves: pokemon.evolves,
          popularity: pokemon.popularity,
        })
      }
    }

  //  await Pokemon.bulkCreate([
  //    {name: 'Charmander', type: 'fire', pokedexNum: 4, evolves: 1, popularity: 90.6, originId: 1},
  //    {name: 'Ditto', type: 'normal', pokedexNum: 132, evolves: 0, popularity: 100, originId: 1},
  //    {name: 'Rapidash', type: 'fire', pokedexNum: 78, evolves: 0, popularity: 94.89, originId: 1},
  //    {name: 'Tentacool', type: 'water', pokedexNum: 72, evolves: 0, popularity: 30.75, originId: 1},
  //    {name: 'Geodude', type: 'rock', pokedexNum: 74, evolves: 0, popularity: 42.42, originId: 1},
  //    {name: 'Mudkip', type: 'water', pokedexNum: 258, evolves: 1, popularity: 88.88, originId: 2},
  //    {name: 'Snorlax', type: 'normal', pokedexNum: 143, evolves: 1, popularity: 86, originId: 1},
  //    {name: 'Garchomp', type: 'dragon', pokedexNum: 445, evolves: 0, popularity: 90.0, originId: 3},
  //    {name: 'Jirachi', type: 'steel', pokedexNum: 385, evolves: 0, popularity: 94.2, originId: 2},
  //    {name: 'Mewtwo', type: 'Psychic', pokedexNum: 150, evolves: 0, popularity: 99.9, originId: 1}
  //  ], 
  //  {validate: true}
  //  )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pokemons', {
      pokedexNum: [4, 132, 78, 72, 74, 258, 143, 445, 385, 150]
    })
  }
};
