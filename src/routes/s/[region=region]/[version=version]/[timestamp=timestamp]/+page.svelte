<script lang="ts">
  import { onMount } from 'svelte';
  import { DATA_KEY } from '$lib/Constants';
  
  import GetMyDeckResults from '$lib/GetMyDeckResults.svelte';
  import type { DeckResultsPageData } from '$lib/DeckTypes';
  
  export let data: DeckResultsPageData;


  let region = data.region;
  let version = data.version;
  let timestamp = data.timestamp;

  let permalink = `https://getmydeck.ingenhaag.dev/s/${region}/${version}/${timestamp}`;

  let isTimestampInaccurate = () => {
    return new Date(+timestamp * 1000).getSeconds() == 0;
  }
  
  let alreadyDismissed: boolean = false
  let modalDismissed: boolean = false
  let modalVisible: boolean = false

  let dismissModal = () => {
    modalDismissed = true
    let valueToStore = {
      modalDismissed: true,
    }
    sessionStorage.setItem(DATA_KEY, JSON.stringify(valueToStore))
  }


  $: {
    modalVisible = !alreadyDismissed && !modalDismissed && isTimestampInaccurate()
    console.log(modalVisible + " = " + !alreadyDismissed +" && "+ !modalDismissed +" && "+ isTimestampInaccurate())
  }

  onMount(() => {
    let stringData = sessionStorage.getItem(DATA_KEY)
    if (stringData) {
      let data = JSON.parse(stringData)
      alreadyDismissed = data.modalDismissed
    }
  });

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

<div class="prose">
  <span class="text-sm">
    Reload to refresh results <b>or</b> share your personal permalink
    <a class="link" href={permalink}>{permalink}</a> with other people
  </span>
  
  <h3>Results:</h3>
</div>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="inacc-modal-2" class="modal-toggle" bind:checked={modalVisible} />
<div id="inacc-modal-2-container" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg">This permalink may be not accurate</h3>
    <p class="py-2">This link may not be accurate as it seems to be created with the datetime selector (because seconds are 0) instead of the exact timestamp from the steam api. Please make sure you use the exact timestamp if you want to share your data with us on reddit.</p>
    <p class="py-2">If you`re sure about this timestamp {timestamp} to be correct, ignore this.</p>
    <div class="modal-action">
      <label for="inacc-modal-2" class="btn btn-sm normal-case" on:click={dismissModal}>Got it</label>
    </div>
  </div>
</div>

<GetMyDeckResults {region} {version} {timestamp} />
