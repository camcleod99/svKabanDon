<script lang="ts">
  import { onMount } from 'svelte';
  // Controllers
  import { Column as ColumnInterface, columnsStore } from "../../Controllers/columns"
  // Components
  import Column from "../Content/Column.ts.svelte";
  import Task from "../Content/Task.ts.svelte";

  // System Vars
  let loading = true;
  let columns: ColumnInterface[] = [];

  // Lifecycle Hook
  onMount(() => {
    columnsStore.subscribe((value) => {
      columns = value.map((column: ColumnInterface) => column);
    });
    loading = false;
  });

  // Store Subscription
  columnsStore.subscribe((value) => {
    columns = value.map((column: any) => column);
  });

</script>

<main id="section_Board" class="m-16 mb-0 px-2 w-screen bg-red-400 overflow-scroll">
  <section id="s_b_body" class="flex flex-row gap-2">
    {#if !loading}
      {#if columns.length <= 0}
        <Task message="There are no columns in the database"/>
      {:else}
        {#each columns as column (column.id)}
          <Column id={column.id} name={column.name} description={column.description}/>
        {/each}
      {/if}
    {:else}
        <Task message="Loading Columns..."/>
    {/if}
  </section>
</main>