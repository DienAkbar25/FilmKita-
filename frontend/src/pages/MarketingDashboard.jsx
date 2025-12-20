import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ChevronLeft, BarChart3, LogOut, ChevronDown } from 'lucide-react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const COLORS = ['#f59e0b', '#fbbf24', '#fcd34d', '#fce7a0', '#fef3c7', '#fed7aa', '#fda34b'];

export default function MarketingDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    genreFilmCount: [],
    genreRating: [],
    contentQualityIndex: [],
    tayangPerNegara: [],
  });
  const [genreAnalysis, setGenreAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async (genre = '') => {
    try {
      setLoading(true);
      setError(null);
      const params = genre ? `?genre=${encodeURIComponent(genre)}` : '';
      const res = await api.get(`/dashboard/mkt${params}`);
      
      console.log('Marketing Dashboard API Response:', res.data);
      
      if (res.data && res.data.data) {
        setDashboardData(res.data.data.views);
        if (genre && res.data.data.procedures) {
          console.log('Genre Analysis Data:', res.data.data.procedures);
        }
        setGenreAnalysis(res.data.data.procedures);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError(err.response?.data?.msg || err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsGenreOpen(false);
    fetchDashboardData(genre);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)' }} className="flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)' }} className="flex items-center justify-center">
        <p className="text-white text-lg">Loading dashboard...</p>
      </div>
    );
  }

  // Clean data functions
  const cleanGenreName = (name) => name?.replace(/\r/g, '').trim() || '';

  const cleanedGenreFilmCount = dashboardData.genreFilmCount?.map(item => ({
    ...item,
    Genre_Name: cleanGenreName(item.Genre_Name),
    FilmCount: parseInt(item.FilmCount) || 0
  })) || [];

  const cleanedGenreRating = dashboardData.genreRating?.map(item => ({
    ...item,
    Genre_Name: cleanGenreName(item.Genre_Name),
    Avg_Rating: parseFloat(item.Avg_Rating) || 0
  })) || [];

  const cleanedContentQualityIndex = dashboardData.contentQualityIndex?.map(item => ({
    ...item,
    CQI: parseFloat(item.CQI) || 0
  }))?.sort((a, b) => a.start_year - b.start_year) || [];

  const cleanedTayangPerNegara = dashboardData.tayangPerNegara?.map(item => ({
    ...item,
    Region_Name: cleanGenreName(item.Region_Name),
    Berapa_Kali_Tayang: parseInt(item.Berapa_Kali_Tayang) || 0
  }))?.sort((a, b) => b.Berapa_Kali_Tayang - a.Berapa_Kali_Tayang)?.slice(0, 15) || [];

  // Get unique genres for dropdown
  const uniqueGenres = Array.from(
    new Map(cleanedGenreFilmCount.map(item => [item.Genre_Name, item])).values()
  ).map(item => item.Genre_Name).sort();

  // Prepare genre distribution data with Top 5 + Others
  const genreDistributionData = (() => {
    const sortedGenres = [...cleanedGenreFilmCount].sort((a, b) => b.FilmCount - a.FilmCount);
    const top5 = sortedGenres.slice(0, 5);
    const others = sortedGenres.slice(5);
    
    const othersTotal = others.reduce((sum, genre) => sum + genre.FilmCount, 0);
    
    const result = [...top5];
    if (othersTotal > 0) {
      result.push({
        Genre_Name: 'Lainnya',
        FilmCount: othersTotal
      });
    }
    
    return result;
  })();

  // Genre analysis data - map to correct column names from procedures
  const genreRatingByYear = genreAnalysis?.genreRatingByYear?.map(item => ({
    ...item,
    year: parseInt(item.Year || 0),
    avg_rating: parseFloat(item.Rating || 0)
  }))?.sort((a, b) => a.year - b.year) || [];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)' }}>
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center rounded-lg shadow-lg">
                <BarChart3 className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">FILMKITA</h1>
                <p className="text-xs text-blue-400 font-medium">Marketing Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <>
                  <div className="text-slate-300 text-sm">
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-2 tracking-tight">Marketing Analytics</h2>
          <p className="text-slate-400 text-lg">Monitor content performance and market trends</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Content Quality Index */}
          <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Content Quality Index Over Years</h3>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={cleanedContentQualityIndex}>
                <defs>
                  <linearGradient id="colorCQI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="start_year" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Area
                  type="monotone"
                  dataKey="CQI"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorCQI)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Film Count vs Rating */}
          <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Genre Analysis: Film Count vs Average Rating</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Film Count */}
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-3">Film Count per Genre</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cleanedGenreFilmCount} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis
                      type="category"
                      dataKey="Genre_Name"
                      stroke="#9ca3af"
                      width={100}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value) => value.toLocaleString()}
                    />
                    <Bar dataKey="FilmCount" fill="#3b82f6" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-sm font-bold text-blue-400 mb-3">Average Rating per Genre</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cleanedGenreRating}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis
                      dataKey="Genre_Name"
                      stroke="#9ca3af"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis stroke="#9ca3af" domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #3b82f6',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value) => value.toFixed(2)}
                    />
                    <Bar dataKey="Avg_Rating" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Genre Deep Dive */}
          {uniqueGenres.length > 0 && (
            <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-slate-800/60 to-slate-900/40 border border-slate-600/50 rounded-xl p-8 shadow-lg">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Genre Deep Dive Analysis</h3>
                </div>
                <div className="relative w-full lg:w-72">
                  <button
                    onClick={() => setIsGenreOpen(!isGenreOpen)}
                    className="w-full px-5 py-3 border border-slate-600 rounded-lg flex items-center justify-between hover:border-blue-400 hover:bg-blue-500/10 transition-all bg-slate-700/50 text-white font-semibold text-base shadow-md hover:shadow-lg"
                  >
                    <span className="text-blue-300">{selectedGenre || 'Select Genre'}</span>
                    <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isGenreOpen && (
                    <div className="absolute top-full left-0 right-full lg:right-auto mt-2 bg-slate-800 border border-slate-700 shadow-2xl z-40 max-h-64 overflow-y-auto rounded-lg lg:w-64">
                      <button
                        onClick={() => {
                          setSelectedGenre('');
                          setIsGenreOpen(false);
                          setGenreAnalysis(null);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-blue-500/10 hover:text-blue-400 transition-colors text-slate-200 font-medium border-b border-slate-700"
                      >
                        Clear Filter
                      </button>
                      {uniqueGenres.map((genre) => (
                        <button
                          key={genre}
                          onClick={() => handleGenreSelect(genre)}
                          className="w-full px-4 py-3 text-left hover:bg-blue-500/10 hover:text-blue-400 transition-colors text-slate-200 font-medium border-b border-slate-700 last:border-b-0"
                        >
                          {genre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {genreAnalysis && (
                <div className="space-y-0">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-6">
                    <div className="col-span-1 lg:col-span-1 bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-6 rounded-lg border border-blue-500/30 flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs text-blue-300 font-semibold uppercase tracking-wider mb-3">Total Films</p>
                      <p className="text-4xl font-bold text-blue-300">
                        {(genreAnalysis.countGenre?.[0]?.JumlahKonten || 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-1 lg:col-span-1 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 p-6 rounded-lg border border-cyan-500/30 flex flex-col justify-center shadow-md hover:shadow-lg transition-shadow">
                      <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-3">Avg Rating</p>
                      <p className="text-4xl font-bold text-cyan-300">
                        {(genreAnalysis.ratingGenre?.[0]?.AvgRating || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6">
                    {/* Genre Rating by Year Chart */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-6 rounded-lg border border-slate-600/50 shadow-lg">
                      <h4 className="text-base font-bold text-blue-300 mb-5">Rating Trend by Year</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={genreRatingByYear}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                          <XAxis dataKey="year" stroke="#9ca3af" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#9ca3af" domain={[0, 10]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid #3b82f6',
                              borderRadius: '8px',
                              color: '#fff',
                            }}
                            formatter={(value) => value.toFixed(2)}
                          />
                          <Line
                            type="monotone"
                            dataKey="avg_rating"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Genre Distribution Pie Chart - Larger */}
                    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/30 p-6 rounded-lg border border-slate-600/50 shadow-lg -mt-16">
                      <h4 className="text-base font-bold text-blue-300 mb-5">Genre Distribution</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={genreDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ Genre_Name, FilmCount }) => `${Genre_Name}: ${FilmCount.toLocaleString()}`}
                            outerRadius={80}
                            innerRadius={40}
                            dataKey="FilmCount"
                          >
                            {genreDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1e293b',
                              border: '1px solid #3b82f6',
                              borderRadius: '8px',
                              color: '#fff',
                            }}
                            formatter={(value) => value.toLocaleString()}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {!genreAnalysis && (
                <div className="text-center py-8">
                  <p className="text-slate-400">Select a genre to view detailed analysis</p>
                </div>
              )}
            </div>
          )}

          {/* Top Countries/Regions Performance */}
          <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Regions: Broadcasting Count</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={cleanedTayangPerNegara}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="Region_Name"
                  stroke="#9ca3af"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #3b82f6',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="Berapa_Kali_Tayang" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>


        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-slate-400 text-sm font-medium">
              © 2024 FILMKITA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                About
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-lg p-8 max-w-sm mx-4 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">Konfirmasi Logout</h3>
            <p className="text-slate-300 mb-8">Apakah anda yakin ingin log out?</p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelLogout}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                Tidak
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
