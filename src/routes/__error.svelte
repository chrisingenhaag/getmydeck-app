<script context="module">
  export function load({ error, status }) {
    return {
      props: { error, status }
    };
  }
</script>

<script>
  import { dev } from '$app/env';
import Title from '$lib/Title.svelte';
  export let error, status;
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="container mx-auto shadow-md p-5 mt-3 md:w-1/2 bg-white prose">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <Title/>

      <p>Oops, this page does not exist</p>

      <a href="/">Back to Home</a>

      {#if dev && error.stack}
        <pre>{error.stack}</pre>
      {/if}
    </article>
  </div>
</div>
