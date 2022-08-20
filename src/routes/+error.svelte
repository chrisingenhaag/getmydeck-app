
<script>
  import { dev } from '$app/env';
  import { page } from '$app/stores';
  import Title from '$lib/Title.svelte';
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="container mx-auto shadow-md p-5 mt-3 md:w-1/2 bg-white prose">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <Title/>
      <p>Oops, this page does not exist</p>
      <a class="link" href="/">Back to Home</a>

      {#if dev && $page.error?.stack}
       <pre>{$page.error.stack}</pre>
      {/if}
    </article>
  </div>
</div>
