import { Search, Calendar, ChevronDown, LogIn, LogOut, Star, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function HomePage({ movies, searchQuery, setSearchQuery, selectedGenre, setSelectedGenre, selectedYear, setSelectedYear, isGenreOpen, setIsGenreOpen, isYearOpen, setIsYearOpen, filteredMovies, allGenres, allYears, loading }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getDashboardPath = () => {
    if (user?.role === 'marketing') return '/dashboard/marketing';
    if (user?.role === 'executive') return '/dashboard/executive';
    return '/login';
  };

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
                <h1 className="text-2xl font-bold text-white tracking-tight">FilmArchive</h1>
                <p className="text-xs text-amber-400 font-medium">Cinema Classics & Masterpieces</p>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <button 
                    onClick={() => navigate(getDashboardPath())}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium text-sm rounded-lg shadow-lg hover:shadow-xl">
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-5 py-2.5 bg-red-600/20 border border-red-600/30 hover:bg-red-600/30 text-red-400 transition-all duration-200 font-medium text-sm rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 transition-all duration-200 font-medium text-sm rounded-lg shadow-lg hover:shadow-xl">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
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
        
        {/* Filters Above Cards */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4">
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
                setIsYearOpen(false);
              }}
              className="w-full px-4 py-3.5 border border-slate-600 rounded-lg flex items-center justify-between hover:border-amber-400 hover:bg-slate-700/30 transition-all bg-slate-700/50 text-white font-medium"
            >
              <span>{selectedGenre}</span>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isGenreOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 shadow-2xl z-40 max-h-64 overflow-y-auto rounded-lg">
                {allGenres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => {
                      if (genre === 'All Genres') {
                        setSelectedGenre(genre);
                        setSelectedYear('All Years');
                      } else {
                        navigate(`/genre/${genre}`);
                      }
                      setIsGenreOpen(false);
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
            <button
              onClick={() => {
                setIsYearOpen(!isYearOpen);
                setIsGenreOpen(false);
              }}
              className="w-full px-4 py-3.5 border border-slate-600 rounded-lg flex items-center justify-between hover:border-amber-400 hover:bg-slate-700/30 transition-all bg-slate-700/50 text-white font-medium"
            >
              <span>{selectedYear}</span>
              <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isYearOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 shadow-2xl z-40 max-h-64 overflow-y-auto rounded-lg">
                {allYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => {
                      if (y === 'All Years') {
                        setSelectedYear(y);
                        setSelectedGenre('All Genres');
                      } else {
                        navigate(`/year/${y}`);
                      }
                      setIsYearOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left hover:bg-amber-500/10 hover:text-amber-400 transition-colors text-slate-200 font-medium border-b border-slate-700 last:border-b-0"
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">Loading films...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-8 text-sm text-slate-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            {filteredMovies.length} {filteredMovies.length === 1 ? 'film' : 'films'} found
          </div>
        )}

        {/* Movie Grid */}
        {!loading && (
          <>
            {filteredMovies.length === 0 ? (
              <div className="text-center py-24 bg-slate-800/30 border border-slate-700 rounded-2xl">
                <p className="text-slate-400 text-lg font-medium">No films found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 hover:scale-105"
                  >
                    {/* Poster Area */}
                    <div className="h-24 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center text-3xl relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                       <span className="group-hover:scale-110 transition-transform duration-300">{movie.poster}</span>
                    </div>

                    {/* Content */}
                    <div className="p-2">
                       {/* Title and Rating */}
                       <div className="mb-1">
                         <h3 className="text-sm font-bold text-white leading-tight mb-1 group-hover:text-amber-400 transition-colors">
                           {movie.title}
                         </h3>
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1">
                             <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                             <span className="text-xs font-bold text-amber-400">{movie.rating}</span>
                           </div>
                           <div className="flex items-center gap-1 text-slate-400 text-xs">
                             <Calendar className="w-3 h-3" />
                             <span className="font-medium">{movie.year}</span>
                           </div>
                         </div>
                       </div>

                       {/* Genres */}
                       <div className="flex flex-wrap gap-2 mb-0">
                         {movie.genres && movie.genres.map((genre, index) => (
                           <span
                             key={index}
                             className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full hover:bg-amber-500/20 transition-colors"
                           >
                             {genre}
                           </span>
                         ))}
                       </div>

                       {/* View Button */}
                       <button 
                         onClick={() => navigate(`/movie/${movie.id}`)}
                         className="mt-1 w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium text-xs hover:from-amber-600 hover:to-orange-700 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                         View Details
                       </button>
                    </div>
                  </div>
                ))}
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
              © 2024 FilmArchive. All rights reserved.
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

export default HomePage;
