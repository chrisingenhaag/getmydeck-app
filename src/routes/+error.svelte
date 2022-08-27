
<script>
  import { dev } from '$app/env';
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}</title>
</svelte:head>

<div class="prose">

  <p>Oops, this page does not exist</p>
  <a class="link" href="/">Back to Home</a>
  
  {#if dev && $page.error?.stack}
  <pre>{$page.error.stack}</pre>
  {/if}
</div>
