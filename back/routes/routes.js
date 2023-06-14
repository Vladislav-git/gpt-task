const express = require('express')
const {WordsInfo} = require('../models')
const chaGptRequest = require('../helper')


const router = express.Router()

router.post('/getWordInfo', async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const wordinfo = await WordsInfo.findOne({where: {word: req.body.word}})
        if (wordinfo) {
            console.log(wordinfo)
            res.send(wordinfo)
        } else {
            const result = await chaGptRequest(req.body.word, res)
            const newWordInfo = await WordsInfo.create(result)
            res.send(newWordInfo)
            newWordInfo.save()
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router