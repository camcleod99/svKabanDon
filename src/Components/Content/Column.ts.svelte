<script lang="ts">
  // Components
  import Task from './Task.ts.svelte';

  // Props
  export let name: string = "Column";
  export let description: string = "Column";

</script>

<main class="flex-1 max-w-80 min-w-80 mt-4 mx-2 rounded-lg bg-amber-200 ">
  <h1
    class="mx-2 mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
    {name}
  </h1>
  <h2
    class="mx-2 mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
    {description}
  </h2>
  <section class="flex flex-col">
    <Task/>
    <Task/>
    <Task/>
  </section>
</main>