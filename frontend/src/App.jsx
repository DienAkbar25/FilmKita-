import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
<<<<<<< Updated upstream
  const [count, setCount] = useState(0)
=======
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
>>>>>>> Stashed changes

  return (
    <>
      <div className='enak'> 
        crot enak
      </div>

      <div className='ahh pelanin dikit'>
        ahh pelanin dikit 
      </div>
    </>
  )
}

export default App
