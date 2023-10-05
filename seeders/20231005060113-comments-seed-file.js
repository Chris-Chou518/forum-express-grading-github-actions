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

// others method
// 'use strict'
// const faker = require('faker')
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     // 取出要關聯的users table的users.id
//     const users = await queryInterface.sequelize.query(
//       'SELECT id FROM Users;',
//       { type: queryInterface.sequelize.QueryTypes.SELECT }
//     )
//     // 取出要關聯的restaurants table的restaurants.id
//     const restaurants = await queryInterface.sequelize.query(
//       'SELECT id FROM Restaurants;',
//       { type: queryInterface.sequelize.QueryTypes.SELECT }
//     )
//     await queryInterface.bulkInsert('Comments',
//       Array.from({ length: 50 }, () => ({
//         text: faker.lorem.sentence(),
//         user_id: users[Math.floor(Math.random() * users.length)].id,
//         restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id,
//         created_at: new Date(),
//         updated_at: new Date()
//       })))
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.bulkDelete('Comments', {})
//   }
// }
