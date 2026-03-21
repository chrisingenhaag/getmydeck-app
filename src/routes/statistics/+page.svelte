<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	import GetMyDeckStatistics from '$lib/GetMyDeckStatistics.svelte';
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
	<h2>All queue statistics</h2>
	<p>
		This graph shows the progress of all regions and versions according to the day of batch and
		latest known order date.
	</p>
</div>

<GetMyDeckStatistics data={data.summaryData} />
