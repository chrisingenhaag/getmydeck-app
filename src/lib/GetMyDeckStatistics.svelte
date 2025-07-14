<script lang="ts">
	import type { SummaryResponse } from './DeckSummaryTypes';
	import StatisticsChart from './StatisticsChart.svelte';

	export let data: SummaryResponse;
</script>

<div class="prose">
	<StatisticsChart summaryData={data} />
</div>
