'use strict';
const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs/promises')
const { backOff } = require("exponential-backoff");


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
    const lang = 'Russian'
    const configuration = new Configuration({
      apiKey: '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',
      organization: 'org-7yaKT17T8I9LZWLMInx5tIrT',
    });
    const openai = new OpenAIApi(configuration);
    
    let words = await fs.readFile('../words.txt', 'utf8')
    const wordsArr = words.split('\n')
    let res = []
    for (let i = 0; i < wordsArr.length; i ++) {
      if (i > 2) {
        break
      }
      res.push(wordsArr[i])
    }
    let wordsInfo = await Promise.all(res.map(async word => {
      const response = await backOff(() => openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: 'system', content: 'You are a multilingual dictionary. Provide strictly verified information only.'}, {role: 'user', content: `{
        The word "${word}" is in "${lang}", provide the following for it:
        Provide phonetic transcription of the word "${word}" in brackets. 
        Provide examples with "${word}" in "${lang}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY! 
        List forms of the word "${word}" in "${lang}" and transcriptions of these words. If there's only one form of this word, provide only one form and its transcription.
        Provide 3 synonyms for the word "${word}". 
        Provide 3 common phrases with "${word}". 
        Present in: {
          "pronunciation:": "[value]",
          "usageExamples": [{"example": "value", "partOfSpeech": "value"}],
          "forms": [{“form”: “form”, “pronunciation”: “[value]”}, {“form”: “form”, “pronunciation”: “[value]”}],
          "synonyms": ["synonym", "synonym"],
          "commonPhrases": [
            { "phrase": "value", "meaning": "value"},
            { "phrase": "value", "meaning": "value"},
            { "phrase": "value", "meaning": "value"}
          ]
        }`}]
      }));
      const parsed = JSON.parse(response.data.choices[0].message.content)
      console.log(parsed);
      // return {
      //   word: word,
      //   transcription: JSON.stringify(parsed.pronunciation),
      //   forms: JSON.stringify(parsed.forms),
      //   synonyms: JSON.stringify(parsed.synonyms),
      //   phrases: JSON.stringify(parsed.commonPhrases),
      // }
      return {
        word: word,
        transcription: parsed.pronunciation,
        forms: JSON.stringify(parsed.forms),
        synonyms: parsed.synonyms,
        phrases: JSON.stringify(parsed.commonPhrases),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }))
    
    console.log(wordsInfo[0].phrases);
    await queryInterface.bulkInsert('WordsInfos', wordsInfo, {});
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
