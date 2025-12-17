import { LogOut, ArrowLeft, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

const MarketingDashboard = ({ movies = [] }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Content Quality Index Data (Monthly trend)
  const qualityIndexData = [
    { month: 'Jan', quality: 72 },
    { month: 'Feb', quality: 76 },
    { month: 'Mar', quality: 75 },
    { month: 'Apr', quality: 78 },
    { month: 'May', quality: 82 },
    { month: 'Jun', quality: 85 },
    { month: 'Jul', quality: 88 },
  ];

  // Rating Growth Data (Monthly)
  const ratingGrowthData = [
    { month: 'Jan', rating: 72 },
    { month: 'Feb', rating: 75 },
    { month: 'Mar', rating: 73 },
    { month: 'Apr', rating: 78 },
    { month: 'May', rating: 82 },
    { month: 'Jun', rating: 80 },
    { month: 'Jul', rating: 85 },
  ];

  // Genre Distribution Data
  const genreDistribution = [
    { name: 'Drama', value: 35 },
    { name: 'Action', value: 25 },
    { name: 'Sci-Fi', value: 20 },
    { name: 'Crime', value: 15 },
    { name: 'Romance', value: 5 },
  ];

  // Countries Broadcasting Data
  const countriesData = [
    { country: 'US', broadcasts: 87 },
    { country: 'CA', broadcasts: 68 },
    { country: 'JP', broadcasts: 65 },
    { country: 'KR', brackets: 52 },
    { country: 'FR', broadcasts: 48 },
    { country: 'UK', broadcasts: 42 },
    { country: 'DE', broadcasts: 38 },
    { country: 'AU', broadcasts: 28 },
  ];

  // Platform Performance Data
  const platformData = [
    { platform: 'Netflix', performance: 92 },
    { platform: 'HBO', performance: 85 },
    { platform: 'Disney+', performance: 78 },
    { platform: 'Amazon Prime', performance: 72 },
    { platform: 'Apple TV+', performance: 65 },
  ];

  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];
  const GENRE_COLORS = ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Marketing Dashboard</h1>
              <p className="text-amber-400 text-sm font-medium">Welcome, {user?.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 bg-red-600/20 border border-red-600/30 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Content Quality Index */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-amber-400 mb-6">Content Quality Index</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={qualityIndexData}>
                <defs>
                  <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="quality"
                  stroke="#F59E0B"
                  fill="url(#colorQuality)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Rating Growth & Genre Distribution */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-amber-400">Pertumbuhan Rating & Distribusi Genre</h2>
              <input
                type="text"
                placeholder="Filter genre"
                className="px-4 py-1.5 bg-white text-slate-900 rounded-lg text-sm font-medium placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Rating Growth Line Chart */}
              <div>
                <p className="text-amber-400 text-sm font-semibold mb-4">Pertumbuhan Rating</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={ratingGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94A3B8" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#E2E8F0',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rating"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Genre Distribution Donut */}
              <div>
                <p className="text-amber-400 text-sm font-semibold mb-4">Distribusi Konten</p>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={genreDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {genreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#E2E8F0',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Countries Broadcasting */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-amber-400 mb-6">Negara Paling Sering Menayangkan</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countriesData} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94A3B8" domain={[0, 100]} />
                <YAxis dataKey="country" type="category" stroke="#94A3B8" width={70} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="broadcasts" fill="#FBBF24" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Performance */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-amber-400 mb-6">Network (Platform) with Best Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis type="number" stroke="#94A3B8" domain={[0, 100]} />
                <YAxis dataKey="platform" type="category" stroke="#94A3B8" width={90} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                />
                <Bar dataKey="performance" fill="#FBBF24" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketingDashboard;
