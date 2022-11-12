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
      await Diary.create(req.body)
      res.send(req.body)
    } catch (err) {
      console.error(err)
    }
  })

// @desc    Update story
// @route   PUT /stories/:id
router.put('/:id', async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id).lean()

    diary = await Diary.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
  } catch (err) {
    console.error(err)
  }
})

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete('/:id', async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id).lean()
    await Diary.deleteOne({ _id: req.params.id })
    res.send(diary)
  } catch (err) {
    console.error(err)
  }
})

// @desc    Show single story
// @route   GET /stories/:id
router.get('/:id', async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id).lean()
    res.send(diary)
  } catch (err) {
    console.error(err)
  }
})


module.exports = router;