'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Words extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Words.belongsTo(models.WordsInfo, {
        foreignKey: 'wordInfoId',
        onDelete: 'CASCADE'
      })
    }
  }
  Words.init({
    word: DataTypes.STRING,
    wordInfoId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Words',
  });
  return Words;
};