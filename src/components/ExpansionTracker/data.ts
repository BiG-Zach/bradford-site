export type StateCode =
  | 'AL'|'AK'|'AZ'|'AR'|'CA'|'CO'|'CT'|'DE'|'FL'|'GA'
  | 'HI'|'ID'|'IL'|'IN'|'IA'|'KS'|'KY'|'LA'|'ME'|'MD'
  | 'MA'|'MI'|'MN'|'MS'|'MO'|'MT'|'NE'|'NV'|'NH'|'NJ'
  | 'NM'|'NY'|'NC'|'ND'|'OH'|'OK'|'OR'|'PA'|'RI'|'SC'
  | 'SD'|'TN'|'TX'|'UT'|'VT'|'VA'|'WA'|'WV'|'WI'|'WY'|'DC';

export type Status = 'available'|'comingSoon'|'notAvailable';
export const AVAILABLE_NOW: StateCode[] = ['FL','MI','NC'];
export const COMING_SOON: StateCode[] = [
  'WA','OR','NV','UT','AZ','NE','KS','OK','TX','AR','IA','LA','MS',
  'IL','WI','IN','KY','TN','AL','GA','SC','PA'
];
const ALL: StateCode[] = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
];
export const STATE_STATUS: Record<StateCode, Status> = ALL.reduce((a,c)=>{a[c]='notAvailable';return a;}, {} as Record<StateCode,Status>);
for (const s of AVAILABLE_NOW) STATE_STATUS[s]='available';
for (const s of COMING_SOON) STATE_STATUS[s]='comingSoon';

export function statusLabel(code: StateCode) {
  const s = STATE_STATUS[code];
  return s==='available' ? 'Available now' : s==='comingSoon' ? 'Coming soon' : 'Not available';
}

// Status classes for styling states based on their availability
export function statusClasses(status: Status): string {
  switch (status) {
    case 'available':
      return 'fill-emerald-500 hover:fill-emerald-600 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]';
    case 'comingSoon':
      return 'fill-sky-500 hover:fill-sky-600 shadow-[0_0_0_2px_rgba(14,165,233,0.25)] animate-pulse';
    case 'notAvailable':
    default:
      return 'fill-slate-300 hover:fill-slate-400 shadow-[0_0_0_2px_rgba(203,213,225,0.6)]';
  }
}

// Legend data for map display
export function legend() {
  return [
    {
      key: 'available',
      label: 'Available now',
      dotClass: 'bg-emerald-500 shadow-[0_0_0_2px_rgba(16,185,129,0.25)]'
    },
    {
      key: 'comingSoon',
      label: 'Coming soon',
      dotClass: 'bg-sky-500 shadow-[0_0_0_2px_rgba(14,165,233,0.25)] animate-pulse'
    },
    {
      key: 'notAvailable',
      label: 'Not available',
      dotClass: 'bg-slate-300 shadow-[0_0_0_2px_rgba(203,213,225,0.6)]'
    }
  ];
}