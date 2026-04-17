# Full Stack Development Assignment 5

## Student Event Attendance System

This project is a MERN stack implementation of an event attendance form.

## Folder Structure

- `frontend`: React application (Vite)
- `backend`: Node.js + Express API with MongoDB

## Prerequisites

- Node.js 20+
- MongoDB running locally or a MongoDB Atlas URI

## Backend Setup

1. Go to `backend`
2. Copy `.env.example` to `.env`
3. Update values if needed
4. Install dependencies (already installed in this workspace)
5. Start server:

```bash
npm run dev
```

API endpoint:

- `POST /api/attendance`

## Frontend Setup

1. Go to `frontend`
2. Copy `.env.example` to `.env`
3. Install dependencies (already installed in this workspace)
4. Start app:

```bash
npm run dev
```

The form submits attendance data to the backend API and displays success/error confirmation messages.

## Example Attendance Payload

```json
{
  "rollNo": "CE102",
  "studentName": "Shivprasad Mahind",
  "eventDate": "2026-03-20",
  "eventName": "Tech Innovation Seminar",
  "eventTime": "10:00 AM"
}
```
