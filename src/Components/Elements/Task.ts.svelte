<script lang="ts">
  // Props
  import {onMount} from "svelte";
  import { Column as ColumnInterface, columnsStore } from "../../Controllers/columns";
  import { moveTask } from "../../Controllers/tasks";

  export let id: string = "";
  export let name: string = "";
  export let description: string = "";
  export let message: string = "";
  export let weight: number = -1;
  export let taskColumn: string = "";

  import { activeModal, activeId, modalHeader, modalText} from "../../Controllers/modal";

  function setModal(modal: string = "Default", id: string = "", header: string = "Deftauly", body: string = "Default" ){
    $activeModal = modal;
    $activeId = id;
    $modalHeader = header;
    $modalText = body;
  }

  // Columns is an array of ColumnInterface
  let columns: ColumnInterface[] = [];
  let columnPosition: number = -1;
  let columnNext: undefined | string = "-1";
  let columnPrev: undefined | string = "-1";

  async function getLocations(){
    // Map columnsStore into an array
    // if the value id matches the id of the task, set the position to the index

    columnsStore.subscribe((value) => {
      columns = value.map((column: ColumnInterface) => column);
    });

    columns.forEach((column, index) => {
      if(column.id === taskColumn){
        columnPosition = index;
        // if index is 0 then there is no previous column, otherwise set to the column id at index - 1
        // if index is the last column, then there is no next column, otherwise set to the column id at index + 1
        columnPrev = index === 0 ? "-1" : columns[index - 1].id;
        columnNext = index === columns.length - 1 ? "-1" : columns[index + 1].id;
      }
    });
    return null;
  }

  // Move getLocations here
  // Run getLocations onMount
  onMount(() => {
    getLocations();
  });


</script>

<main id="task_{id}" class="mx-auto py-2">
  <div class="max-w-64 min-w-64 bg-base-100 shadow-xl rounded-3xl p-1">
    <div class="p-4">
      {#if message}
        <p class="text-red-500 dark:text-red-400">
          {message}
        </p>
      {:else}
        <div class="flex gap-4 justify-end">
          <span class="text-red-600 size-2 cursor-pointer" on:click={() => setModal('DeleteTask',id)} on:keydown={() => {}}>x️</span>
        </div>
        <div class="text-2xl font-bold cursor-pointer" on:click={()=> setModal('RenameTask', id)} on:keydown={()=>{}}>{name}</div>
        <p class="cursor-pointer" on:click={() => setModal('DescribeTask', id)} on:keydown={()=>{}}>{description}</p>
        <div class="flex gap-2 justify-between">
          <div>
            {#if columnPosition !== 0}
              <span class="text-green-600 cursor-pointer" on:click={() => moveTask(id, columnPrev)} on:keydown={() => {}}>←</span>
            {/if}
            {#if columnPosition !== (columns.length - 1)}
              <span class="text-green-600 cursor-pointer" on:click={() => moveTask(id, columnNext)} on:keydown={() => {}}>→</span>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
</main>