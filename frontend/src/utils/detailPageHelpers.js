/**
 * Utility functions for Detail Page
 */

/**
 * Format number with locale separator
 */
export const formatNumber = (num) => {
  if (!num) return '0';
  return num.toLocaleString();
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, length = 150) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Extract data from item object (handles different API formats)
 */
export const extractItemData = (item) => {
  if (!item) return null;

  return {
    title: item.title || item.Title || 'Unknown',
    rating: parseFloat(item.rating || item.Rating || 0),
    year: item.startYear || item.Year || 'N/A',
    runtime: item.runtime || null,
    votes: item.votes ? parseInt(item.votes) : null,
    genres: Array.isArray(item.genres) 
      ? item.genres 
      : (item.Genres ? item.Genres.split(',').map(g => g.trim()) : []),
    languages: item.languages ? item.languages.split(',').map(l => l.trim()) : [],
    countries: item.countries ? item.countries.split(',').slice(0, 10).map(c => c.trim()) : [],
    description: item.description || item.Description || '',
    id: item.combineID || item.CombineID || '',
  };
};

/**
 * Get icon style classes
 */
export const getIconClasses = (size = 'md', color = 'amber') => {
  const sizes = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colors = {
    amber: 'text-amber-400',
    slate: 'text-slate-400',
    blue: 'text-blue-400',
    white: 'text-white',
  };

  return `${sizes[size] || sizes.md} ${colors[color] || colors.amber}`;
};

/**
 * Get icon background classes
 */
export const getIconBgClasses = (color = 'amber') => {
  const colors = {
    amber: 'bg-amber-500/20',
    slate: 'bg-slate-700/50',
    blue: 'bg-blue-500/20',
  };

  return `w-12 h-12 ${colors[color] || colors.amber} rounded-lg flex items-center justify-center flex-shrink-0`;
};

/**
 * Check if data exists and is valid
 */
export const hasData = (data) => {
  if (Array.isArray(data)) return data.length > 0;
  if (typeof data === 'string') return data.trim().length > 0;
  if (typeof data === 'number') return data > 0;
  return !!data;
};

/**
 * Parse contributors string (handles multiple format variations)
 */
export const parseContributors = (contributorsString) => {
  if (!contributorsString) return getEmptyContributors();

  const contributors = getEmptyContributors();

  // Split by comma followed by capital letter (new person)
  const people = contributorsString.split(/,\s+(?=[A-Z])/);

  people.forEach(person => {
    const roleMatch = person.match(/\((.*?)\)/);
    if (!roleMatch) return;

    const role = roleMatch[1].toLowerCase();
    const name = person.split('(')[0].trim();

    if (role.includes('actor') && !role.includes('actress')) {
      contributors.actors.push(name);
    } else if (role.includes('actress')) {
      contributors.actresses.push(name);
    } else if (role.includes('director')) {
      contributors.directors.push(name);
    } else if (role.includes('writer')) {
      contributors.writers.push(name);
    } else if (role.includes('composer')) {
      contributors.composers.push(name);
    } else if (role.includes('cinematographer')) {
      contributors.cinematographers.push(name);
    } else if (role.includes('editor')) {
      contributors.editors.push(name);
    } else if (role.includes('producer')) {
      contributors.producers.push(name);
    } else {
      contributors.others.push(`${name} (${role})`);
    }
  });

  return contributors;
};

/**
 * Get empty contributors object
 */
const getEmptyContributors = () => ({
  actors: [],
  actresses: [],
  directors: [],
  writers: [],
  composers: [],
  cinematographers: [],
  editors: [],
  producers: [],
  others: []
});

/**
 * Get cast (actors + actresses combined)
 */
export const getCast = (contributors) => {
  return [...(contributors.actors || []), ...(contributors.actresses || [])];
};

/**
 * Get filtered contributors by role
 */
export const getContributorsByRole = (contributors, role, limit = null) => {
  const data = contributors[role] || [];
  return limit ? data.slice(0, limit) : data;
};
