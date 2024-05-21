<script lang="ts">
  // Components
  import Task from './Task.ts.svelte';
  import Divider from '../Elements/Divider.ts.svelte';
  import {readTasksOnColumn, tasksStore} from "../../store/store_database";
  import {onMount} from "svelte";

  // Props
  export let name: string;
  export let description: string;
  export let id: string;

  let tasks : any = [];
  let loading = true;

  // loadColumn
  const loadColumn = async() => {
    if(!id){
      return
    }
    try{
      const results = await readTasksOnColumn(id);
      if ( results && JSON.stringify(results) !== JSON.stringify(tasks) ){
        tasks = [...results]
        tasksStore.set(tasks);
        loading = false;
      } else {
        console.error('Error COLUMN_ONMOUNT ln 19: No Tasks Found in DB')
      }
    } catch (e) {
      console.log(`Error COLUMN_ONMOUNT ln 19: ${e}`)
    }
  }

  onMount(loadColumn);

  tasksStore.subscribe(() => {
    loadColumn();
  });

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
      {#if tasks.length > 0}
        {#each tasks as task}
            <Task name={task.name} description={task.description} id={task.id} />
        {/each}
      {:else}
          <Task message="There are no tasks in this column"/>
      {/if}
    </section>
</main>