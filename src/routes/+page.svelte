<script lang="ts">
  import { onMount } from 'svelte';

  import type { Region, Version } from '$lib/DeckTypes';
  import Description from '$lib/Description.svelte';
  import Changelog from '$lib/Changelog.svelte';

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

      window.location.assign(resultLink);
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

  $: {
    if (reservationTimeHumanEnabled) {
      let humanTime = Date.parse(reserationTimeHuman) / 1000;
      reservationTime = humanTime;
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
          <label for="reserationTime" class="text-gray-700"
          >What is your reservation time (in seconds from 01.01.1970 example: 1627022437)? Get it like
          described in the <a
          target="_blank" class="link" 
          href="https://www.reddit.com/r/SteamDeck/comments/ui642q/introducing_deckbot/"
          >reddit DeckBot description</a
          >
          or switch to a datetime picker with the toggle below.
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
  </form>
</div>
  
<Changelog />
