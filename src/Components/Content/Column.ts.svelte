<script lang="ts">
  import { onMount } from "svelte";
  // Controllers
  import { Task as TasksInterface, tasksStore } from "../../Controllers/tasks";
  // Components
  import Task from './Task.ts.svelte';
  import Divider from '../Elements/Divider.ts.svelte';

  // Props (Columns)
  export let name: string;
  export let description: string;
  export let id: string;

  // System Vars
  let loading = true;
  let tasks : TasksInterface[] = [];

  // Lifecycle Hook
  onMount(async() => {
    tasksStore.subscribe((value) => {
      tasks = value.filter((task: TasksInterface) => task.column === id);
    });
    loading = false;
  })

  // Store Subscription
  tasksStore.subscribe((value) =>{
    tasks = value.filter((task: any) => task.column === id);
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
      {#if !loading}
        {#if tasks.length > 0}
          {#each tasks as task}
            <Task name={task.name} description={task.description} id={task.id} />
          {/each}
        {:else}
          <Task message="There are no tasks in this column"/>
        {/if}
      {:else}
        <Task message="Loading Tasks..."/>
      {/if}
    </section>
</main>