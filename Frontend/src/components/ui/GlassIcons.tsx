import React from 'react';

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
  sage: 'linear-gradient(hsl(96, 16%, 70%), hsl(98, 16%, 30%))',
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`flex flex-wrap gap-8 justify-center ${className || ''}`}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center gap-3 group">
          <div
            className={`relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${item.customClass || ''}`}
            style={getBackgroundStyle(item.color)}
          >
            <div className="absolute inset-0 rounded-2xl bg-white/20 backdrop-blur-sm" />
            <div className="relative z-10 text-white w-7 h-7 flex items-center justify-center">
              {item.icon}
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-medium tracking-wide">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default GlassIcons;
