import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('marketing');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    const result = await signup(email, password, name, role);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  const handleSubmit = isSignup ? handleSignup : handleLogin;

  // Demo credentials helper
  const fillDemoMarketing = () => {
    setEmail('marketing@filmarchive.com');
    setPassword('marketing123');
    setName('');
  };

  const fillDemoExecutive = () => {
    setEmail('executive@filmarchive.com');
    setPassword('executive123');
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      {/* Back to Home */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-slate-400 hover:text-white transition-colors font-medium"
      >
        ← Back to Home
      </button>

      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-3xl">F</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">FilmArchive</h1>
            <p className="text-slate-400">{isSignup ? 'Create your account' : 'Welcome back'}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                disabled={loading}
              />
            </div>

            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  disabled={loading}
                >
                  <option value="marketing">Marketing</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSignup ? (
                <>
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="text-center mb-6 pb-6 border-b border-slate-700">
            <p className="text-slate-400 text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError('');
                  setName('');
                  setEmail('');
                  setPassword('');
                }}
                className="text-amber-400 hover:text-amber-300 ml-1 font-semibold transition-colors"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-2">
            <p className="text-xs text-slate-500 font-semibold uppercase mb-3">Demo Credentials</p>
            <button
              onClick={fillDemoMarketing}
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 hover:border-amber-400/50 transition-all"
            >
              <span className="font-medium">Marketing:</span> marketing@filmarchive.com
            </button>
            <button
              onClick={fillDemoExecutive}
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 text-sm hover:bg-slate-700 hover:border-amber-400/50 transition-all"
            >
              <span className="font-medium">Executive:</span> executive@filmarchive.com
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
