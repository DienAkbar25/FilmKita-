// Color Palette
export const COLORS = {
  // Primary
  primary: '#1e293b',      // slate-900
  secondary: '#334155',    // slate-700
  accent: '#f59e0b',       // amber-500
  
  // Backgrounds
  bg: {
    dark: 'from-slate-900 via-slate-800 to-slate-900',
    card: 'slate-800/30',
    cardBorder: 'slate-700/50',
    input: 'slate-700/50',
    header: 'slate-900/50',
  },
  
  // Text
  text: {
    primary: 'white',
    secondary: 'slate-300',
    muted: 'slate-400',
    muted2: 'slate-500',
  },
  
  // Status
  success: 'green-400',
  error: 'red-400',
  warning: 'amber-400',
  info: 'blue-400',
  
  // Badges
  badge: {
    amber: 'amber-500/20',
    amberText: 'amber-200',
    blue: 'blue-500/20',
    blueText: 'blue-300',
    slate: 'slate-700/60',
    slateText: 'slate-200',
  }
};

// Spacing
export const SPACING = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
};

// Border Radius
export const RADIUS = {
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  full: '9999px',
};

// Typography
export const TYPOGRAPHY = {
  h1: 'text-5xl font-bold',
  h2: 'text-3xl font-bold',
  h3: 'text-xl font-bold',
  h4: 'text-lg font-semibold',
  body: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
};

// Common Classes
export const CLASS_NAMES = {
  // Backgrounds
  gradientBg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
  cardBg: 'bg-slate-800/30 border border-slate-700/50',
  headerBg: 'border-b border-slate-700 bg-slate-900/50 backdrop-blur-md',
  inputBg: 'bg-slate-700/50 border border-slate-600',
  
  // Badges
  badgeAmber: 'px-4 py-2 bg-amber-500/20 border border-amber-400/50 text-amber-300 rounded-lg font-semibold text-sm',
  badgeBlue: 'px-4 py-1.5 bg-blue-500/20 border border-blue-400/50 text-blue-300 rounded-full font-semibold text-sm',
  badgeYellow: 'px-3 py-1.5 bg-amber-500/20 text-amber-200 rounded font-semibold text-sm',
  
  // Cards
  card: 'bg-slate-800/30 border border-slate-700/50 rounded-xl p-6',
  cardLarge: 'bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8',
  
  // Buttons
  btnPrimary: 'px-6 py-2 bg-amber-400 text-slate-900 rounded-lg font-semibold hover:bg-amber-300 transition-all',
  btnSecondary: 'flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium',
  
  // Icons
  iconAmber: 'w-6 h-6 text-amber-400',
  iconBg: 'w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0',
  
  // Text
  textMuted: 'text-slate-400 text-sm font-semibold uppercase tracking-wider',
  textLabel: 'text-slate-400 text-xs font-semibold uppercase tracking-wider',
};

// Layout
export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  padding: 'px-6',
  py: 'py-12',
  headerPy: 'py-5',
};

// Icon sizes
export const ICON_SIZES = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};
