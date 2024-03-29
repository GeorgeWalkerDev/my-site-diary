const Diary = require('../models/Diary');
const User = require('../models/User');

// @desc    Show all diaries
const getAllDiaries = async (req, res, next) => {
  try {
    const diaries = await Diary.find({}).sort({ createdAt: 'desc' }).lean();

    if (!diaries?.length) {
      return res.status(400).json({ message: 'No notes found' });
    }

    const diariesWithUser = await Promise.all(
      diaries.map(async (diary) => {
        const user = await User.findById(diary.user).lean().exec();
        return { ...diary, user: `${user.firstName} ${user.lastName}` };
      })
    );

    res.send(diariesWithUser);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Show single diary
const getDiary = async (req, res) => {
  try {
    const diary = await Diary.findById(req.params.id).lean();
    res.send(diary);
  } catch (err) {
    console.error(err);
  }
};

// @desc    Process add form
const addDiary = async (req, res) => {
  try {
    const diary = await Diary.create(req.body);
    res.send(diary);
  } catch (err) {
    console.error(err);
  }
};

// @desc    Update diary
const updateDiary = async (req, res) => {
  // Confirm note exists to update
  const diary = await Diary.findById(req.body.id).exec();

  if (!diary) {
    console.log('no diary');
    return res.status(400).json({ message: 'Diary not found' });
  }

  // // Check for duplicate title
  // const duplicate = await Diary.findOne({ notes }).collation({ locale: 'en', strength: 2 }).lean().exec()

  // // Allow renaming of the original note
  // if (duplicate && duplicate?._id.toString() !== req.body.id) {
  //     return res.status(409).json({ message: 'Duplicate note title' })
  // }

  diary.project = req.body.project;
  diary.weather = req.body.weather;
  diary.delays = req.body.delays;
  diary.variations = req.body.variations;
  diary.deliveries = req.body.deliveries;
  diary.notes = req.body.notes;

  const updatedDiary = await diary.save();

  res.json(`Diary updated`);
};

// @desc    Delete diary
const deleteDiary = async (req, res) => {
  try {
    const diary = await Diary.findById(req.body.id).lean();
    await Diary.deleteOne({ _id: req.body.id });
    res.send(diary);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllDiaries,
  getDiary,
  addDiary,
  updateDiary,
  deleteDiary,
};
