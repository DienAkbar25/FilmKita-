import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronLeft } from 'lucide-react';
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

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryParam = searchParams.get('q') || '';
  const genreParam = searchParams.get('genre') || 'All Genres';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedGenre, setSelectedGenre] = useState(genreParam);
  const [isGenreOpen, setIsGenreOpen] = useState(false);

  useEffect(() => {
    if (queryParam) {
      fetchSearchResults(queryParam, genreParam);
    }
  }, [queryParam, genreParam]);

  const fetchSearchResults = async (query, genre) => {
    try {
      setLoading(true);
      setError(null);
      
      let endpoint = `/films/search?term=${encodeURIComponent(query)}`;
      if (genre && genre !== 'All Genres') {
        endpoint += `&genre=${encodeURIComponent(genre)}&page=1`;
      }
      
      const res = await api.get(endpoint);
      
      if (res.data.success) {
        const data = res.data.data || [];
        setResults(Array.isArray(data) ? data : [data]);
      } else {
        setError('Search tidak menemukan hasil');
        setResults([]);
      }
    } catch (err) {
      console.error('Error searching:', err);
      // Fallback: jika search gagal, return empty results dengan pesan
      setError('Tidak dapat melakukan pencarian. Coba lagi nanti.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      fetchSearchResults(searchQuery, selectedGenre);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setIsGenreOpen(false);
    if (searchQuery || queryParam) {
      fetchSearchResults(searchQuery || queryParam, genre);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
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
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">FILMKITA</h1>
                <p className="text-xs text-amber-400 font-medium">Cinema Classics & Masterpieces</p>
              </div>
            </div>
            
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Form */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Search Results</h2>
          
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
                type="button"
                onClick={() => setIsGenreOpen(!isGenreOpen)}
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
                      onClick={() => handleGenreChange(genre)}
                      className="w-full px-6 py-3 text-left hover:bg-amber-500/10 hover:text-amber-400 transition-colors text-slate-200 font-medium border-b border-slate-700 last:border-b-0"
                    >
                      {genre}
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

          {/* Results Info */}
          {!loading && queryParam && (
            <div className="text-sm text-slate-400 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Searching for "{queryParam}"
              {results.length > 0 && ` - Found ${results.length} result${results.length !== 1 ? 's' : ''}`}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">Searching films...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg font-medium">Error: {error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">No films found matching your search</p>
          </div>
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map((item, idx) => (
                <MovieCard 
                  key={item.CombineID || item.MovieID || item.TVShowID || item.ID_Film || idx} 
                  item={item}
                  type={item.MovieID ? 'movie' : 'tvshow'}
                  onClickCard={() => {
                    localStorage.setItem('searchQuery', queryParam);
                    localStorage.setItem('searchGenre', selectedGenre);
                  }}
                />
              ))}
            </div>
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
