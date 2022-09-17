<script lang="ts">
  import { onMount } from 'svelte';

  import type { Region, Version } from '$lib/DeckTypes';
  import Description from '$lib/Description.svelte';
  import { DATA_KEY } from '$lib/Constants';

  const REMEMBERME_KEY = 'urn:getmydeck:rememberme';

  let reservationTime: number;
  let selectedRegion: Region;
  let selectedVersion: Version;

  let reserationTimeValid = true;
  let selectedRegionValid = true;
  let selectedVersionValid = true;

  let reservationTimeHumanEnabled = false;
  let reserationTimeHuman: string;

  let rememberme = false;

  let modalVisible = false
  let modalDismissed = false

  let regions = [
    { id: 0, text: `empty`, value: undefined },
    { id: 1, text: `US`, value: `US` },
    { id: 2, text: `UK`, value: `UK` },
    { id: 3, text: `EU`, value: `EU` }
  ];

  let versions = [
    { id: 0, text: `empty`, value: undefined },
    { id: 1, text: `64GB`, value: `64` },
    { id: 2, text: `256GB`, value: `256` },
    { id: 3, text: `512GB`, value: `512` }
  ];

  function resetValidation() {
    selectedRegionValid = true;
    selectedVersionValid = true;
    reserationTimeValid = true;
  }

  function validateForm() {
    resetValidation();

    if (selectedRegion === undefined) {
      selectedRegionValid = false;
    }
    if (selectedVersion === undefined) {
      selectedVersionValid = false;
    }
    if (
      reservationTime === undefined ||
      reservationTime === null ||
      reservationTime.toString().length !== 10
    ) {
      reserationTimeValid = false;
    }
    return selectedRegionValid && selectedVersionValid && reserationTimeValid;
  }

  function handleSubmit() {
    if (validateForm()) {
      const resultLink = `s/${selectedRegion}/${selectedVersion}/${reservationTime}`;

      if (rememberme === true) {
        saveRememberme();
      } else {
        localStorage.clear();
      }
      saveDismissedModalInfo();
      window.location.assign(resultLink);
    }
  }

  let dismissModal = () => {
    modalDismissed = true
  }

  let showModalOneTime = () => {
    if(!modalDismissed) {
      modalVisible = !modalVisible
    }
  }

  let saveRememberme = () => {
    let valueToStore = {
      region: selectedRegion,
      version: selectedVersion,
      timestamp: reservationTime
    };
    localStorage.setItem(REMEMBERME_KEY, JSON.stringify(valueToStore));
  };

  let saveDismissedModalInfo = () => {
    let valueToStore = {
      modalDismissed: true,
    }
    sessionStorage.setItem(DATA_KEY, JSON.stringify(valueToStore))
  }

  $: {
    if (reservationTimeHumanEnabled) {
      let humanTime = Date.parse(reserationTimeHuman) / 1000
      reservationTime = humanTime
      showModalOneTime()
    } 
  }

  onMount(async () => {
    let storedString = localStorage.getItem(REMEMBERME_KEY);
    if (storedString !== null) {
      let storedValues = JSON.parse(storedString);
      reservationTime = storedValues.timestamp;
      selectedRegion = storedValues.region;
      selectedVersion = storedValues.version;
      rememberme = true;
    }
  });
</script>

<svelte:head>
  <title>GetMyDeck - Calculator</title>
</svelte:head>

<Description />

