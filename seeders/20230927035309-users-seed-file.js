'use strict'
const bcrypt = require('bcryptjs')
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
    await queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: true,
      name: 'root',
      created_at: new Date(),
      updated_at: new Date(),
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbSgZi1KZ63WoIBoshjTbcpfSBrYCDHUIa7xPPmpDw7tKrKW08kBB2qbOnu4ZGrx2-C0&usqp=CAU'
    }, {
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user1',
      created_at: new Date(),
      updated_at: new Date(),
      image: 'https://p3-pc-sign.douyinpic.com/tos-cn-i-0813/7c43fd56ea6f4d86bbf5284e1e5e098b~noop.jpeg?biz_tag=pcweb_cover&from=3213915784&s=PackSourceEnum_SEARCH&se=false&x-expires=1696701600&x-signature=eDdsGUR9nbaqn8%2BN1twHSzSHKCs%3D'
    }, {
      email: 'user2@example.com',
      password: await bcrypt.hash('12345678', 10),
      is_admin: false,
      name: 'user2',
      created_at: new Date(),
      updated_at: new Date(),
      image: 'https://i.imgur.com/AwsL7u8.jpg'
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', {})
  }
}
