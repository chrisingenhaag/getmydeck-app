<script context="module">
  export async function load({ params }) {
    const { region, version, timestamp } = params;

    return {
      props: { region, version, timestamp }
    };
  }
</script>

<script lang="ts">
  import type { Region, Version } from '$lib/DeckTypes';

  import GetMyDeckResults from '$lib/GetMyDeckResults.svelte';

  export let region: Region;
  export let version: Version;
  export let timestamp: string;

  let permalink = `https://getmydeck.ingenhaag.dev/s/${region}/${version}/${timestamp}`;
</script>

<svelte:head>
  <title>GetMyDeck - Results</title>
</svelte:head>

<div class="text-sm breadcrumbs not-prose">
  <ul>
    <li><a class="link" href="/">Start</a></li> 
    <li>Results</li>
  </ul>
</div>

<div>
  <span class="text-sm">
    Reload to refresh results <b>or</b> share your personal permalink
    <a class="link" href={permalink}>{permalink}</a> with other people
  </span>
</div>

<h3>Results:</h3>
<GetMyDeckResults {region} {version} {timestamp} />
