<script lang="ts">


  // Components
  import Task from './Task.ts.svelte';

  import Divider from '../Elements/Divider.ts.svelte';

  // Props
  export let name: string = "Column";
  export let description: string = "Column";
  export let id: string = "Column";
  export let tasks : any = [];

</script>

<main id="comp_Column" class="w-80 m-4 rounded-lg bg-amber-200">
    <header class="p-4 font-bold text-gray-900 dark:text-gray-100">
      <h1 class="text-4xl mb-4">
        {name}
      </h1>
      <h2 class="text-2xl italic">
        {description}
      </h2>
      <h2 class="text-sm">
        {id}
      </h2>
    </header>
    <Divider/>
    <section class="flex flex-col">
      {#if tasks.length !== 0}
        {#each tasks as task}
          <Task name={task.name} description={task.description} id={task.id} />
        {/each}
      {:else}
        <p>There are no tasks in this column</p>
      {/if}
    </section>
</main>