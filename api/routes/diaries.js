const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')

const Diary = require('../models/Diary')

router.use(verifyJWT)

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
// @route   POST /diaries
router.post('/', async (req, res) => {
    try {
      // req.body.user = req.user.id
      const diary = await Diary.create(req.body)
      res.send(diary)
    } catch (err) {
      console.error(err)
    }
  })

// @desc    Update story
// @route   PUT /diaries/:id
router.patch('/', async (req, res) => {

    const { notes } = req.body

    // Confirm note exists to update
    const diary = await Diary.findById(req.body.id).exec()

    if (!diary) {
      console.log('no diary')
        return res.status(400).json({ message: 'Diary not found' })
    }

    // // Check for duplicate title
    // const duplicate = await Diary.findOne({ notes }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // // Allow renaming of the original note 
    // if (duplicate && duplicate?._id.toString() !== req.body.id) {
    //     return res.status(409).json({ message: 'Duplicate note title' })
    // }

    diary.project = req.body.project
    diary.weather = req.body.weather
    diary.delays = req.body.delays
    diary.variations = req.body.variations
    diary.deliveries = req.body.deliveries
    diary.notes = req.body.notes

    const updatedDiary = await diary.save()

    res.json(`Diary updated`)
})

// @desc    Delete story
// @route   DELETE /diaries/:id
router.delete('/', async (req, res) => {
  try {
    let diary = await Diary.findById(req.body.id).lean()
    await Diary.deleteOne({ _id: req.body.id })
    res.send(diary)
  } catch (err) {
    console.error(err)
  }
})

// @desc    Show single story
// @route   GET /diaries/:id
router.get('/:id', async (req, res) => {
  try {
    let diary = await Diary.findById(req.params.id).lean()
    res.send(diary)
  } catch (err) {
    console.error(err)
  }
})


module.exports = router;