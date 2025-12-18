import { Calendar, Clock, Users, Flag, Volume2 } from 'lucide-react';
import { CLASS_NAMES } from '../config/theme';

const ICON_MAP = {
  calendar: Calendar,
  clock: Clock,
  users: Users,
  flag: Flag,
  volume2: Volume2,
};

const VARIANT_CONFIG = {
  amber: {
    bg: 'bg-amber-500/20',
    icon: 'text-amber-400',
  },
  slate: {
    bg: 'bg-slate-700/50',
    icon: 'text-slate-400',
  },
  blue: {
    bg: 'bg-blue-500/20',
    icon: 'text-blue-400',
  },
};

export default function DetailCard({ 
  label, 
  value, 
  icon = 'users',
  variant = 'amber',
  type = 'text'
}) {
  const Icon = ICON_MAP[icon];
  const variantStyle = VARIANT_CONFIG[variant];

  return (
    <div className={CLASS_NAMES.card + ' flex items-start gap-4'}>
      <div className={`w-12 h-12 ${variantStyle.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
        {Icon && <Icon className={`w-6 h-6 ${variantStyle.icon}`} />}
      </div>
      
      <div className="flex-1">
        <p className={CLASS_NAMES.textLabel + ' mb-2'}>{label}</p>
        
        {type === 'text' && (
          <p className="text-white font-bold text-lg">{value}</p>
        )}
        
        {type === 'badges' && Array.isArray(value) && (
          <div className="flex flex-wrap gap-2">
            {value.map((item, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-amber-500/20 text-amber-200 rounded font-semibold text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
