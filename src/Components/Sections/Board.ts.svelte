<script lang="ts">
  import { onMount } from 'svelte';
  import { readColumns, columnsStore} from "../../store/store_database"
  import Column from "../Content/Column.ts.svelte";
  import Task from "../Content/Task.ts.svelte";

  let loading = true;
  let columns : any = [];

  const loadBoard = async() => {
    try{
      const results = await readColumns();
      if ( results && JSON.stringify(results) !== JSON.stringify(columns) ){
        columns = [...results]
        // Sort the columns by their position
        // This does not have a practical use yet but now's better than later
        columns.sort((a: any, b: any) => a.position - b.position);
        columnsStore.set(columns);
        loading = false;
      } else {
        console.error('There are no columns in the database')
      }
    } catch (e) {
      console.log(`Error HEADER_ONMOUNT ln 19: ${e}`)
    }
  }

  onMount(loadBoard);

  columnsStore.subscribe(() => {
    loadBoard();
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
        <p>Loading Columns...</p>
    {/if}
  </section>
</main>