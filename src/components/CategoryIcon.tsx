import React from 'react';
import { Ship, LifeBuoy, Anchor, Map } from 'lucide-react';

interface CategoryIconProps {
  category: string;
  className?: string;
  style?: React.CSSProperties;
}

export function getCategoryIconName(category: string): 'Ship' | 'LifeBuoy' | 'Anchor' | 'Map' {
  const normalized = category.replace(/\./g, '').toLowerCase();
  if (normalized === 'rieam') {
    return 'Ship';
  }
  if (normalized.includes('seguranca') || normalized.includes('segurança')) {
    return 'LifeBuoy';
  }
  if (normalized.includes('marinharia')) {
    return 'Anchor';
  }
  return 'Map';
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = 'w-3.5 h-3.5 shrink-0',
  style,
}) => {
  const iconName = getCategoryIconName(category);

  switch (iconName) {
    case 'Ship':
      return <Ship className={className} style={style} aria-hidden="true" />;
    case 'LifeBuoy':
      return <LifeBuoy className={className} style={style} aria-hidden="true" />;
    case 'Anchor':
      return <Anchor className={className} style={style} aria-hidden="true" />;
    case 'Map':
    default:
      return <Map className={className} style={style} aria-hidden="true" />;
  }
};
