<script context="module">
  export const hydrate = false;
</script>

<script lang="ts">
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>GetMyDeck - Calculator</title>
</svelte:head>

<div class="container mx-auto shadow-md p-5 mt-3 md:w-1/2 bg-white prose">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <h1 class="text-center">How long to get my Steam Deck?</h1>

      <nav aria-label="breadcrumb" class="w-max">
        <ol
          class="flex flex-wrap items-center w-full bg-blue-grey-50 bg-opacity-60 py-2 px-0 rounded-md"
        >
          <li
            class="flex items-center text-blue-grey-900 antialiased font-sans text-sm font-normal leading-normal cursor-pointer transition-colors duration-300 hover:text-light-blue-500 px-0"
          >
            <a href="/" class="opacity-60"><span>Start</span></a>
            <span
              class="text-blue-grey-500 text-sm antialiased font-sans font-normal leading-normal mx-2 pointer-events-none select-none"
              >/</span
            >
          </li>
          <li
            class="flex items-center text-blue-grey-900 antialiased font-sans text-sm font-normal leading-normal transition-colors duration-300 hover:text-light-blue-500 px-0"
          >
            Explanations
          </li>
        </ol>
      </nav>

      <h3>Explanations</h3>
      <ul>
        <li>GetMyDeck does not predict a date when you might get your order mail from valve.</li>
        <li>GetMyDeck has no information about exact shipment amounts.</li>
        <li>
          GetMyDeck is based on data you or other reddit users share in <a href="https://www.reddit.com/r/SteamDeck" target="_blank">r/SteamDeck</a> after they
          receive their order mail from valve. <a href="https://www.reddit.com/u/fammy" target="_blank">u/Fammy</a> collects this data and shares it in a google
          sheet. This google sheet is scraped by GetMyDeck every minute.
        </li>
        <li>
          The collected data only contains the reservation timestamp for each version and each
          region.
        </li>
      </ul>
      <p>So basically GetMyDeck only knows 3 important things:</p>
      <ol>
        <li>
          The time reservations started. This is fixed 1626454800 or Friday, 16. July 2021 17:00:00
          GMT
        </li>
        <li>
          Your data: version (64, 256 or 512 GB), region (US, UK or EU) and your personal
          reservation timestamp
        </li>
        <li>The latest timestamp of someone with same region and version</li>
      </ol>
      <p>
        Then GetMydeck calculates the amount of time between reservation start and your pesonal
        reservation as well as the amount of time between reservation start and the reservation time
        of the last known user who got his mail already for the selected region and version.
      </p>
      <h4>Example</h4>
      <p>Forget about dates and time for a second</p>
      <ul>
        <li>Imaging the Steam Deck reservation start was on second 0</li>
        <li>You placed your reservation after 10 seconds</li>
        <li>Now after the release in march, valve processes orders in a strict ordered quere</li>
        <li>
          A user shares in r/SteamDeck that he got his mail from valve. He shares that he placed his
          reservation 4 seconds after reservation start
        </li>
      </ul>
      <p>
        GetMyDeck now presents you that you are 40 % of the way there because 40% of the seconds up
        to your reservation timestamp have passed.
      </p>

      <Footer />
    </article>
  </div>
</div>
