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
   const { PokeOrigin } = require('../models')
   await PokeOrigin.bulkCreate([
     {region: 'Kanto', generation: 'G1', mentor: 'Professor Oak', rival: 'Gary'},
     {region: 'Hoenn', generation: 'G3', mentor: 'Professor Birch', rival: 'Leon'},
     {region: 'Sinnoh', generation: 'G4', mentor: 'Professor Roann', rival: 'Barry'}
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PokeOrigins', {
      region: ['Kanto', 'Hoenn', 'Sinnoh']
    })
  }
};
