import { ArrowLeft, Star, Calendar } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const GenreSearch = ({ movies = [] }) => {
  const { genre } = useParams();
  const navigate = useNavigate();

  const filteredMovies = movies.filter(movie => 
    movie.genres?.includes(decodeURIComponent(genre))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Search by Genre</h1>
            <p className="text-amber-400 text-lg font-semibold">{decodeURIComponent(genre)}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Results Count */}
        <div className="mb-8 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-300 font-medium">
            Found <span className="text-amber-400 font-bold">{filteredMovies.length}</span> {filteredMovies.length === 1 ? 'film' : 'films'} in {decodeURIComponent(genre)} genre
          </p>
        </div>

        {/* Movie Grid */}
        {filteredMovies.length === 0 ? (
          <div className="text-center py-24 bg-slate-800/30 border border-slate-700 rounded-2xl">
            <p className="text-slate-400 text-lg font-medium">No films found in {decodeURIComponent(genre)} genre</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 hover:scale-105"
              >
                {/* Poster Area */}
                <div className="h-40 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center text-6xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="group-hover:scale-110 transition-transform duration-300">{movie.poster}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Title and Rating */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white leading-tight mb-2 group-hover:text-amber-400 transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-bold text-amber-400">{movie.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{movie.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.genres?.map((g, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full"
                      >
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Synopsis */}
                  <p className="text-slate-300 leading-relaxed text-sm line-clamp-3 group-hover:text-slate-200 transition-colors">
                    {movie.synopsis}
                  </p>

                  {/* View Button */}
                  <button 
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="mt-4 w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium text-sm hover:from-amber-600 hover:to-orange-700 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 backdrop-blur-md mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm font-medium">
          © 2024 FilmArchive. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default GenreSearch;
