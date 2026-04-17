const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');



// Submit new feedback (mock: studentId is first user)
router.post('/', async (req, res) => {
  try {
    const user = await require('../models/User').findOne();
    const feedback = new Feedback({ ...req.body, studentId: user ? user._id : null });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// List feedback (optionally filter by course)
router.get('/', async (req, res) => {
  const filter = req.query.courseId ? { courseId: req.query.courseId } : {};
  const feedbacks = await Feedback.find(filter).populate('studentId', 'name avatar').populate('courseId', 'title');
  res.json(feedbacks);
});


// Get single feedback
router.get('/:id', async (req, res) => {
  const feedback = await Feedback.findById(req.params.id).populate('studentId', 'name avatar').populate('courseId', 'title');
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  res.json(feedback);
});


// Edit feedback (no auth, allow all)
router.put('/:id', async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  Object.assign(feedback, req.body, { updatedAt: Date.now() });
  await feedback.save();
  res.json(feedback);
});


// Delete feedback (no auth, allow all)
router.delete('/:id', async (req, res) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);
  if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
  res.json({ message: 'Feedback deleted' });
});

module.exports = router;
