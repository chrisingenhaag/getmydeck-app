<script lang="ts">
  export let data;
  
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
  <h3>All queue statistics</h3>
  <p>
    This graph shows the progress of all regions and versions according 
    to the day of batch and latest known order date.
  </p>

  <h4>Graph</h4>
</div>


<GetMyDeckStatistics data={data.summaryData}/>