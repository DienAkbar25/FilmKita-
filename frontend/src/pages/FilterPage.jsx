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

const YEARS = Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - i).sort();

export default function FilterPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const filterType = searchParams.get('type') || 'genre'; // 'genre' or 'year'
  const filterValue = searchParams.get('value') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(filterValue || 'All Genres');
  const [selectedYear, setSelectedYear] = useState(filterValue || '');
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (filterValue) {
      if (filterType === 'genre') {
        fetchByGenre(filterValue, currentPage);
      } else if (filterType === 'year') {
        fetchByYear(filterValue, currentPage);
      }
    }
  }, [filterType, filterValue, currentPage]);

  const fetchByGenre = async (genre, page = 1) => {
    if (genre === 'All Genres') {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get(`/films/by-genre?genre=${encodeURIComponent(genre)}&page=${page}`);
      
      if (res.data.success) {
        setResults(res.data.data || []);
        setHasMore(res.data.data && res.data.data.length === 15);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Error fetching by genre:', err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchByYear = async (year, page = 1) => {
    if (!year) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get(`/films/by-year?year=${year}&page=${page}`);
      
      if (res.data.success) {
        setResults(res.data.data || []);
        setHasMore(res.data.data && res.data.data.length === 15);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Error fetching by year:', err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setIsGenreOpen(false);
    setCurrentPage(1);
    setSearchParams({ type: 'genre', value: genre, page: '1' });
    if (genre !== 'All Genres') {
      fetchByGenre(genre, 1);
    } else {
      setResults([]);
    }
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearOpen(false);
    setCurrentPage(1);
    setSearchParams({ type: 'year', value: year, page: '1' });
    if (year) {
      fetchByYear(year, 1);
    } else {
      setResults([]);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams({ type: filterType, value: filterValue, page: page.toString() });
  };

  const getFilterTitle = () => {
    if (filterType === 'genre' && filterValue && filterValue !== 'All Genres') {
      return `Search by Genre: ${filterValue}`;
    } else if (filterType === 'year' && filterValue) {
      return `Search by Year: ${filterValue}`;
    }
    return 'Filter Movies';
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
        {/* Title Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-2 tracking-tight">{getFilterTitle()}</h2>
          <p className="text-slate-400 text-lg">Browse and explore cinema by your preference</p>
        </div>
        
        {/* Filter Controls */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
          {/* Genre Filter */}
          <div className="relative lg:w-56">
            <button 
              type="button"
              onClick={() => {
                setIsGenreOpen(!isGenreOpen);
                setIsYearOpen(false);
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
                    onClick={() => handleGenreChange(genre)}
                    className={`w-full px-6 py-3 text-left hover:bg-amber-500/10 hover:text-amber-400 transition-colors font-medium border-b border-slate-700 last:border-b-0 ${
                      selectedGenre === genre ? 'bg-amber-500/20 text-amber-400' : 'text-slate-200'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            )}
          </div>


        </div>

        {/* Results Info */}
        {!loading && results.length > 0 && (
          <div className="mb-8 text-sm text-slate-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            Found {results.length} film{results.length !== 1 ? 's' : ''} matching your filters
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">Loading films...</p>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <p className="text-red-400 text-lg font-medium">Error: {error}</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-24">
            {filterType === 'genre' && selectedGenre === 'All Genres' ? (
              <p className="text-slate-400 text-lg font-medium">Select a genre to view films</p>
            ) : !selectedYear ? (
              <p className="text-slate-400 text-lg font-medium">Select a year to view films</p>
            ) : (
              <p className="text-slate-400 text-lg font-medium">No films found matching your filters</p>
            )}
          </div>
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {results.map((item) => (
                 <MovieCard 
                   key={item.MovieID || item.TVShowID || item.CombineID} 
                   item={item}
                   type={item.MovieID ? 'movie' : 'tvshow'}
                   onClickCard={() => {
                     localStorage.setItem('previousPage', window.location.pathname + window.location.search);
                   }}
                 />
               ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm font-medium">Page</span>
                <input
                  type="number"
                  min="1"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value) || 1;
                    if (page > 0) {
                      handlePageChange(page);
                    }
                  }}
                  className="w-12 px-2 py-1 bg-slate-700/50 border border-slate-600 text-white rounded text-center focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasMore}
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Next
              </button>
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
