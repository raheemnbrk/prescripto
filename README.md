# Medical Appointment Booking Platform

A full-stack medical appointment booking platform with three roles: **Patient**, **Doctor**, and **Admin**.

Live demo: [medical-booking-platform.vercel.app](https://medical-booking-platform.vercel.app)

---

## Project Structure

```
medical-booking-platform/
├── backend/    # Node.js + Express + TypeScript API
└── frontend/   # React + Vite + TypeScript
```

---

## Tech Stack

**Backend**
- Node.js + Express.js + TypeScript
- PostgreSQL + Prisma ORM v7
- JWT authentication with refresh token rotation and reuse detection
- Cloudinary for image uploads
- Multer for multipart form handling
- Zod for input validation
- Deployed on Render

**Frontend**
- React + Vite + TypeScript
- TanStack Query for server state management
- Zustand for client state
- Tailwind CSS + shadcn/ui
- Deployed on Vercel

---

## Features

**Patient**
- Register and login
- Browse and filter doctors by name or specialization
- Book appointments with slot validation (business hours, no weekends, 1hr minimum lead time, :00 or :30 slots only)
- View and cancel appointments
- Update profile (name, photo, phone, date of birth, gender)

**Doctor**
- Apply for a doctor account (requires admin approval)
- Manage professional profile (specialization, fees, degree, address, availability)
- View and manage appointments (confirm, complete, cancel)
- View patient list with search and pagination
- Dashboard with stats (total appointments, today's appointments, total patients, total revenue)

**Admin**
- Approve or reject doctor applications
- Manage all users and appointments
- Cancel any appointment
- Dashboard with platform-wide statistics (total doctors, patients, appointments, pending doctors)

---

## Authentication

- Access token (15 min) stored in memory via Zustand
- Refresh token (7 days) stored in HttpOnly cookie and database
- Automatic token rotation on every refresh
- Reuse detection — if a revoked token is used, all sessions are invalidated
- Role-based middleware: `authenticate`, `authorizeAdmin`, `authorizeDoctor`
- Admin accounts assigned automatically based on `ADMIN_EMAILS` env variable

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)
- Cloudinary account

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
DATABASE_URL=postgresql://...-pooler...
DIRECT_URL=postgresql://...direct...
ACCESS_SECRET=your_access_secret
REFRESH_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NODE_ENV=development
ADMIN_EMAILS=admin@example.com
```

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## API Overview

### Auth
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
POST   /api/auth/update-profile
```

### Doctor
```
POST   /api/doctor/apply
POST   /api/doctor/update
GET    /api/doctor/all
GET    /api/doctor/profile
GET    /api/doctor/specializations
GET    /api/doctor/top
GET    /api/doctor/patients
GET    /api/doctor/stats
POST   /api/doctor/available
GET    /api/doctor/:id
GET    /api/doctor/:id/related
```

### Appointments
```
POST   /api/appointments/book/:docId
GET    /api/appointments/my-appointments
POST   /api/appointments/cancel/:id
GET    /api/appointments/doctor/all
POST   /api/appointments/doctor/complete/:id
POST   /api/appointments/doctor/confirm/:id
POST   /api/appointments/doctor/cancel/:id
GET    /api/appointments/admin/all
POST   /api/appointments/admin/cancel/:id
```

### Admin
```
GET    /api/admin/all-doctors
GET    /api/admin/pending
POST   /api/admin/approve/:id
POST   /api/admin/reject/:id
GET    /api/admin/all-users
DELETE /api/admin/delete/:id
GET    /api/admin/stats
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon pooled connection string (runtime queries) |
| `DIRECT_URL` | Neon direct connection string (migrations) |
| `ACCESS_SECRET` | JWT access token secret |
| `REFRESH_SECRET` | JWT refresh token secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `ADMIN_EMAILS` | Comma-separated list of admin emails |
| `NODE_ENV` | `development` or `production` |

---

## Database Schema

- `User` — shared by all roles (Patient, Doctor, Admin)
- `Doctor` — extends User with professional info, linked by `userId`
- `RefreshToken` — stores refresh tokens with rotation and reuse detection
- `Appointment` — links a patient (User) and a doctor (Doctor) with date, fees, and status

---

## Deployment

| Service | Platform |
|---|---|
| Backend | Render |
| Frontend | Vercel |
| Database | Neon (PostgreSQL) |
| Images | Cloudinary |
