import type { DeckData } from '$lib/DeckTypes.js';
import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ fetch, params }) => {
  const { region, version, timestamp } = params;

  const res = await fetch(`/api/v2/regions/${region}/versions/${version}/infos/${timestamp}`);
  const deckdata = await res.json() as DeckData;

  return { deckdata, timestamp, region, version };
}) satisfies PageLoad
