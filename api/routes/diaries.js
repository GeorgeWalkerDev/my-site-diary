const express = require('express')
const router = express.Router()

const Diary = require('../models/Diary')

// @desc    Show all diaries
// @route   GET /diaries
router.get('/', async (req, res, next) => {
    try {
        const diaries = await Diary.find({})
            .sort({ createdAt: 'desc' })
            .lean()

        res.send(diaries)
    } catch (error) {
        console.error(error)
    }
});

// @desc    Process add form
// @route   POST /stories
router.post('/add', async (req, res) => {
    try {
      // req.body.user = req.user.id
      console.log(req.body)
      await Diary.create(req.body)
      res.send(req.body)
    } catch (err) {
      console.error(err)
    }
  })

module.exports = router;