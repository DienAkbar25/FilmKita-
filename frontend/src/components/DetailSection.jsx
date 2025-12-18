import { Calendar, Clock, Users, Flag, Volume2 } from 'lucide-react';
import { CLASS_NAMES } from '../config/theme';

const ICON_MAP = {
  calendar: Calendar,
  clock: Clock,
  users: Users,
  flag: Flag,
  volume2: Volume2,
};

export default function DetailSection({ 
  label, 
  items = [],
  icon = 'users',
  type = 'text',
  className = ''
}) {
  const Icon = ICON_MAP[icon];

  if (!items || items.length === 0) return null;

  return (
    <div className={CLASS_NAMES.card + ' ' + className}>
      <p className={CLASS_NAMES.textLabel + ' mb-4 flex items-center gap-2'}>
        {Icon && <Icon className="w-5 h-5" />}
        {label}
      </p>
      
      {type === 'text' && (
        <p className="text-slate-300 text-sm">{items.join(', ')}</p>
      )}
      
      {type === 'badges' && (
        <div className="flex flex-wrap gap-3">
          {items.map((item, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 bg-amber-500/20 text-amber-200 rounded-lg font-semibold text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
