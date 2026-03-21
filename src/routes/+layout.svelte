<script>
	import Footer from '$lib/Footer.svelte';
	import Title from '$lib/Title.svelte';
	import Navigation from '$lib/Navigation.svelte';

	import '../app.css';
</script>

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:rounded focus:shadow"
>Skip to main content</a>

<div class="container mx-auto shadow-md p-5 mt-3 lg:w-1/2 max-w-prose bg-white">
	<div class="grid grid-cols-1 gap-6 content-center">
		<header>
			<Navigation />
			<Title />
		</header>
		<main id="main-content">
			<slot />
		</main>
		<footer>
			<Footer />
		</footer>
	</div>
</div>
