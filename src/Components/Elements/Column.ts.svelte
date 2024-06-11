<script lang="ts">
  import { onMount } from "svelte";
  // Controllers
  import { Task as TasksInterface, tasksStore } from "../../Controllers/tasks";
  // Components
  import Task from './Task.ts.svelte';
  import Divider from './Divider.ts.svelte';
  import { activeModal, activeId } from "../../Controllers/modal";

  // Props (Columns)
  export let name: string;
  export let description: string;
  export let limit: number;
  export let id: string;

  // System Vars
  let loading = true;
  let tasks : TasksInterface[] = [];

  // Lifecycle Hook
  onMount(async() => {
    tasksStore.subscribe((value) => {
      tasks = value
        .filter((task: TasksInterface) => task.column === id)
        .sort((a, b) => a.weight - b.weight)
    });
    loading = false;
  })

  // Store Subscription
  tasksStore.subscribe((value) =>{
    tasks = value
      .filter((task: TasksInterface) => task.column === id)
      .sort((a, b) => a.weight - b.weight)
  });

  function setModal(modal: string, modalId: string){
    console.log(modalId)
    $activeModal = modal;
    $activeId = modalId;
  }

</script>

<main id="column_{id}" class="max-w-80 min-w-80 h-[860px] m-4 rounded-lg bg-amber-200">
    <header class="p-2 h-[130px] font-bold text-gray-900 dark:text-gray-100">
      <h1 class="text-4xl mb-4 cursor-pointer" on:click={()=>setModal('RenameColumn', id)} on:keydown={() => {}}>
        {name}
      </h1>
      <h2 class="text-2xl italic cursor-pointer"  on:click={()=>setModal('DescribeColumn', id)} on:keydown={() => {}}>
        {description}
      </h2>
      {#if limit !== 0}
        <h2 class="text-sm cursor-pointer">
          Limit: {limit}
        </h2>
      {/if}
    </header>
    <Divider/>
    <section class="flex flex-col h-[730px] overflow-scroll">
      {#if !loading}
        {#if tasks.length > 0}
          {#each tasks as task}
            <Task name={task.name} description={task.description} id={task.id} weight={task.weight} taskColumn={task.column} />
          {/each}
        {:else}
          <Task message="There are no tasks in this column"/>
        {/if}
      {:else}
        <Task message="Loading Tasks..."/>
      {/if}
    </section>
</main>