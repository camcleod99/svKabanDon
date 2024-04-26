<script>
  import Counter from "../Components/Content/Counter.svelte";
</script>

<main>
  <h1 class="py-8 px-4 rounded-lg border border-indigo-900 shadow-lg">Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte Tutorial</a></p>
  <div class="card">
    <Counter />
  </div>
</main>