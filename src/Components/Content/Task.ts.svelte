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
  <div class="card max-w-64 min-w-64 bg-base-100 shadow-xl">
    <div class="card-body p-4">
      {#if message}
        <p class="text-red-500 dark:text-red-400">
          {message}
        </p>
      {:else}
        <span class="flex">
          <h2 class="card-title">{name}</h2>
          <div class="card-actions flex-auto justify-end">
          <button class="text-red-600 size-2" on:click={() => setModal('DeleteTask',id)} on:keydown={() => {}}>x</button>
          </div>
        </span>
      <p>{description}</p>
      {/if}
    </div>
  </div>
<!--  <section class="block max-w-64 min-w-64 p-6-->
<!--      bg-white border border-gray-200 rounded-lg shadow-->
<!--      hover:bg-gray-100 dark:bg-gray-800-->
<!--      dark:border-gray-700 dark:hover:bg-gray-700">-->
<!--    {#if message}-->
<!--      <p class="text-red-500 dark:text-red-400">-->
<!--        {message}-->
<!--      </p>-->
<!--    {:else}-->
<!--    <p class="mb-2 text-2xl-->
<!--      tracking-tight font-bold text-gray-900 dark:text-gray-400">-->
<!--      {name}-->
<!--    </p>-->
<!--    <p class="font-normal text-gray-700 dark:text-gray-400">-->
<!--      {description}-->
<!--    </p>-->
<!--    <p class="text-sm text-gray-500 dark:text-gray-400">-->
<!--      <span on:click={() => setModal('DeleteTask',id)} on:keydown={() => {}}>{id}</span>-->
<!--    </p>-->
<!--    {/if}-->
<!--  </section>-->
</main>