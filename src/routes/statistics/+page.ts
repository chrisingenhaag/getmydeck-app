/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
  const res = await fetch(`/api/v2/summary`);
  const summaryData = await res.json();

  return { summaryData };
}
