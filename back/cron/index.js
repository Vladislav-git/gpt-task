const CronJob = require("node-cron");
const fs = require('fs/promises')
const {WordsInfo} = require('../models')
const chaGptRequest = require('../helper')

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("*/2 * * * *", async () => {
    try {
        let words = await fs.readFile('../wordsToParse.txt', 'utf8')
        if (words) {
            const wordsArr = words.split('\n').slice(0, 3)
            const wordsToParse = words.split('\n').slice(3, words.split('\n').length).join('\n')

            let wordsInfo = await Promise.all(wordsArr.map(async word => {
                return await chaGptRequest(word)
            }))

            await WordsInfo.bulkCreate(wordsInfo)
            await fs.writeFile('../wordsToParse.txt', wordsToParse)
        } else {
            words = await fs.readFile('../words.txt', 'utf8')

            const wordsArr = words.split('\n').slice(0, 3)
            const wordsToParse = words.split('\n').slice(3, words.split('\n').length).join('\n')

            let wordsInfo = await Promise.all(wordsArr.map(async word => {
                return await chaGptRequest(word)
            }))

            await WordsInfo.bulkCreate(wordsInfo)
            await fs.writeFile('../wordsToParse.txt', wordsToParse)
        }
    } catch (e) {
        console.log(e)
    }
  });

  scheduledJobFunction.start();
}