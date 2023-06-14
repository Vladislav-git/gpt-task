'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WordsInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      word: {
        type: Sequelize.STRING
      },
      transcription: {
        type: Sequelize.STRING
      },
      translations: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      forms: {
        type: Sequelize.JSONB
      },
      synonyms: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      phrases: {
        type: Sequelize.JSONB
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WordsInfos');
  }
};