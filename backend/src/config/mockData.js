// Mock data untuk testing tanpa database
const mockFilms = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    synopsis: 'Dua pria yang dipenjara menjalin ikatan selama bertahun-tahun, menemukan kedamaian dan penebusan akhir melalui tindakan kebaikan biasa.',
    genres: ['Drama', 'Crime'],
    year: 1994,
    rating: 9.3,
    poster: '🏢',
    director: 'Frank Darabont',
    writer: 'Stephen King, Frank Darabont',
    runtime: '142 minutes',
    totalVotes: 2540980,
    actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler']
  },
  {
    id: 2,
    title: 'The Godfather',
    synopsis: 'Kisah keluarga mafia dan transformasi seorang pria yang enggan dari putra keluarga menjadi bos mafia yang kejam.',
    genres: ['Crime', 'Drama'],
    year: 1972,
    rating: 9.2,
    poster: '👑',
    director: 'Francis Ford Coppola',
    writer: 'Mario Puzo, Francis Ford Coppola',
    runtime: '175 minutes',
    totalVotes: 1817453,
    actors: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall']
  },
  {
    id: 3,
    title: 'The Dark Knight',
    synopsis: 'Batman menghadapi musuh paling berbahaya, Joker, yang menciptakan kekacauan dan anarki di Gotham City.',
    genres: ['Action', 'Crime', 'Drama'],
    year: 2008,
    rating: 9.0,
    poster: '🦇',
    director: 'Christopher Nolan',
    writer: 'Jonathan Nolan, Christopher Nolan',
    runtime: '152 minutes',
    totalVotes: 2664341,
    actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Maggie Gyllenhaal']
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    synopsis: 'Kisah-kisah kriminal yang saling terkait di Los Angeles, diceritakan dengan gaya non-linear yang unik.',
    genres: ['Crime', 'Drama'],
    year: 1994,
    rating: 8.9,
    poster: '🎬',
    director: 'Quentin Tarantino',
    writer: 'Quentin Tarantino',
    runtime: '154 minutes',
    totalVotes: 1896143,
    actors: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman', 'Harvey Keitel']
  },
  {
    id: 5,
    title: 'Forrest Gump',
    synopsis: 'Kehidupan luar biasa seorang pria dengan IQ rendah yang tanpa disadari mempengaruhi beberapa peristiwa bersejarah.',
    genres: ['Drama', 'Romance'],
    year: 1994,
    rating: 8.8,
    poster: '🏃',
    director: 'Robert Zemeckis',
    writer: 'Eric Roth',
    runtime: '142 minutes',
    totalVotes: 1874235,
    actors: ['Tom Hanks', 'Sally Field', 'Gary Sinise', 'Robin Wright']
  },
  {
    id: 6,
    title: 'Inception',
    synopsis: 'Pencuri profesional yang mencuri rahasia melalui mimpi diberi tugas untuk menanamkan ide ke dalam pikiran seseorang.',
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    year: 2010,
    rating: 8.8,
    poster: '💭',
    director: 'Christopher Nolan',
    writer: 'Christopher Nolan',
    runtime: '148 minutes',
    totalVotes: 2362578,
    actors: ['Leonardo DiCaprio', 'Marion Cotillard', 'Joseph Gordon-Levitt', 'Ellen Page']
  },
  {
    id: 7,
    title: 'The Matrix',
    synopsis: 'Seorang hacker menemukan kebenaran tentang realitas dan perannya dalam perang melawan para pengontrolnya.',
    genres: ['Action', 'Sci-Fi'],
    year: 1999,
    rating: 8.7,
    poster: '📱',
    director: 'Lana Wachowski, Lilly Wachowski',
    writer: 'Lana Wachowski, Lilly Wachowski',
    runtime: '136 minutes',
    totalVotes: 1620567,
    actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving']
  },
  {
    id: 8,
    title: 'Interstellar',
    synopsis: 'Tim penjelajah melakukan perjalanan melewati lubang cacing di luar angkasa untuk memastikan kelangsungan hidup umat manusia.',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    year: 2014,
    rating: 8.6,
    poster: '🚀',
    director: 'Christopher Nolan',
    writer: 'Jonathan Nolan, Christopher Nolan',
    runtime: '169 minutes',
    totalVotes: 1528943,
    actors: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine']
  }
];

const mockUsers = {
  'marketing@filmarchive.com': {
    id: 1,
    email: 'marketing@filmarchive.com',
    name: 'Marketing User',
    role: 'marketing'
  },
  'executive@filmarchive.com': {
    id: 2,
    email: 'executive@filmarchive.com',
    name: 'Executive User',
    role: 'executive'
  }
};

module.exports = {
  mockFilms,
  mockUsers
};
