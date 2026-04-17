const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Analytics = require('../models/Analytics');


// List all courses
router.get('/', async (req, res) => {
  const courses = await Course.find().populate('teacherId', 'name email');
  res.json(courses);
});


// Create course (no auth, allow all)
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Course detail + avg rating
router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id).populate('teacherId', 'name email');
  if (!course) return res.status(404).json({ message: 'Course not found' });
  // TODO: Calculate avg rating
  res.json(course);
});

// Full analytics for course
router.get('/:id/stats', async (req, res) => {
  const stats = await Analytics.findOne({ courseId: req.params.id });
  res.json(stats);
});

module.exports = router;
