const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const attendanceRoutes = require('./routes/attendanceRoutes')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/student-event-attendance'

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  })
)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running.' })
})

app.use('/api/attendance', attendanceRoutes)

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
