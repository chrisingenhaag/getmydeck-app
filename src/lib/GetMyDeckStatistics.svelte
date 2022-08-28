<script lang="ts">
  import type { SummaryResponse } from "./DeckSummaryTypes";
  import StatisticsChart from "./StatisticsChart.svelte";

  let errorMessage: string;

  let data: SummaryResponse;

  let fetchDeckSummary = async () => {
    errorMessage = '';
    await fetch(`/api/v2/summary`)
      .then((r) => r.json())
      .then((d) => {
        data = d;
      })
      .catch(() => {
        errorMessage = 'Problem loading infos. Maybe the data entered is invalid or the api is not available at the moment. Please try again later.';
      });
  };

  $: {
    fetchDeckSummary();
  }
</script>

<div class="prose">
  {#if errorMessage}
    <p>{errorMessage}</p>
  {:else if data}
    <StatisticsChart summaryData={data} />
  {:else}
    <p>Fetching infos ...</p>
  {/if}
</div>
