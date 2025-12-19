import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ChevronLeft, Briefcase, LogOut } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const COLORS = ['#f59e0b', '#fbbf24', '#fcd34d', '#fce7a0', '#fef3c7'];

export default function ExecutiveDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    productionTrend: [],
    topCompanyRating: [],
    topCompanyFilmCount: [],
    topNetworkContribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/dashboard/exec');
      if (res.data && res.data.data) {
        setDashboardData(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard:', err);
      setError(err.response?.data?.msg || err.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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

  // Clean company names and prepare data
  const cleanCompanyName = (name) => name?.replace(/\r/g, '').trim() || '';
  
  const cleanedTopCompanyRating = dashboardData.topCompanyRating?.map(item => ({
    ...item,
    Company_Name: cleanCompanyName(item.Company_Name)
  })) || [];

  const cleanedTopCompanyFilmCount = dashboardData.topCompanyFilmCount?.map(item => ({
    ...item,
    Company_Name: cleanCompanyName(item.Company_Name),
    JumlahFilm: parseInt(item.JumlahFilm) || 0
  })) || [];

  const cleanedTopNetworkContribution = dashboardData.topNetworkContribution?.map(item => ({
    ...item,
    network_name: cleanCompanyName(item.network_name),
    JumlahFilm: parseInt(item.JumlahFilm) || 0
  })) || [];

  // Prepare production trend data and sort by year
  const sortedProductionTrend = dashboardData.productionTrend
    ?.sort((a, b) => a.Year - b.Year)
    ?.map(item => ({
      ...item,
      JumlahFilm: parseInt(item.JumlahFilm) || 0
    })) || [];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)' }}>
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <ChevronLeft className="w-5 h-5" />
              Kembali
            </button>

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-lg">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">FILMKITA</h1>
                <p className="text-xs text-amber-400 font-medium">Executive Dashboard</p>
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
          <h2 className="text-5xl font-bold text-white mb-2 tracking-tight">Executive Summary</h2>
          <p className="text-slate-400 text-lg">High-level business insights and KPIs</p>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Production Trend */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">Production Trend by Year</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sortedProductionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="Year" 
                  stroke="#9ca3af"
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="JumlahFilm" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={false}
                  name="Number of Films"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top Company Ratings */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Company Ratings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cleanedTopCompanyRating} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#9ca3af" domain={[0, 10]} />
                <YAxis 
                  type="category" 
                  dataKey="Company_Name" 
                  stroke="#9ca3af" 
                  width={140}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toFixed(1)}
                />
                <Bar dataKey="Rating" fill="#f59e0b" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Company Film Count */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Companies by Film Count</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cleanedTopCompanyFilmCount}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis 
                  dataKey="Company_Name" 
                  stroke="#9ca3af"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 11 }}
                />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="JumlahFilm" fill="#fbbf24" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Network Contribution */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Top Networks Contribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cleanedTopNetworkContribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ network_name, JumlahFilm }) => `${network_name}: ${JumlahFilm}`}
                  outerRadius={100}
                  dataKey="JumlahFilm"
                >
                  {cleanedTopNetworkContribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Networks Bar Chart */}
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Network Contribution Details</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cleanedTopNetworkContribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis 
                  type="category" 
                  dataKey="network_name" 
                  stroke="#9ca3af" 
                  width={120}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => value.toLocaleString()}
                />
                <Bar dataKey="JumlahFilm" fill="#fcd34d" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Total Films Analyzed</p>
            <p className="text-3xl font-bold text-amber-400">
              {sortedProductionTrend.reduce((sum, item) => sum + item.JumlahFilm, 0).toLocaleString()}
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Top Rated Company</p>
            <p className="text-2xl font-bold text-amber-400">
              {cleanedTopCompanyRating[0]?.Rating?.toFixed(1) || 'N/A'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{cleanedTopCompanyRating[0]?.Company_Name || 'N/A'}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Most Productive Company</p>
            <p className="text-2xl font-bold text-amber-400">
              {cleanedTopCompanyFilmCount[0]?.JumlahFilm?.toLocaleString() || 'N/A'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{cleanedTopCompanyFilmCount[0]?.Company_Name || 'N/A'}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600 rounded-lg p-6">
            <p className="text-slate-400 text-sm font-medium mb-2">Top Network</p>
            <p className="text-2xl font-bold text-amber-400">
              {cleanedTopNetworkContribution[0]?.JumlahFilm?.toLocaleString() || 'N/A'}
            </p>
            <p className="text-xs text-slate-400 mt-1">{cleanedTopNetworkContribution[0]?.network_name || 'N/A'}</p>
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
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                About
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
