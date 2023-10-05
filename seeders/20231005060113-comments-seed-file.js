'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Comments', [
      {
        text: 'good to eat',
        user_id: 1,
        restaurant_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        text: 'It is cheap',
        user_id: 2,
        restaurant_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        text: 'Eat the food like a shit!',
        user_id: 3,
        restaurant_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', {})
  }
}
