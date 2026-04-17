const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  year: { type: String, required: true },
  department: { type: String, required: true },
  division: { type: String, required: true },
  subject: { type: String, required: true },
  subjectFacultyName: { type: String, required: true },
  ratings: {
    teaching: { type: Number, min: 1, max: 5 },
    content: { type: Number, min: 1, max: 5 },
    difficulty: { type: Number, min: 1, max: 5 },
    overall: { type: Number, min: 1, max: 5 }
  },
  comment: String,
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'] },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
