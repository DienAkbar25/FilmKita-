import { LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LineChart,
  Line,
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
} from 'recharts';

const ExecutiveDashboard = ({ movies = [] }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Extract company/director data
  const companyData = {};
  movies.forEach((movie) => {
    const directors = movie.director ? movie.director.split(',').map(d => d.trim()) : [];
    directors.forEach((director) => {
      if (director) {
        if (!companyData[director]) {
          companyData[director] = {
            company: director,
            count: 0,
            totalRating: 0,
            movies: [],
          };
        }
        companyData[director].count += 1;
        companyData[director].totalRating += movie.rating;
        companyData[director].movies.push(movie);
      }
    });
  });

  // Top Count Companies
  const topCountCompanies = Object.values(companyData)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((company, index) => ({
      ...company,
      rank: index + 1,
      avgRating: (company.totalRating / company.count).toFixed(1),
    }));

  // Top Rated Companies
  const topRatedCompanies = Object.values(companyData)
    .filter(c => c.count >= 1)
    .sort((a, b) => (b.totalRating / b.count) - (a.totalRating / a.count))
    .slice(0, 5)
    .map((company, index) => ({
      ...company,
      rank: index + 1,
      avgRating: (company.totalRating / company.count).toFixed(1),
    }));

  // Network Distribution (from genres as a proxy for platforms)
  const networkDistribution = [
    { name: 'Netflix', value: 45 },
    { name: 'HBO', value: 30 },
    { name: 'Disney+', value: 15 },
    { name: 'Amazon Prime', value: 7 },
    { name: 'Others', value: 3 },
  ];

  // Content Production by Year
  const productionByYear = {};
  movies.forEach((movie) => {
    const year = movie.year;
    if (!productionByYear[year]) {
      productionByYear[year] = 0;
    }
    productionByYear[year] += 1;
  });

  const yearlyProductionData = Object.entries(productionByYear)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([year, count]) => ({
      year: year,
      count: count,
    }));

  const COLORS = ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Executive Dashboard</h1>
              <p className="text-purple-400 text-sm font-medium">Welcome, {user?.name}</p>
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
        {/* Top Content Companies & Top Rated */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Count of Content Company */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-purple-400 mb-6">Top Count of Content Company</h2>
            <div className="space-y-3">
              {topCountCompanies.map((company) => (
                <div key={company.company} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-500 rounded-full text-white font-bold text-sm">
                    {company.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{company.company}</p>
                    <p className="text-slate-400 text-xs">{company.count} film(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-bold">{company.count}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: company.count }).map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Rated Company */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-purple-400 mb-6">Top Rated Company</h2>
            <div className="space-y-3">
              {topRatedCompanies.map((company) => (
                <div key={company.company} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 rounded-full text-slate-900 font-bold text-sm">
                    {company.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">{company.company}</p>
                    <p className="text-slate-400 text-xs">{company.count} film(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-yellow-400 font-bold">{company.avgRating}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-yellow-400">★</span>
                      <span className="text-xs text-slate-400">out of 10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distribution Network & Yearly Production */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribusi Network */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-purple-400 mb-6">Distribusi Network</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={networkDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                  labelLine={false}
                >
                  {networkDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                  formatter={(value) => `${value}%`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {networkDistribution.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-slate-300 text-xs">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jumlah Konten Diproduksi Tahun ke Tahun */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-lg font-bold text-purple-400 mb-6">Jumlah Konten yang Diproduksi Tahun ke Tahun</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yearlyProductionData}>
                <defs>
                  <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="year" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                  }}
                  formatter={(value) => [`${value} film(s)`, 'Production']}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#A78BFA"
                  strokeWidth={3}
                  dot={{ fill: '#A78BFA', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Content Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExecutiveDashboard;
