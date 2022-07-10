<script>
  import Footer from '$lib/Footer.svelte';
  import Title from '$lib/Title.svelte';

  import '../app.css';
</script>

<div class="container mx-auto shadow-md p-5 mt-3 md:w-1/2 bg-white prose">
  <div class="grid grid-cols-1 gap-6 content-center">
    <article class="">
      <Title />
      <slot />
      <Footer />
    </article>
  </div>
</div>
