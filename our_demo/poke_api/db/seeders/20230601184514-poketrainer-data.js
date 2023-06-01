'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const { PokeTrainer } = require('../models')
   await PokeTrainer.bulkCreate([
     {trainerId: 1, pokemonId: 2},
     {trainerId: 1, pokemonId: 4},
     {trainerId: 1, pokemonId: 7},
     {trainerId: 1, pokemonId: 10},
     {trainerId: 1, pokemonId: 9},
     {trainerId: 1, pokemonId: 1},
     {trainerId: 2, pokemonId: 3},
     {trainerId: 2, pokemonId: 5},
     {trainerId: 2, pokemonId: 7},
     {trainerId: 2, pokemonId: 4},
     {trainerId: 3, pokemonId: 1},
     {trainerId: 3, pokemonId: 10},
     {trainerId: 3, pokemonId: 8},
     {trainerId: 3, pokemonId: 6},
     {trainerId: 4, pokemonId: 5},
     {trainerId: 4, pokemonId: 6},
     {trainerId: 4, pokemonId: 7},
     {trainerId: 5, pokemonId: 8},
     {trainerId: 5, pokemonId: 9},
     {trainerId: 5, pokemonId: 10}
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
