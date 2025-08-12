import React from 'react';
import type { StateCode } from './data';

/**
 * USMap.paths.tsx
 * Clean, typed state SVG components and registry.
 * Placeholder geometries are used; replace paths with accurate shapes as needed.
 */

export type StatePathProps = {
  code: StateCode;
  className?: string;
  onEnter?: (code: StateCode) => void;
  onLeave?: (code: StateCode) => void;
  onActivate?: (code: StateCode) => void;
  title: string;
};

function useHandlers(props: StatePathProps) {
  const { code, onEnter, onLeave, onActivate } = props;

  const handleMouseEnter: React.MouseEventHandler<SVGGElement> = () => onEnter?.(code);
  const handleMouseLeave: React.MouseEventHandler<SVGGElement> = () => onLeave?.(code);
  const handleFocus: React.FocusEventHandler<SVGGElement> = () => onEnter?.(code);
  const handleBlur: React.FocusEventHandler<SVGGElement> = () => onLeave?.(code);
  const handleKeyDown: React.KeyboardEventHandler<SVGGElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
  };
  const handleKeyUp: React.KeyboardEventHandler<SVGGElement> = (e) => {
    if (e.key === 'Enter' || e.key === ' ') onActivate?.(code);
  };
  const handleClick: React.MouseEventHandler<SVGGElement> = () => onActivate?.(code);

  return { handleMouseEnter, handleMouseLeave, handleFocus, handleBlur, handleKeyDown, handleKeyUp, handleClick };
}

// Larger invisible hit-area for tiny states; use alongside visible mark/path
export function HitArea({
  x,
  y,
  w = 28,
  h = 20,
  label,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      className="fill-transparent"
      aria-label={label}
      role="img"
    />
  );
}

/**
 * Placeholder state shapes (simple rects/circles). Replace with precise path data as desired.
 */

// Florida — placeholder long rectangle
export function StateFL(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-FL"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 740,390 h 120 v 36 h -120 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={736} y={386} w={128} h={44} label="Florida hit area" />
    </g>
  );
}

// Michigan — placeholder two blocks (upper/lower peninsulas)
export function StateMI(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-MI"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 520,120 h 72 v 44 h -72 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <path d="M 600,140 h 36 v 24 h -36 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={516} y={116} w={128} h={56} label="Michigan hit area" />
    </g>
  );
}

// North Carolina — placeholder long rectangle
export function StateNC(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-NC"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 680,300 h 180 v 36 h -180 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={676} y={296} w={188} h={44} label="North Carolina hit area" />
    </g>
  );
}

// Pennsylvania — placeholder
export function StatePA(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-PA"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 660,200 h 120 v 40 h -120 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={656} y={196} w={128} h={48} label="Pennsylvania hit area" />
    </g>
  );
}

// Texas — placeholder
export function StateTX(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-TX"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 420,360 h 120 v 56 h -120 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={416} y={356} w={128} h={64} label="Texas hit area" />
    </g>
  );
}

// California — placeholder
export function StateCA(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-CA"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 120,240 h 72 v 88 h -72 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={116} y={236} w={80} h={96} label="California hit area" />
    </g>
  );
}

// New York — placeholder
export function StateNY(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-NY"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <path d="M 700,140 h 90 v 36 h -90 Z" className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={696} y={136} w={98} h={44} label="New York hit area" />
    </g>
  );
}

// District of Columbia — tiny marker + generous hit area
export function StateDC(props: StatePathProps) {
  const { code, className, title } = props;
  const H = useHandlers(props);
  return (
    <g
      id="state-DC"
      data-state={code}
      role="button"
      tabIndex={0}
      aria-label={title}
      className="outline-none focus-visible:ring-2 ring-offset-2 ring-sky-400"
      onMouseEnter={H.handleMouseEnter}
      onMouseLeave={H.handleMouseLeave}
      onFocus={H.handleFocus}
      onBlur={H.handleBlur}
      onKeyDown={H.handleKeyDown}
      onKeyUp={H.handleKeyUp}
      onClick={H.handleClick}
    >
      <circle cx={750} cy={210} r={3} className={`stroke-[1.25] ${className ?? ''}`} />
      <HitArea x={740} y={200} w={24} h={24} label="District of Columbia hit area" />
    </g>
  );
}

/**
 * Registry of state components used by the map.
 */
export const STATE_COMPONENTS: Partial<Record<StateCode, (p: StatePathProps) => React.ReactElement>> = {
  FL: StateFL,
  MI: StateMI,
  NC: StateNC,
  PA: StatePA,
  TX: StateTX,
  CA: StateCA,
  NY: StateNY,
  DC: StateDC,
};