<script lang="ts">
  import GetMyDeckStatistics from "$lib/GetMyDeckStatistics.svelte";
</script>

<svelte:head>
  <title>GetMyDeck - Statistics</title>
</svelte:head>

<div class="text-sm breadcrumbs not-prose">
  <ul>
    <li><a class="link" href="/">Start</a></li> 
    <li>Statistics</li>
  </ul>
</div>

<div class="prose">
  <h3>Overall statistics</h3>
  <p>
    This statistic graph shows the progress of all regions and versions according 
    to the day of batch and latest known order date.
  </p>

  <h4>Graph</h4>
</div>


<GetMyDeckStatistics />