<script lang="ts">
  import { onMount } from 'svelte';
  import {readColumns} from "../../store/store_database"
  import Column from "../Content/Column.ts.svelte";
  import {columnsStore} from "../../store/store_database";
  import { readTasksOnColumn } from "../../store/store_database";


  let loading = true;
  let columns : any = [];
  let emptyColumns : any = [];

  onMount(async() => {
    try{
      const results = await readColumns();
      if ( results ){
        // Populate Columns with Tasks
        for (let column of results){
          const columnTasks : any = await readTasksOnColumn(column.id);
          if (columnTasks.length != 0){
            column.tasks = columnTasks;
          }
          columns.push(column);
        }
        columnsStore.set(columns);

        setTimeout(() => {
          loading = false;
        }, 3000);

      } else {
        console.error('Error HEADER_ONMOUNT ln 19: No Columns Found in DB')
      }
    } catch (e) {
      console.log(`Error HEADER_ONMOUNT ln 19: ${e}`)
    }
  })

</script>

<main id="section_Board" class="m-16 mb-0 px-2 w-screen bg-red-400 overflow-scroll">
  <section id="s_b_body" class="flex flex-row gap-2">
    {#if loading}
      <p>Loading Columns...</p>
    {:else}
      {#each columns as column}
        <Column id={column.id} name={column.name} description={column.description} tasks={column.tasks}/>
      {/each}
    {/if}
  </section>
</main>