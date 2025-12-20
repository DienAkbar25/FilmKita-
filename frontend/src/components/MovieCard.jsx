import { Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ item, type, onClickCard }) {
  const navigate = useNavigate();
  const title = item.Title || item.title || item.title_name || item.Judul_Film || item.judul_film || 'No Title';
  const rating = item.Rating || item.rating;
  const year = item.Year || item.year || item.startYear || item.Start_Year || item.start_year || 'N/A';
  const genres = item.Genres || item.genres || item.Genre_List || item.genre_list || '';
  const id = item.CombineID || item.combineID || item.MovieID || item.TVShowID || item.ID_Film || item.id_film || '';
  
  const displayRating = rating !== null && rating !== undefined ? rating.toFixed(1) : 'Tidak diketahui';
  const displayYear = year !== 'N/A' ? year : 'Tidak diketahui';

  const handleViewDetails = () => {
    if (onClickCard) {
      onClickCard();
    }
    if (type === 'movie') {
      navigate(`/movie/${id}`);
    } else {
      navigate(`/tvshow/${id}`);
    }
  };

  return (
    <div className="group bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/10 transition-all duration-300 hover:scale-105">
      {/* Poster Area */}
      <div className="h-24 bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center text-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="group-hover:scale-110 transition-transform duration-300">🎬</span>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title and Rating */}
        <div className="mb-2">
          <h3 className="text-sm font-bold text-white leading-tight mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-amber-400">{displayRating}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Calendar className="w-3 h-3" />
              <span className="font-medium">{displayYear}</span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-2">
          {genres && (
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full hover:bg-amber-500/20 transition-colors line-clamp-1">
              {genres}
            </span>
          )}
          <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full hover:bg-amber-500/20 transition-colors">
            {type === 'movie' ? 'Movie' : 'TV Show'}
          </span>
        </div>

        {/* View Button */}
        <button 
          onClick={handleViewDetails}
          className="mt-2 w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium text-xs hover:from-amber-600 hover:to-orange-700 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
