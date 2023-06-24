import type { PageLoad } from './$types';

export const ssr = false;

export const load = (async ({ fetch, params }) => {
  const res = await fetch(`/api/v2/summary`);
  const summaryData = await res.json();

  return { summaryData };
}) satisfies PageLoad
