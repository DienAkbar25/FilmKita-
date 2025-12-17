import { ArrowLeft, Star, Calendar, Clock, Users, Tv } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = ({ movies = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const movie = movies.find(m => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg font-medium mb-4">Movie not found</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const episodes = movie.episodes || [];
  const actors = movie.actors || [];
  const director = movie.director || 'N/A';
  const writer = movie.writer || 'N/A';
  const runtime = movie.runtime || 'N/A';
  const totalVotes = movie.totalVotes || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="h-80 bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center text-9xl border border-slate-700 shadow-xl sticky top-24">
              {movie.poster}
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2">
            {/* Title */}
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-400 text-sm font-medium">Rating</span>
                </div>
                <p className="text-2xl font-bold text-amber-400">{movie.rating}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 text-sm font-medium">Year</span>
                </div>
                <p className="text-2xl font-bold text-white">{movie.year}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 text-sm font-medium">Runtime</span>
                </div>
                <p className="text-2xl font-bold text-white">{runtime}</p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="text-slate-400 text-sm font-medium">Votes</span>
                </div>
                <p className="text-2xl font-bold text-white">{totalVotes.toLocaleString()}</p>
              </div>
            </div>

            {/* Genres */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Synopsis</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {movie.synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Credits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Director */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-sm font-bold text-amber-400 uppercase mb-4">Director</h3>
            <p className="text-2xl font-bold text-white">{director}</p>
          </div>

          {/* Writer */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
            <h3 className="text-sm font-bold text-amber-400 uppercase mb-4">Writer</h3>
            <p className="text-2xl font-bold text-white">{writer}</p>
          </div>
        </div>

        {/* Cast Section */}
        {actors.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {actors.map((actor, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-amber-400 transition-colors"
                >
                  <p className="text-white font-semibold">{actor}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Episodes Section */}
        {episodes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Tv className="w-8 h-8 text-amber-400" />
              Episodes ({episodes.length})
            </h2>
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-400 hover:bg-slate-800/70 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white flex-1">
                      S{String(episode.season).padStart(2, '0')}E{String(episode.episode).padStart(2, '0')} - {episode.title}
                    </h3>
                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full ml-4">
                      {episode.year}
                    </span>
                  </div>
                  {episode.synopsis && (
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {episode.synopsis}
                    </p>
                  )}
                </div>
              ))}
            </div>
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

export default MovieDetail;
