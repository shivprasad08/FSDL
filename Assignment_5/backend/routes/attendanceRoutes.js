const express = require('express')
const EventAttendance = require('../models/EventAttendance')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { rollNo, studentName, eventDate, eventName, eventTime } = req.body

    if (
      !rollNo ||
      !studentName ||
      !eventDate ||
      !eventName ||
      !eventTime
    ) {
      return res.status(400).json({
        message: 'All form fields are required.',
      })
    }

    const attendance = await EventAttendance.create({
      rollNo,
      studentName,
      eventDate,
      eventName,
      eventTime,
    })

    return res.status(201).json({
      message: 'Attendance submitted successfully.',
      data: attendance,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to save attendance right now.',
      error: error.message,
    })
  }
})

module.exports = router
