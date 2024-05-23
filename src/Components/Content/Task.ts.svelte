<script lang="ts">
  // Props
  export let id: string = "";
  export let name: string = "";
  export let description: string = "";

  export let message: string = "";

  // import { destroy } from "../../store/store_database";
  import { deleteTask } from "../../Controllers/tasks";
</script>

<main class="mx-auto py-2">
  <section class="block max-w-64 min-w-64 p-6
      bg-white border border-gray-200 rounded-lg shadow
      hover:bg-gray-100 dark:bg-gray-800
      dark:border-gray-700 dark:hover:bg-gray-700">
    {#if message}
      <p class="text-red-500 dark:text-red-400">
        {message}
      </p>
    {:else}
    <p class="mb-2 text-2xl
      tracking-tight font-bold text-gray-900 dark:text-gray-400">
      {name}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <span on:click={() => deleteTask(id)} on:keydown={() => {}}>{id}</span>
<!--      <span on:click={() => destroy("tasks",id)}>{id}</span>-->
    </p>
    {/if}
  </section>
</main>