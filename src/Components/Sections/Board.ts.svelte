<script lang="ts">
  import { onMount } from 'svelte';
  import { readColumns, columnsStore} from "../../store/store_database"
  import Column from "../Content/Column.ts.svelte";

  let loading = true;
  let columns : any = [];

  const loadBoard = async() => {
    try{
      const results = await readColumns();
      if ( results ){
        columns = [...results]
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
      {#if columns.length === 0}
        <p>There are no columns in the database</p>
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