import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Star, 
  Calendar, 
  Clock, 
  Users, 
  Flag, 
  Volume2,
  Film,
  Play 
} from 'lucide-react';
import { api } from '../services/api';
import { 
  extractItemData, 
  parseContributors, 
  formatNumber,
  truncateText,
  getCast
} from '../utils/detailPageHelpers';
import { CLASS_NAMES, LAYOUT, ICON_SIZES } from '../config/theme';

export default function DetailPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parentSeriesData, setParentSeriesData] = useState(null);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(-1);
  
  const handleBack = () => {
    // Check if this is an episode with a parent series
    const parentSeriesId = localStorage.getItem('parentSeriesId');
    const searchQuery = localStorage.getItem('searchQuery');
    const searchGenre = localStorage.getItem('searchGenre');
    const previousPage = localStorage.getItem('previousPage');
    
    // Remove temp storage
    localStorage.removeItem('parentSeriesId');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchGenre');
    localStorage.removeItem('previousPage');
    
    // If this is an episode, navigate to parent series
    if (parentSeriesId && item && item.combineID !== parentSeriesId) {
      navigate(`/movie/${parentSeriesId}`);
    } else if (searchQuery) {
      // If came from search, go back to search results
      let searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
      if (searchGenre && searchGenre !== 'All Genres') {
        searchUrl += `&genre=${encodeURIComponent(searchGenre)}`;
      }
      navigate(searchUrl);
    } else if (previousPage) {
      navigate(previousPage);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id, type]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const endpoint = `/films/detail/${id}`;
      const res = await api.get(endpoint);
      
      if (res.data.success) {
        setItem(res.data.data);
        
        // Check if this is an episode with parent series
        const parentSeriesId = localStorage.getItem('parentSeriesId');
        if (parentSeriesId && res.data.data.combineID !== parentSeriesId) {
          // Fetch parent series data to get episode list
          fetchParentSeriesData(parentSeriesId);
        }
      }
    } catch (err) {
      console.error('Error fetching detail:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchParentSeriesData = async (parentId) => {
    try {
      const res = await api.get(`/films/detail/${parentId}`);
      if (res.data.success && res.data.data.episodes) {
        setParentSeriesData(res.data.data);
        // Find current episode index
        const episodes = res.data.data.episodes;
        const currentIdx = episodes.findIndex(ep => ep.CombineID === id);
        setCurrentEpisodeIndex(currentIdx);
      }
    } catch (err) {
      console.error('Error fetching parent series:', err);
    }
  };

  const handlePrevEpisode = () => {
    if (parentSeriesData && currentEpisodeIndex > 0) {
      const prevEpisode = parentSeriesData.episodes[currentEpisodeIndex - 1];
      navigate(`/movie/${prevEpisode.CombineID}`);
    }
  };

  const handleNextEpisode = () => {
    if (parentSeriesData && currentEpisodeIndex < parentSeriesData.episodes.length - 1) {
      const nextEpisode = parentSeriesData.episodes[currentEpisodeIndex + 1];
      navigate(`/movie/${nextEpisode.CombineID}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Film className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-6">{error || 'Film tidak ditemukan'}</p>
          <button 
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-orange-700 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  const data = extractItemData(item);
  const contributors = parseContributors(item.contributors);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <Header onBack={handleBack} />

      {/* Main Content */}
      <main className={`${LAYOUT.maxWidth} mx-auto ${LAYOUT.padding} ${LAYOUT.py}`}>
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <HeroSection data={data} contributors={contributors} />

          {/* Information Cards */}
          <InformationCards data={data} contributors={contributors} />

          {/* Actors Section */}
          {getCast(contributors).length > 0 && (
            <ActorsSection contributors={contributors} />
          )}

          {/* Languages & Countries */}
          {(data.languages.length > 0 || data.countries.length > 0) && (
            <InfoSection data={data} />
          )}

          {/* Crew Section */}
          {(contributors.composers.length > 0 || contributors.producers.length > 0) && (
            <CrewSection contributors={contributors} />
          )}

          {/* Episodes Section */}
           {item.episodes && item.episodes.length > 0 && (
             <EpisodesSection episodes={item.episodes} parentSeriesId={item.combineID} />
           )}

          {/* Episode Navigation or Back Button */}
          <div className="mt-12">
            {parentSeriesData && currentEpisodeIndex >= 0 ? (
              // Episode navigation
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={handlePrevEpisode}
                  disabled={currentEpisodeIndex === 0}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Episode Sebelumnya
                </button>
                
                <span className="text-slate-400 text-sm font-medium">
                  Episode {currentEpisodeIndex + 1} dari {parentSeriesData.episodes.length}
                </span>
                
                <button 
                  onClick={handleNextEpisode}
                  disabled={currentEpisodeIndex === parentSeriesData.episodes.length - 1}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                  Episode Selanjutnya
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            ) : (
              // Back button for non-episodes
              <div className="text-center">
                <button 
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 transition-all font-medium"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Kembali ke Daftar Film
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// ============= COMPONENTS =============

function Header({ onBack }) {
  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
      <div className={`${LAYOUT.maxWidth} mx-auto ${LAYOUT.padding} py-6`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white font-bold">FilmKita</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ data, contributors }) {
  return (
    <div className="bg-gradient-to-r from-slate-800/50 to-amber-900/20 border border-slate-700/50 rounded-xl p-8 mb-8 backdrop-blur-sm">
      <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
        <div className="flex-1">
          <h1 className="text-5xl font-bold text-white mb-4">{data.title}</h1>
          <p className="text-slate-300 text-base leading-relaxed mb-6">
            {truncateText(data.description, 250)}
          </p>

          {/* Genres */}
          {data.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.genres.slice(0, 3).map((genre, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-blue-500/30 text-blue-200 border border-blue-400/30 rounded-full text-sm font-semibold"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 bg-amber-500/20 px-6 py-4 rounded-lg border border-amber-400/30 flex-shrink-0">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          <div className="text-left">
            <div className="text-amber-400 font-bold text-xl">{data.rating.toFixed(1)}</div>
            <div className="text-amber-300 text-xs">/ 10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InformationCards({ data, contributors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Year */}
      <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
            <Calendar className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Tahun Rilis</div>
            <div className="text-white text-xl font-bold mt-1">{data.year}</div>
          </div>
        </div>
      </div>

      {/* Writer/Director */}
      {(contributors.writers.length > 0 || contributors.directors.length > 0) && (
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">
                {contributors.writers.length > 0 ? 'Writer' : 'Director'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(contributors.writers.length > 0 ? contributors.writers : contributors.directors)
                  .slice(0, 2)
                  .map((person, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-amber-500/20 text-amber-200 rounded text-sm font-semibold"
                    >
                      {person}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Runtime */}
      {data.runtime && (
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-slate-700/50 p-3 rounded-lg flex-shrink-0">
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Runtime</div>
              <div className="text-white text-xl font-bold mt-1">{data.runtime} menit</div>
            </div>
          </div>
        </div>
      )}

      {/* Total Votes */}
      {data.votes && (
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Votes</div>
              <div className="text-white text-xl font-bold mt-1">{formatNumber(data.votes)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActorsSection({ contributors }) {
  const cast = getCast(contributors);
  const actors = contributors.actors || [];
  const actresses = contributors.actresses || [];
  
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-amber-900/10 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
          <Users className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h3 className="text-white text-lg font-bold">Casting</h3>
          <p className="text-slate-400 text-sm mt-1">Aktor dan Aktris dalam film ini</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Actors */}
        {actors.length > 0 && (
          <div>
            <h4 className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Aktor</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {actors.map((actor, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2.5 bg-slate-700/40 text-slate-200 border border-slate-600/50 rounded-lg text-sm font-medium hover:bg-slate-700/60 hover:border-amber-400/30 transition-all"
                >
                  🎭 {actor}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actresses */}
        {actresses.length > 0 && (
          <div>
            <h4 className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Aktris</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {actresses.map((actress, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2.5 bg-slate-700/40 text-slate-200 border border-slate-600/50 rounded-lg text-sm font-medium hover:bg-slate-700/60 hover:border-amber-400/30 transition-all"
                >
                  🎭 {actress}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Combined cast if separated categories not available */}
        {cast.length > 0 && actors.length === 0 && actresses.length === 0 && (
          <div>
            <h4 className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-3">Pemain Utama</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {cast.slice(0, 12).map((person, idx) => (
                <div 
                  key={idx}
                  className="px-4 py-2.5 bg-slate-700/40 text-slate-200 border border-slate-600/50 rounded-lg text-sm font-medium hover:bg-slate-700/60 hover:border-amber-400/30 transition-all"
                >
                  🎭 {person}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoSection({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Languages */}
      {data.languages.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Volume2 className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Languages</h4>
          </div>
          <p className="text-slate-300 text-2xl leading-relaxed font-bold">
            {data.languages.slice(0, 6).join(', ')}
          </p>
        </div>
      )}

      {/* Countries */}
      {data.countries.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Flag className="w-6 h-6 text-slate-400" />
            </div>
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Countries</h4>
          </div>
          <p className="text-slate-300 text-2xl leading-relaxed font-bold">
            {data.countries.slice(0, 5).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}

function CrewSection({ contributors }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
      <h3 className="text-white text-lg font-bold mb-8">Crew</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {contributors.composers.length > 0 && (
          <div className="flex flex-col">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Composer</p>
            <div className="flex flex-col gap-2">
              {contributors.composers.slice(0, 3).map((composer, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-slate-700/40 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-colors"
                >
                  {composer}
                </span>
              ))}
            </div>
          </div>
        )}

        {contributors.producers.length > 0 && (
          <div className="flex flex-col">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Producers</p>
            <div className="flex flex-col gap-2">
              {contributors.producers.slice(0, 3).map((producer, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-slate-700/40 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-700/60 transition-colors"
                >
                  {producer}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EpisodesSection({ episodes, parentSeriesId }) {
  const navigate = useNavigate();
  const [expandedEpisode, setExpandedEpisode] = useState(null);
  const [currentEpisodePage, setCurrentEpisodePage] = useState(1);
  const episodesPerPage = 15;

  if (!episodes || episodes.length === 0) return null;

  const totalEpisodePages = Math.ceil(episodes.length / episodesPerPage);
  const startIdx = (currentEpisodePage - 1) * episodesPerPage;
  const endIdx = startIdx + episodesPerPage;
  const displayedEpisodes = episodes.slice(startIdx, endIdx);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-amber-500/20 p-3 rounded-lg flex-shrink-0">
          <Play className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-white text-lg font-bold">
          Episodes ({episodes.length} Episode{episodes.length !== 1 ? 's' : ''})
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {displayedEpisodes.map((episode, idx) => {
          const actualIdx = startIdx + idx;
          const seasonNum = episode.SeasonNumber;
          const episodeNum = episode.EpisodeNumber;
          const episodeTitle = episode.title_name || episode.original_title || episode.title || episode.name || `Episode ${episodeNum || idx + 1}`;
          
          const handleEpisodeClick = (e) => {
            // If clicking on the detail area or buttons, just expand/collapse
            if (e.target.closest('.episode-details') || expandedEpisode === actualIdx) {
              setExpandedEpisode(expandedEpisode === actualIdx ? null : actualIdx);
            } else {
              // Otherwise, navigate to episode detail and save parent series ID
              localStorage.setItem('parentSeriesId', parentSeriesId);
              navigate(`/movie/${episode.CombineID}`);
            }
          };

          return (
           <div
             key={actualIdx}
             onClick={handleEpisodeClick}
            className="bg-gradient-to-r from-slate-800/50 to-amber-900/10 border border-slate-700/50 rounded-lg p-4 hover:border-amber-400/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-amber-500/20 px-3 py-2 rounded-lg flex-shrink-0">
                <span className="text-amber-400 font-bold text-sm">
                  {seasonNum && episodeNum ? `S${seasonNum} E${episodeNum}` : `Ep ${episode.number || idx + 1}`}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">
                  {episodeTitle}
                </h4>
                {episode.year && (
                  <p className="text-slate-400 text-sm mt-1">{episode.year}</p>
                )}
              </div>
              {episode.rating && (
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 font-semibold text-sm">{episode.rating}</span>
                </div>
              )}
            </div>

            {/* Episode Details (Expandable) */}
            {expandedEpisode === actualIdx && (
              <div className="episode-details mt-4 pt-4 border-t border-slate-700/30 space-y-3">
                {episode.description && (
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Description</p>
                    <p className="text-slate-300 text-sm leading-relaxed">{episode.description}</p>
                  </div>
                )}

                {episode.runtime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{episode.runtime} min</span>
                  </div>
                )}

                {episode.votes && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">{episode.votes.toLocaleString()} votes</span>
                  </div>
                )}
              </div>
              )}
              </div>
              );
              })}
              </div>

              {/* Episode Pagination */}
              {totalEpisodePages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6 pt-6 border-t border-slate-700/50">
              <button
              onClick={() => setCurrentEpisodePage(currentEpisodePage - 1)}
              disabled={currentEpisodePage === 1}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
              Previous
              </button>

              <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm font-medium">Page</span>
              <input
              type="number"
              min="1"
              max={totalEpisodePages}
              value={currentEpisodePage}
              onChange={(e) => {
                const page = parseInt(e.target.value) || 1;
                if (page > 0 && page <= totalEpisodePages) {
                  setCurrentEpisodePage(page);
                }
              }}
              className="w-12 px-2 py-1 bg-slate-700/50 border border-slate-600 text-white rounded text-center focus:border-amber-400 focus:outline-none"
              />
              <span className="text-slate-400 text-sm">of {totalEpisodePages}</span>
              </div>

              <button
              onClick={() => setCurrentEpisodePage(currentEpisodePage + 1)}
              disabled={currentEpisodePage >= totalEpisodePages}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:border-amber-400 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
              Next
              </button>
              </div>
              )}
              </div>
              );
              }
