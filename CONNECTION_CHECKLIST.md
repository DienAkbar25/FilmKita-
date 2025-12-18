# Frontend-Backend Connection Checklist

## Status Koneksi

✅ **Frontend siap** - Service API sudah setup di `src/services/api.js`  
✅ **Backend siap** - CORS middleware sudah ditambahkan  
✅ **Vite proxy** - Sudah dikonfigurasi untuk development  

## Langkah Setup (Jalankan dengan urutan ini)

### 1. Setup Backend Database (PENTING)

Backend memerlukan database MSSQL yang sudah dikonfigurasi. Edit file `.env` di folder backend:

```bash
cd backend
```

Buat atau update file `.env`:
```
PORT=3000
SESSION_SECRET=filmkita_secret
DB_SERVER=your_mssql_server
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Jalankan Backend Server

```bash
npm start
```

Seharusnya muncul:
```
Server running on http://localhost:3000
```

### 4. Install Frontend Dependencies (Terminal baru)

```bash
cd frontend
npm install
```

### 5. Jalankan Frontend Development Server

```bash
npm run dev
```

Seharusnya muncul:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Testing Koneksi

### A. Test di Browser

1. Buka `http://localhost:5173` di browser
2. Tunggu hingga aplikasi load
3. Cek Console (F12) untuk error

**Bagus jika:**
- Films list muncul (data dari backend)
- Tidak ada CORS error

**Jika ada error:**
- Buka DevTools Network tab
- Lihat request ke `/api/films`
- Check status code dan response

### B. Test API Langsung (Optional)

Buka terminal baru:

```bash
# Test GET /api/films
curl http://localhost:3000/api/films

# Should return:
# {
#   "success": true,
#   "data": [array of films]
# }
```

### C. Test Auth

1. Di aplikasi, klik "Login"
2. Gunakan demo credentials:
   - Email: `marketing@filmarchive.com`
   - Password: `marketing123`
3. Seharusnya login berhasil dan redirect ke home

## Troubleshooting

### Backend tidak start
```
Error: Cannot find module 'cors'
```
**Solution:** Jalankan `npm install` di folder backend

### CORS Error di Frontend
```
Access to XMLHttpRequest at 'http://localhost:3000/api/films' 
has been blocked by CORS policy
```
**Solution:** 
1. Pastikan CORS sudah di-add ke `backend/index.js` (sudah selesai)
2. Pastikan backend running di port 3000
3. Restart backend server

### API returns 500 error
```
{
  "success": false,
  "message": "Connection string is invalid."
}
```
**Solution:** Database connection tidak tersetup. Check `.env` file di backend dengan konfigurasi MSSQL yang benar.

### Frontend tidak connect ke backend
```
ERR_CONNECTION_REFUSED
```
**Solution:**
1. Pastikan backend running (`npm start` di folder backend)
2. Pastikan backend di port 3000
3. Buka browser ke `http://localhost:3000` - seharusnya ada error tapi server respond
4. Restart frontend dev server

## File yang Sudah Diubah

### Backend
- ✅ `backend/index.js` - Added CORS middleware

### Frontend
- ✅ `frontend/src/services/api.js` - API client service
- ✅ `frontend/src/context/AuthContext.jsx` - Using real API
- ✅ `frontend/src/pages/Login.jsx` - API authentication
- ✅ `frontend/src/App.jsx` - Fetching films from API
- ✅ `frontend/vite.config.js` - Proxy configuration
- ✅ `frontend/.env.local` - API URL config

## Network Diagram

```
Frontend (localhost:5173)
    ↓ (fetch request)
Vite Dev Server (proxy)
    ↓ (forward to backend)
Backend API (localhost:3000)
    ↓ (query)
MSSQL Database
```

## Environment Variables

### Frontend (`.env.local`)
```
VITE_API_BASE_URL=http://localhost:3000/api  # Production
VITE_API_BASE_URL=/api                        # Development (dengan proxy)
```

### Backend (`.env`)
```
PORT=3000
SESSION_SECRET=filmkita_secret
DB_SERVER=your_server
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

## Selesai!

Jika semua langkah di atas berhasil, frontend sudah terhubung dengan backend. 

Aplikasi sekarang mengambil data films dari database melalui API backend.
