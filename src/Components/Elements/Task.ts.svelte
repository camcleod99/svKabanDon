<script lang="ts">
  // Props
  export let id: string = "";
  export let name: string = "";
  export let description: string = "";

  export let message: string = "";

  import { activeModal, activeId, modalHeader, modalText} from "../../Controllers/modal";

  function setModal(modal: string = "Default", id: string = "", header: string = "Deftauly", body: string = "Default" ){
    $activeModal = modal;
    $activeId = id;
    $modalHeader = header;
    $modalText = body;
  }

</script>

<main class="mx-auto py-2">
  <div class="max-w-64 min-w-64 bg-base-100 shadow-xl rounded-3xl p-1">
    <div class="p-4">
      {#if message}
        <p class="text-red-500 dark:text-red-400">
          {message}
        </p>
      {:else}
        <span class="flex justify-between">
          <div class="text-2xl font-bold">{name}</div>
          <div class="text-red-600 size-2 cursor-pointer" on:click={() => setModal('DeleteTask',id)} on:keydown={() => {}}>x</div>
        </span>
      <p>{description}</p>
      {/if}
    </div>
  </div>
</main>