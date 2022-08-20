export async function load({ params }) {
  const { region, version, timestamp } = params;

  return { region, version, timestamp };
}
