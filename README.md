# Horus Fullstack Entry Exam - Dion

## Tech Stack
- Backend: Laravel 12
- Frontend: React + Vite
- Database: MySQL
- HTTP Client: Axios

---

## Setup Backend
1. Masuk ke folder backend
2. Install dependency:
   composer install
3. Copy environment:
   cp .env.example .env
4. Generate key:
   php artisan key:generate
5. Setup database di .env
6. Jalankan migration:
   php artisan migrate
7. Run server:
   php artisan serve

Backend running at:
http://127.0.0.1:8000

---

## Setup Frontend
1. Masuk ke folder frontend
2. Install dependency:
   npm install
3. Run development server:
   npm run dev

Frontend running at:
http://localhost:5173

---

## Authentication Flow
Authentication menggunakan Laravel Sanctum.
Saat login, backend menghasilkan personal access token.
Token disimpan di localStorage dan dikirim melalui Authorization Bearer header.
Endpoint CRUD diproteksi menggunakan middleware auth:sanctum.

---

## Features
- Register user
- Login user
- Protected dashboard
- Search user
- Update user
- Delete user

---

## Database
Table: users
- id (Primary Key)
- username (Unique)
- password (Hashed)
- email (Unique)
- nama
- created_at
