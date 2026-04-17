import { useState } from 'react'
import axios from 'axios'
import './App.css'

const initialForm = {
  rollNo: '',
  studentName: '',
  eventDate: '',
  eventName: '',
  allDay: false,
  timeFrom: '',
  timeTo: '',
}

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api/attendance'

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })
    setIsSubmitting(true)

    try {
      if (!formData.allDay && (!formData.timeFrom || !formData.timeTo)) {
        setStatus({ type: 'error', message: 'Please enter both start and end time, or select All Day.' })
        setIsSubmitting(false)
        return
      }

      const eventTime = formData.allDay
        ? 'All Day'
        : `${formData.timeFrom} - ${formData.timeTo}`

      const payload = {
        rollNo: formData.rollNo,
        studentName: formData.studentName,
        eventDate: formData.eventDate,
        eventName: formData.eventName,
        eventTime,
      }

      const response = await axios.post(API_URL, payload)
      setStatus({ type: 'success', message: response.data.message })
      setFormData(initialForm)
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Could not submit attendance. Please try again.'

      setStatus({ type: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page">
      <section className="card">
        <div className="card-header">
          <h1>Student Event Attendance Form </h1>
          <p className="subtitle">Fill in your details to record your event participation</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} className="attendance-form">
            <div className="field-group">
              <label htmlFor="rollNo">Student Roll Number</label>
              <input
                id="rollNo"
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                required
                placeholder="e.g. 123B1B276"
              />
            </div>

            <div className="field-group">
              <label htmlFor="studentName">Student Name</label>
              <input
                id="studentName"
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                required
                placeholder="e.g. Shivprasad Mahind"
              />
            </div>

            <div className="row">
              <div className="field-group">
                <label htmlFor="eventDate">Event Date</label>
                <input
                  id="eventDate"
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-group">
                <label htmlFor="eventName">Event Name</label>
                <input
                  id="eventName"
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Tech Innovation Seminar"
                />
              </div>
            </div>

            <div className="field-group">
              <label>Event Time</label>
              <div className="allday-check">
                <input
                  type="checkbox"
                  id="allDay"
                  name="allDay"
                  checked={formData.allDay}
                  onChange={handleChange}
                />
                <label htmlFor="allDay" className="allday-label">All Day</label>
              </div>
              {!formData.allDay && (
                <div className="time-range">
                  <div>
                    <span className="sub-label">From</span>
                    <input
                      id="timeFrom"
                      type="time"
                      name="timeFrom"
                      value={formData.timeFrom}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <span className="time-sep">to</span>
                  <div>
                    <span className="sub-label">To</span>
                    <input
                      id="timeTo"
                      type="time"
                      name="timeTo"
                      value={formData.timeTo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
            </button>
          </form>

          {status.message && (
            <div className={`status ${status.type}`}>
              {status.message}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
