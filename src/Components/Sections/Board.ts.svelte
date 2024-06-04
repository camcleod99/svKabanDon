<script lang="ts">
  import { onMount } from 'svelte';
  // Controllers
  import { Column as ColumnInterface, columnsStore } from "../../Controllers/columns"
  // Components
  import Column from "../Elements/Column.ts.svelte";
  import Task from "../Elements/Task.ts.svelte";

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
    columns = value.map((column: ColumnInterface) => column);
  });



</script>

<main id="section_Board" class="w-auto bg-amber-400">
  <section id="s_b_body" class="flex flex-row justify-between p-2 overflow-scroll">
    {#if !loading}
      {#if columns.length <= 0}
        <Task message="There are no columns in the database"/>
      {:else}
        {#each columns as column (column.id)}
          <section id="s_b_columns" class="flex flex-col gap-2 h-auto">
            <Column id={column.id} name={column.name} description={column.description} limit="{column.limit}"/>
          </section>
        {/each}
      {/if}
    {:else}
        <Task message="Loading Columns..."/>
    {/if}
  </section>
</main>