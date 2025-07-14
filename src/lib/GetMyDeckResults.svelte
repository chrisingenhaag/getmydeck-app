<script lang="ts">
	import type { DeckData } from '$lib/DeckTypes';
	import DeckChart from '$lib/DeckChart.svelte';

	export let deckdata: DeckData;

	let deckdataLastUpdatedString: string = new Date(
		deckdata.personalInfo.lastDataUpdate
	).toLocaleString();
	let errorMessage: string;
</script>

<div class="prose">
	{#if errorMessage}
		<p>{errorMessage}</p>
	{:else if deckdata}
		<div id="results">
			{@html deckdata.personalInfo.htmlText}
		</div>
		{#if deckdata.personalInfo.elapsedTimePercentage >= 100}
			<p class="text-xm">
				Dont forget to share your data on the latest reddit <a
					target="_blank"
					rel="noreferrer"
					class="link"
					href="https://www.reddit.com/r/SteamDeck/search?q=flair_name%3A%22MEGATHREAD%22&restrict_sr=1&sort=new"
					>MegaThread</a
				> if you received your mail now!
			</p>
		{/if}
		<p class="text-xs">
			More explanations on how this works <a class="link" href="/explanations">here</a>
		</p>
		<h4>Past percentages</h4>
		<DeckChart historicData={deckdata.personalInfo.historicData} />
		<p class="text-xs mb-4">
			Data for this queue {deckdata.personalInfo.region}
			{deckdata.personalInfo.version} last updated from deckbot sheet by
			<a target="_blank" rel="noreferrer" class="link" href="https://www.reddit.com/u/Fammy"
				>u/Fammy</a
			>: {deckdataLastUpdatedString}
		</p>
	{:else}
		<p>Fetching infos ...</p>
	{/if}
</div>
