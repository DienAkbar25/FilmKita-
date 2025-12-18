import { Calendar, Clock, Users, Flag, Volume2, Star } from 'lucide-react';

export const DETAIL_CARDS = [
  {
    id: 'year',
    label: 'TAHUN RILIS',
    icon: Calendar,
    dataKey: 'year',
    type: 'text',
    className: 'bg-amber-500/20',
    textClassName: 'text-amber-400',
  },
  {
    id: 'director',
    label: 'DIRECTOR',
    icon: Users,
    dataKey: 'directors',
    type: 'badge',
    className: 'bg-amber-500/20',
    textClassName: 'text-amber-200',
    limit: 2,
  },
  {
    id: 'runtime',
    label: 'RUNTIME',
    icon: Clock,
    dataKey: 'runtime',
    type: 'text',
    suffix: ' menit',
    className: 'bg-slate-700/50',
    textClassName: 'text-slate-400',
  },
  {
    id: 'votes',
    label: 'TOTAL VOTES',
    icon: Users,
    dataKey: 'votes',
    type: 'number',
    className: 'bg-amber-500/20',
    textClassName: 'text-amber-400',
  },
];

export const DETAIL_INFO_SECTIONS = [
  {
    id: 'cast',
    label: 'AKTOR',
    icon: Users,
    dataKey: 'cast',
    type: 'badges',
    span: 'full',
    limit: 6,
  },
  {
    id: 'languages',
    label: 'LANGUAGES',
    icon: Volume2,
    dataKey: 'languages',
    type: 'text',
  },
  {
    id: 'countries',
    label: 'COUNTRIES',
    icon: Flag,
    dataKey: 'countries',
    type: 'text',
  },
];

export const DETAIL_PAGE_STRUCTURE = {
  hero: {
    maxWidth: 'max-w-7xl',
    gutter: 'px-6',
    spacing: 'py-12',
    posterSize: 'w-48 h-64',
  },
  cards: {
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    gridFull: 'grid grid-cols-1 md:grid-cols-2 gap-6',
  },
};

export const DETAIL_PAGE_TEXT = {
  header: {
    back: 'Kembali',
    logo: 'FilmKu',
    dashboard: 'Dashboard',
  },
  rating: '/10',
  noDescription: 'No description available',
  noData: 'Data tidak tersedia',
};

export const RATING_CONFIG = {
  icon: Star,
  maxRating: 10,
  format: (rating) => rating.toFixed(1),
  className: 'bg-amber-500/20 border border-amber-400/50 rounded-lg px-6 py-3 flex items-center gap-2',
  iconClassName: 'w-6 h-6 text-amber-400 fill-amber-400',
  textClassName: 'text-amber-400 font-bold text-lg',
};

export const GENRE_CONFIG = {
  limit: 3,
  className: 'px-4 py-1.5 bg-blue-500/20 border border-blue-400/50 text-blue-300 text-sm font-semibold rounded-full',
};
