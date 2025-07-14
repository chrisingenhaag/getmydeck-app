import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const res = await fetch(`/static-summary.json`);
	const summaryData = await res.json();

	return { summaryData };
}) satisfies PageLoad;
