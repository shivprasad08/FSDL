const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  avgRating: Number,
  totalFeedback: Number,
  sentimentBreakdown: {
    positive: Number,
    neutral: Number,
    negative: Number
  },
  monthlyTrend: [Number],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
