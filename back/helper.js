const { Configuration, OpenAIApi } = require("openai");

const lang = process.env.LANG
const configuration = new Configuration({
    apiKey: process.env.GPT_API_KEY,
    organization: process.env.GPT_ORG,
});
const openai = new OpenAIApi(configuration);


const chaGptRequest = async (word, res) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: 'system', content: 'You are a multilingual dictionary. Provide strictly verified information only.'}, {role: 'user', content: `{
        The word "${word}" is in "${lang}", provide the following for it:
        Provide phonetic transcription of the word "${word}" in brackets. 
        Provide examples with "${word}" in "${lang}" and what part of speech the word "${word}" is in these examples. CHECK that all examples are SPELT CORRECTLY and you have identified the parts of speech in these examples CORRECTLY! 
        List forms of the word "${word}" in "${lang}" and transcriptions of these words.
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
    });
    if (response.data.choices[0].message.content.includes('not a real word') || response.data.choices[0].message.content.includes('sorry')) {
        throw new Error('Word does not exist')
    } else {
        const parsed = JSON.parse(response.data.choices[0].message.content)
        return result = {
            word,
            transcription: parsed.pronunciation,
            forms: JSON.stringify(parsed.forms),
            synonyms: parsed.synonyms,
            phrases: JSON.stringify(parsed.commonPhrases),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}

module.exports = chaGptRequest;