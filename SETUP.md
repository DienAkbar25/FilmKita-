# FilmKita Setup Guide

Frontend dan Backend sekarang terhubung. Ikuti langkah-langkah berikut untuk menjalankan aplikasi.

## Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn

## Setup Backend

1. Masuk ke direktori backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Buat file `.env` di folder backend (jika belum ada) dengan konfigurasi database Anda:
```
PORT=3000
SESSION_SECRET=filmkita_secret
DB_SERVER=your_server
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. Jalankan backend:
```bash
npm start
```

Backend akan berjalan di `http://localhost:3000`

## Setup Frontend

1. Masuk ke direktori frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. File `.env.local` sudah ada dan dikonfigurasi untuk development dengan proxy ke backend

4. Jalankan frontend:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## Development Flow

### Saat Development
- Frontend berjalan di `http://localhost:5173`
- Backend berjalan di `http://localhost:3000`
- Vite proxy secara otomatis forward request `/api/*` ke backend
- Anda tidak perlu khawatir CORS, semuanya sudah dikonfigurasi

### Saat Production
Ubah `VITE_API_BASE_URL` di `.env.local` atau `.env.production` ke URL backend yang sebenarnya:
```
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

## API Endpoints Yang Tersedia

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Films
- `GET /api/films` - Get semua films dengan pagination
- `GET /api/films/search?term=xxx` - Search films
- `GET /api/films/detail/:id` - Get detail film
- `GET /api/films/genre/:genre` - Get films by genre
- `GET /api/films/year/:year` - Get films by year

### Dashboard
- `GET /api/dashboard/marketing` - Marketing dashboard data
- `GET /api/dashboard/executive` - Executive dashboard data

## Demo Credentials

### Marketing User
- Email: `marketing@filmarchive.com`
- Password: `marketing123`

### Executive User
- Email: `executive@filmarchive.com`
- Password: `executive123`

## Troubleshooting

### Backend tidak terkoneksi
1. Pastikan backend sudah running di port 3000
2. Check file `vite.config.js` untuk proxy configuration
3. Buka DevTools browser dan check Network tab untuk error

### CORS Error (saat production)
- Backend perlu mengaktifkan CORS middleware
- Pastikan `VITE_API_BASE_URL` mengarah ke backend yang benar

## Architecture

```
FilmKita/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── services/
│   └── index.js      # Main server file
│
└── frontend/         # React + Vite application
    ├── src/
    │   ├── services/ # API client (api.js)
    │   ├── pages/    # Page components
    │   ├── components/
    │   └── context/  # Auth context
    └── vite.config.js
```

## Notes

- Frontend sekarang mengambil data films dari backend API bukan hardcoded
- Authentication terhubung dengan backend session
- Semua file backend tetap tidak berubah, hanya frontend yang diupdate untuk menggunakan API
