'use strict';
const {Trainer} = require('../models')

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
  //  await queryInterface.bulkInsert('Trainers', [
    // await Trainer.create({
    //   name: '1',
    //   age: 1,
    //   gender: 'male',
    //   gymLeader: 0,
    //   numBadges: 0
    // })
    await Trainer.bulkCreate([
      {name: 'Alec', age: 57, gender: 'male', gymLeader: 1, numBadges: 9001},
      {name: 'Dan Chin', age: 101, gender: 'male', gymLeader: 0, numBadges: 6},
      {name: 'Olivia', age: 85, gender: 'female', gymLeader: 0, numBadges: 16},
      {name: 'Franco', age: 19, gender: 'male', gymLeader: 0, numBadges: 3},
      {name: 'Jojo', age: 63, gender: 'male', gymLeader: 0, numBadges: 7}
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Trainers', {
      name: ['Alec', 'Dan Chin', 'Olivia', 'Franco', 'Jojo']
    })  //DELETE FROM Trainers WHERE name IN (...);
  }
};
