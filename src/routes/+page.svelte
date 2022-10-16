<script lang="ts">
  import { onMount } from 'svelte';

  import type { Region, Version } from '$lib/DeckTypes';
  import { DATA_KEY } from '$lib/Constants';
  import Deprecation from '$lib/Deprecation.svelte';

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

<Deprecation />
