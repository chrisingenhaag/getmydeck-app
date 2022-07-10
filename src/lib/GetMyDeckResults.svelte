<script lang="ts">
  import DeckChart from '$lib/DeckChart.svelte';

  import type { DeckData, Region, Version } from '$lib/DeckTypes';

  export let region: Region;
  export let version: Version;
  export let timestamp: string;

  let deckdata: DeckData;

  let deckdataLastUpdatedString: string;
  let errorMessage: string;

  let fetchDeckInfos = async (re: Region, ver: Version, rt: string) => {
    errorMessage = '';
    await fetch(`/api/v2/regions/${re}/versions/${ver}/infos/${rt}`)
      .then((r) => r.json())
      .then((data) => {
        deckdata = data;

        let date = new Date(deckdata.officialInfo.lastDataUpdate);
        deckdataLastUpdatedString = date.toLocaleString();
      })
      .catch(() => {
        errorMessage = 'Problem loading infos.';
      });
  };

  $: {
    fetchDeckInfos(region, version, timestamp);
  }
</script>

{#if errorMessage}
  <p>{errorMessage}</p>
{:else if deckdata}
  {@html deckdata.personalInfo.htmlText}
  {#if deckdata.personalInfo.elapsedTimePercentage >= 100}
    <p class="text-xm">Dont forget to share your data on the latest reddit <a
      target="_blank"
      href="https://www.reddit.com/r/SteamDeck/search?q=flair_name%3A%22MEGATHREAD%22&restrict_sr=1&sort=new"
      >MegaThread</a
    > if you received your mail now!</p>
  {/if}
  <p class="text-xs">More explanations on results <a href="/explanations">here</a></p>
  <h4>Past percentages</h4>
  <DeckChart historicData={deckdata.personalInfo.historicData} />
  <p class="text-xs">
    Data last updated from deckbot sheet by <a target="_blank" href="https://www.reddit.com/u/Fammy"
      >u/Fammy</a
    >: {deckdataLastUpdatedString}
  </p>
  <p class="text-xs">
    Data does not update live and might show zero progress for your region and version until someone shares 
    this info and u/Fammy was able to save this in his google sheet. Please have some patience.
  </p>
{:else}
  <p>Fetching infos ...</p>
{/if}
