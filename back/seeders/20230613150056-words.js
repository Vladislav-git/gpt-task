'use strict';
const fs = require('fs/promises')

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
    let words = await fs.readFile('../words.txt', 'utf8')
    const wordsArr = words.split('\n')
    let res = []
    for (let i = 0; i < wordsArr.length; i ++) {
      if (i > 50) {
        break
      }
      res.push({
        word: wordsArr[i],
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    // const result = wordsArr.map((word, i) => {
    //   return {
    //     word,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // })
    await queryInterface.bulkInsert('Words', res, {});
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
