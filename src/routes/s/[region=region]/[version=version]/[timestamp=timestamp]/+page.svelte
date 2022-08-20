<script lang="ts">  
  import type { DeckResultsPageData } from '$lib/DeckTypes';
  
  export let data: DeckResultsPageData;

  import GetMyDeckResults from '$lib/GetMyDeckResults.svelte';

  let region = data.region;
  let version = data.version;
  let timestamp = data.timestamp;

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