<div class="mb-3 prose">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="">
      <label for="region" class="text-gray-700"
      >In which region did you preorder your Steam Deck?</label
      >
      <select
      class="select select-bordered w-full max-w {!selectedRegionValid
        ? 'select-error'
        : ''}"
      id="region"
      name="region"
      bind:value={selectedRegion}
      on:change={() => (selectedRegionValid = true)}
      >
      {#each regions as region}
      <option label={region.text} value={region.value}>
        {region.text}
      </option>
      {/each}
    </select>
    {#if !selectedRegionValid}
    <span class="text-sm text-red-600 dark:text-red-500">Please select a region</span>
    {/if}
  </div>
  <div class="form-control w-full max-w">
    <label for="version" class="text-gray-700">Which version did you reserve?</label>
    <select
    class="select select-bordered w-full max-w {!selectedVersionValid
        ? 'select-error'
        : ''}"
      id="version"
      name="version"
      bind:value={selectedVersion}
      on:change={() => (selectedVersionValid = true)}
      >
      {#each versions as version}
      <option label={version.text} value={version.value}>
        {version.text}
      </option>
      {/each}
    </select>
    {#if !selectedVersionValid}
    <span class="text-sm text-red-600 dark:text-red-500">Please select a version</span>
    {/if}
  </div>
  
  {#if reservationTimeHumanEnabled}
  <div class="form-control w-full max-w">
    <label for="reserationTimeHuman" class="text-gray-700"
    >When did you place your reservation? This is is interpreted as your local timezone and will be converted to UTC automatically.
  </label>
  <input
  type="datetime-local"
  class="input input-bordered input-md w-full max-w  {!reserationTimeValid
          ? 'input-error'
          : ''}"
        name="reserationTimeHuman"
        id="reserationTimeHuman"
        bind:value={reserationTimeHuman}
        />
        {#if !reserationTimeValid}
        <span class="text-sm text-red-600 dark:text-red-500">Please enter a valid datetime</span
          >
          {/if}
        </div>
        {:else}
        <div class="form-control w-full max-w">
          <label for="reserationTime" class="text-gray-700">
            You need your reservation time (in seconds from 01.01.1970 example: 1627022437).
            <label for="timestamp-modal" class="link modal-button">How to get your rtReserveTime?</label>
            Or switch to a datetime picker with the toggle below.
          </label>
          
        <input
        type="number"
        class="input input-bordered input-md w-full max-w {!reserationTimeValid
          ? 'input-error'
          : ''}"
        name="reservationTime"
        id="reserationTime"
        bind:value={reservationTime}
        />
        {#if !reserationTimeValid}
        <span class="text-sm text-red-600 dark:text-red-500"
        >Please enter a valid timestamp (10 digits)</span
        >
        {/if}
      </div>
      {/if}
      
      <div class="form-control mt-2 flex flex-row">
        <label class="label cursor-pointer" for="reservationTimeHumanEnabled">
          <input bind:checked={reservationTimeHumanEnabled} id="reservationTimeHumanEnabled" type="checkbox" class="toggle toggle-secondary" />
          <span class="label-text pl-3">Select human readable date and time</span>
        </label>
      </div>
      
      <div class="form-control mt-1 flex flex-row">
        <label class="label cursor-pointer">
          <input bind:checked={rememberme} type="checkbox" name="rememberme" id="rememberme" class="checkbox checkbox-secondary" />
          <span class="label-text pl-3">Remember me</span> 
        </label>
      </div>
      
      <div class="form-control mt-1 flex flex-col">
        <button class="btn btn-primary btn-sm text-white normal-case" type="submit">Get my current preorder status</button>
      </div>

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="timestamp-modal" class="modal-toggle"/>
      <div id="timestamp-modal-container" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">How to get your rtReserveTime?</h3>
          <p class="py-2">
            If you don't have your rtReserveTime, here's how to get it:
          </p>
          <ol>
            <li>Log into the <a href="https://store.steampowered.com/">Steam website</a></li>
            <li>Go to this <a href="https://store.steampowered.com/reservation/ajaxgetuserstate?rgReservationPackageIDs=%5B595603,595604,595605%5D">API link</a>. It should be a bunch of data. If you only see {'{'}"success": 21{'}'} then you aren't logged in. Repeat Step 1.</li>
            <li>Find the text rtReserveTime and copy the number immediately thereafter. It will start with 16 and is ten digits long, like 1626460525 If the number is 0, then you've ordered yours and it's too late to find it.</li>
          </ol>
          <div class="modal-action">
            <label for="timestamp-modal" class="btn btn-sm normal-case">Got it</label>
          </div>
        </div>
      </div>

      <!-- Put this part before </body> tag -->
      <input type="checkbox" id="inacc-modal" class="modal-toggle" bind:checked={modalVisible} />
      <div id="inacc-modal-container" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">This may be not accurate</h3>
          <p class="py-2">A datetime selection is not as accurate as your real timestamp from the steam api. If you want to share your data with us on reddit please use the official steam timestamp.</p>
          <div class="modal-action">
            <label for="inacc-modal" class="btn btn-sm normal-case" on:click={dismissModal}>Got it</label>
          </div>
        </div>
      </div>

  </form>
</div>
