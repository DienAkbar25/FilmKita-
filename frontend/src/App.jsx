import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import GenreSearch from './pages/GenreSearch';
import YearSearch from './pages/YearSearch';
import Login from './pages/Login';
import MarketingDashboard from './pages/MarketingDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { filmAPI } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allGenres, setAllGenres] = useState(['All Genres']);
  const [allYears, setAllYears] = useState(['All Years']);
  const navigate = useNavigate();

  // Fetch films from backend
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await filmAPI.getAllFilms();
        console.log('API Response:', response);
        if (response.data) {
          const filmsData = response.data;
          console.log('Films loaded:', filmsData.length);
          setMovies(filmsData);

          // Extract unique genres and years
          const genresSet = new Set(['All Genres']);
          const yearsSet = new Set(['All Years']);
          
          filmsData.forEach(film => {
            if (film.genres && Array.isArray(film.genres)) {
              film.genres.forEach(genre => genresSet.add(genre));
            }
            if (film.year) {
              yearsSet.add(String(film.year));
            }
          });

          setAllGenres(Array.from(genresSet).sort());
          setAllYears(Array.from(yearsSet).sort((a, b) => {
            if (a === 'All Years') return -1;
            if (b === 'All Years') return 1;
            return parseInt(b) - parseInt(a);
          }));
        }
      } catch (error) {
        console.error('Failed to fetch films:', error);
        // Set empty state if API fails
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  // Filter movies
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.synopsis?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All Genres' || (movie.genres && movie.genres.includes(selectedGenre));
    const matchesYear = selectedYear === 'All Years' || String(movie.year) === selectedYear;
    
    return matchesSearch && matchesGenre && matchesYear;
  });

  return (
    <Routes>
      <Route path="/" element={<HomePage 
        movies={movies} 
        navigate={navigate} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedGenre={selectedGenre} 
        setSelectedGenre={setSelectedGenre} 
        selectedYear={selectedYear} 
        setSelectedYear={setSelectedYear} 
        isGenreOpen={isGenreOpen} 
        setIsGenreOpen={setIsGenreOpen} 
        isYearOpen={isYearOpen} 
        setIsYearOpen={setIsYearOpen} 
        filteredMovies={filteredMovies} 
        allGenres={allGenres} 
        allYears={allYears}
        loading={loading}
      />} />
      <Route path="/movie/:id" element={<MovieDetail movies={movies} />} />
      <Route path="/genre/:genre" element={<GenreSearch movies={movies} />} />
      <Route path="/year/:year" element={<YearSearch movies={movies} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/marketing" element={<ProtectedRoute requiredRole="marketing"><MarketingDashboard movies={movies} /></ProtectedRoute>} />
      <Route path="/dashboard/executive" element={<ProtectedRoute requiredRole="executive"><ExecutiveDashboard movies={movies} /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
