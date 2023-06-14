'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WordsInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      WordsInfo.hasMany(models.Words, {
        foreignKey: 'wordInfoId',
      })
    }
  }
  WordsInfo.init({
    word: DataTypes.STRING,
    transcription: DataTypes.STRING,
    translations: DataTypes.ARRAY(DataTypes.STRING),
    forms: DataTypes.JSONB,
    synonyms: DataTypes.ARRAY(DataTypes.STRING),
    phrases: DataTypes.JSONB,
  }, {
    sequelize,
    modelName: 'WordsInfo',
  });
  return WordsInfo;
};