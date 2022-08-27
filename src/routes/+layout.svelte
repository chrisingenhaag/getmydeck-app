<script>
  import Footer from '$lib/Footer.svelte';
  import Title from '$lib/Title.svelte';
  import Navigation from '$lib/Navigation.svelte';

  import '../app.css';
</script>

<div class="container mx-auto shadow-md p-5 mt-3 lg:w-1/2 max-w-prose bg-white">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <Navigation />
      <Title />
      <slot />
      <Footer />
    </article>
  </div>
</div>
