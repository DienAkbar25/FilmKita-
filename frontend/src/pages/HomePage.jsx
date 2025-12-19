import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, LogOut, User } from 'lucide-react';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';

const GENRES = [
  'All Genres',
  'Action & Adventure',
  'Adult',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Film-Noir',
  'Game Show',
  'History',
  'Horror',
  'Kids',
  'Music',
  'Musical',
  'Mystery',
  'News',
  'Reality',
  'Reality-TV',
  'Romance',
  'Sci-Fi & Fantasy',
  'Short',
  'Soap',
  'Sport',
  'Talk',
  'Thriller',
  'War & Politics',
  'Western'
];

export default function HomePage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/films');
      
      if (res.data.success) {
        setMovies(res.data.data.movies || []);
        setTvShows(res.data.data.tvShows || []);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <p className="text-red-400 text-xl">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-lg">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">FILMKITA</h1>
                <p className="text-xs text-amber-400 font-medium">Cinema Classics & Masterpieces</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                   <div className="flex items-center gap-2 text-slate-300 text-sm">
                      <User size={18} />
                      <span>{user.username}</span>
                    </div>
                    {user.role === 'role_exec' && (
                      <button
                        onClick={() => navigate('/dashboard/executive')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all text-sm font-medium"
                      >
                        Executive Dashboard
                      </button>
                    )}
                    {user.role === 'role_mkt' && (
                      <button
                        onClick={() => navigate('/dashboard/marketing')}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg transition-all text-sm font-medium"
                      >
                        Marketing Dashboard
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg transition-all text-sm font-medium"
                >
                  <User size={18} />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-2 tracking-tight">Film Collection</h2>
          <p className="text-slate-400 text-lg">Discover and explore timeless cinema</p>
        </div>
        
        {/* Search & Filters */}
        <form onSubmit={handleSearch} className="mb-8 flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-400" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-slate-600 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-slate-700/50 text-white placeholder-slate-400 rounded-lg"
            />
          </div>

          {/* Genre Dropdown */}
          <div className="relative lg:w-56">
            <button 
              onClick={() => {
                setIsGenreOpen(!isGenreOpen);
              }}
              className="w-full px-4 py-3.5 border border-slate-600 rounded-lg flex items-center justify-between hover:border-amber-400 hover:bg-slate-700/30 transition-all bg-slate-700/50 text-white font-medium"
            >
              <span>{selectedGenre}</span>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isGenreOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 shadow-2xl z-40 max-h-64 overflow-y-auto rounded-lg">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => {
                      setSelectedGenre(genre);
                      setIsGenreOpen(false);
                      if (genre !== 'All Genres') {
                        navigate(`/filter?type=genre&value=${encodeURIComponent(genre)}`);
                      }
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-amber-500/10 hover:text-amber-400 transition-colors text-slate-200 font-medium border-b border-slate-700 last:border-b-0"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Year Dropdown */}
          <div className="relative lg:w-48">
            <button className="w-full px-4 py-3.5 border border-slate-600 rounded-lg flex items-center justify-between hover:border-amber-400 hover:bg-slate-700/30 transition-all bg-slate-700/50 text-white font-medium"
              onClick={() => setIsYearOpen(!isYearOpen)}
            >
              <span>All Years</span>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isYearOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 shadow-2xl z-40 max-h-64 overflow-y-auto rounded-lg">
                {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).sort().map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => {
                      setIsYearOpen(false);
                      navigate(`/filter?type=year&value=${year.toString()}`);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-amber-500/10 hover:text-amber-400 transition-colors text-slate-200 font-medium border-b border-slate-700 last:border-b-0"
                  >
                    {year}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
          >
            Search
          </button>
        </form>

        {/* Results Count */}
        <div className="mb-8 text-sm text-slate-400 font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
          {movies.length + tvShows.length} films found
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">Loading films...</p>
          </div>
        ) : (
          <>
            {/* Movies Grid */}
            {movies.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-6">Top Movies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {movies.map((movie) => (
                    <MovieCard 
                      key={movie.MovieID} 
                      item={movie}
                      type="movie"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TV Shows Grid */}
            {tvShows.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Top TV Shows</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tvShows.map((show) => (
                    <MovieCard 
                      key={show.TVShowID} 
                      item={show}
                      type="tvshow"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-slate-400 text-sm font-medium">
              © 2024 FILMKITA. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">About</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
