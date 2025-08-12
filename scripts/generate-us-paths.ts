// scripts/generate-us-paths.ts
// Purpose: Convert TopoJSON (us-states.json) into per-state SVG path strings normalized to viewBox 0 0 960 600.
// Deps: topojson-client@3, d3-geo@3, d3-geo-projection@4
//
// Attribution: Paths generated from an MIT-licensed US states dataset (TopoJSON) and normalized for in-app rendering.
// The generated file will include a concise MIT attribution header as requested.

import fs from 'fs';
import path from 'path';
import topojsonClient from 'topojson-client';
const { feature, FeatureCollection } = topojsonClient;
import type { Topology, Objects } from 'topojson-specification';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import type { GeoProjection } from 'd3-geo';

// Map state FIPS ID to USPS code
const FIPS_TO_USPS: Record<string, string> = {
  '01': 'AL','02': 'AK','04': 'AZ','05': 'AR','06': 'CA','08': 'CO','09': 'CT','10': 'DE','11': 'DC','12': 'FL',
  '13': 'GA','15': 'HI','16': 'ID','17': 'IL','18': 'IN','19': 'IA','20': 'KS','21': 'KY','22': 'LA','23': 'ME',
  '24': 'MD','25': 'MA','26': 'MI','27': 'MN','28': 'MS','29': 'MO','30': 'MT','31': 'NE','32': 'NV','33': 'NH',
  '34': 'NJ','35': 'NM','36': 'NY','37': 'NC','38': 'ND','39': 'OH','40': 'OK','41': 'OR','42': 'PA','44': 'RI',
  '45': 'SC','46': 'SD','47': 'TN','48': 'TX','49': 'UT','50': 'VT','51': 'VA','53': 'WA','54': 'WV','55': 'WI','56': 'WY'
};

// Project to 960x600 using Albers USA
function getProjection(): GeoProjection {
  const projection = geoAlbersUsa().translate([480, 300]).scale(1200);
  return projection;
}

function main() {
  const topoPath = path.resolve(process.cwd(), 'src/components/ExpansionTracker/us-states.json');
  const outPath = path.resolve(process.cwd(), 'src/components/ExpansionTracker/us-paths.ts');

  if (!fs.existsSync(topoPath)) {
    console.error(`Input TopoJSON not found at ${topoPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(topoPath, 'utf-8');
  const topo = JSON.parse(raw) as Topology<Objects<any>>;

  if (!topo.objects || !('states' in topo.objects)) {
    console.error('TopoJSON does not contain an "objects.states" collection');
    process.exit(1);
  }

  const statesFc = feature(topo, topo.objects.states) as FeatureCollection;

  const projection = getProjection();
  const pathGen = geoPath(projection);

  // Collect paths per USPS code
  const codeToPath: Record<string, string> = {};

  for (const f of statesFc.features) {
    const id = String((f as any).id);
    const code = FIPS_TO_USPS[id];
    if (!code) continue;

    const d = pathGen(f as any);
    if (!d) continue;

    codeToPath[code] = d;
  }

  // Sanity check for DC if present as separate object 11
  if (!codeToPath['DC']) {
    // District may be tiny or omitted in some projections; attempt to find by name
    for (const f of statesFc.features) {
      const props = (f.properties || {}) as any;
      if (props && typeof props.name === 'string' && props.name.toLowerCase().includes('district')) {
        const d = pathGen(f as any);
        if (d) codeToPath['DC'] = d;
      }
    }
  }

  // Emit TypeScript file
  const header = `/**
 * us-paths.ts
 * Auto-generated via scripts/generate-us-paths.ts
 * Attribution: Paths derived from an MIT-licensed US states dataset (TopoJSON) and normalized to viewBox 0 0 960 600.
 * Do not edit manually — re-run the generator script after updating the source dataset.
 */`;

  const lines: string[] = [];
  lines.push(header);
  lines.push("import type { StateCode } from './data';");
  lines.push('');
  lines.push('export const US_STATE_PATHS: Record<StateCode, string> = {');

  // Ensure we include all requested states (50 + DC). Missing ones will be empty strings.
  const ALL_CODES: string[] = [
    'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
    'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
    'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
    'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY','DC'
  ];

  for (const code of ALL_CODES) {
    const d = codeToPath[code] ?? '';
    // Escape backticks if any (unlikely)
    const safe = d.replace(/`/g, '\\`');
    lines.push(`  ${JSON.stringify(code as any)}: \`${safe}\`,`);
  }

  lines.push('};');
  lines.push('');

  fs.writeFileSync(outPath, lines.join('\n'), 'utf-8');
  console.log(`Wrote ${outPath} with ${Object.keys(codeToPath).length} paths.`);
}

main();