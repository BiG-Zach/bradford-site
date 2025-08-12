import React from 'react';
import type { StateCode } from './data';
import { US_STATE_PATHS } from './us-paths';

export default function USMap({
  getStateAttrs,
  onActivate,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onFocus,
  onBlur,
}: {
  getStateAttrs: (code: StateCode) => { className?: string; title?: string; status?: string };
  onActivate: (code: StateCode) => void;
  onMouseEnter?: (code: StateCode, event: React.MouseEvent) => void;
  onMouseLeave?: () => void;
  onMouseMove?: (code: StateCode, event: React.MouseEvent) => void;
  onFocus?: (code: StateCode, event: React.FocusEvent) => void;
  onBlur?: () => void;
}) {
  const CODES: StateCode[] = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
  ];
  return (
    <svg viewBox="0 0 960 600" role="img" aria-label="United States availability map" className="w-full h-auto">
      <g>
        {CODES.map(code=>{
          const attrs = getStateAttrs(code);
          return (
            <path
              key={code}
              d={US_STATE_PATHS[code]}
              className={attrs.className}
              tabIndex={0}
              role="button"
              aria-label={attrs.title || `${code} state`}
              onClick={()=>onActivate(code)}
              onKeyDown={(e)=> (e.key==='Enter'||e.key===' ') && onActivate(code)}
              onMouseEnter={onMouseEnter ? (e) => onMouseEnter(code, e) : undefined}
              onMouseLeave={onMouseLeave}
              onMouseMove={onMouseMove ? (e) => onMouseMove(code, e) : undefined}
              onFocus={onFocus ? (e) => onFocus(code, e) : undefined}
              onBlur={onBlur}
            />
          );
        })}
      </g>
    </svg>
  );
}