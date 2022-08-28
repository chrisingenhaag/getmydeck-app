<script lang="ts">
import Changelog from "$lib/Changelog.svelte";

  import GetMyDeckStatistics from "$lib/GetMyDeckStatistics.svelte";
</script>

<svelte:head>
  <title>GetMyDeck - Changelog</title>
</svelte:head>

<div class="text-sm breadcrumbs not-prose">
  <ul>
    <li><a class="link" href="/">Start</a></li> 
    <li>Changelog</li>
  </ul>
</div>

<div class="prose">
  <h3>Changelog</h3>
</div>

<Changelog />

