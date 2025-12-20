import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';
import { api } from '../services/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validasi input
    if (!username || !password) {
      setError('Username dan password harus diisi');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', {
        username,
        password
      });

      if (res.data) {
        // Simpan user info ke localStorage
        localStorage.setItem('user', JSON.stringify({
          username: res.data.user.username,
          role: res.data.user.role,
          loginTime: new Date().toISOString()
        }));

        // Redirect ke home
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Username atau password salah');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition duration-200 flex items-center gap-2"
        title="Kembali ke Home"
      >
        <ArrowLeft size={20} />
        <span className="hidden sm:inline text-sm font-medium">Kembali</span>
      </button>

      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-10 border border-slate-700">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-3">FilmKita</h1>
          <p className="text-slate-400 text-lg font-medium">Masuk ke akun Anda</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-orange-50/10 border border-orange-500/30 text-orange-400 px-4 py-3 rounded-lg mb-6 flex gap-2">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-base font-bold text-white mb-2">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder-slate-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-base font-bold text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                disabled={loading}
                className="w-full pl-12 pr-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-slate-700/50 text-white placeholder-slate-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2 mt-8 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={22} />
            {loading ? 'Masuk...' : 'Masuk'}
          </button>
        </form>

 
      </div>
    </div>
  );
}
