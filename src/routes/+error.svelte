<script>
	import { dev } from '$app/env';
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status}</title>
</svelte:head>

<div class="prose">
	<p>Oops, this page does not exist</p>
	<a class="link" href="/">Back to Home</a>

	{#if dev && page.error?.message}
		<pre>{page.error.message}</pre>
	{/if}
</div>
