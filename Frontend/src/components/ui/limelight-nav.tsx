import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

export type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label?: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items?: NavItem[];
  activeIndex?: number;
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
  limelightClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
};

export const LimelightNav = ({
  items = [],
  activeIndex: controlledIndex,
  defaultActiveIndex = 0,
  onTabChange,
  className,
  limelightClassName,
  iconContainerClassName,
  iconClassName,
}: LimelightNavProps) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const activeIndex = controlledIndex ?? internalIndex;
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;
    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;
      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null;

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setInternalIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav
      className={`relative flex items-center rounded-full border border-border bg-card/80 backdrop-blur-xl shadow-lg ${className || ''}`}
    >
      {items.map(({ id, icon, label, onClick }, index) => (
        <a
          key={id}
          ref={(el) => (navItemRefs.current[index] = el)}
          className={`relative z-20 flex h-full cursor-pointer items-center justify-center p-4 ${iconContainerClassName || ''}`}
          onClick={() => handleItemClick(index, onClick)}
          aria-label={label}
          title={label}
        >
          {cloneElement(icon, {
            className: `w-5 h-5 transition-all duration-200 ease-in-out ${
              activeIndex === index ? 'opacity-100 text-primary scale-110' : 'opacity-40'
            } ${icon.props.className || ''} ${iconClassName || ''}`,
          })}
        </a>
      ))}
      <div
        ref={limelightRef}
        className={`absolute z-10 h-10 w-10 rounded-full bg-primary/15 transition-all duration-300 ease-in-out ${
          isReady ? 'opacity-100' : 'opacity-0'
        } ${limelightClassName || ''}`}
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
    </nav>
  );
};
