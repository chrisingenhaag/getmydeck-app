<script context="module">
	export async function load({ params }) {
    const {region, version, timestamp} = params

		return {
			props: { region, version, timestamp }
		};
	}
</script>

<script lang="ts">
  import type { Region, Version } from '$lib/DeckTypes';
  import Footer from '$lib/Footer.svelte';

  import GetMyDeckResults from '$lib/GetMyDeckResults.svelte'

  export let region: Region
  export let version: Version
  export let timestamp: string

</script>


<svelte:head>
  <title>GetMyDeck - Results</title>
</svelte:head>

<div class="container mx-auto shadow-md p-5 mt-3 md:w-1/2 bg-white prose">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <h1 class="text-center">How long to get my Steam Deck?</h1>

      <nav aria-label="breadcrumb" class="w-max">
        <ol class="flex flex-wrap items-center w-full bg-blue-grey-50 bg-opacity-60 py-2 px-0 rounded-md">
          <li class="flex items-center text-blue-grey-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500 px-0">
            <a href="/" class="opacity-60"><span>Start</span></a>
            <span class="text-blue-grey-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none">/</span>
          </li>
          <li class="flex items-center text-blue-grey-900 antialiased font-sans text-sm font-normal leading-normal transition-colors duration-300 hover:text-light-blue-500 px-0">Results</li>
        </ol>
      </nav>

      <div>
        <span class="text-sm">Reload to refresh results <b>or</b> share the current page with other people</span>
      </div>

      <h3>Results:</h3>
      <GetMyDeckResults region={region} version={version} timestamp={timestamp} />
 
      <Footer />
    </article>
  </div>
</div>

