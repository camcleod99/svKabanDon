<script lang="ts">
  import {activeModal, modalHeader, modalText} from '../../Controllers/modal';
  function setModal(modal: string = "Default", header: string = "Default", body: string = "Default" ){
    $activeModal = modal;
    $modalHeader = header;
    $modalText = body;
    return true;
  }
</script>

<main>
  {#if $activeModal }
    {#await import(`../Modals/${$activeModal}.ts.svelte`)}
<!--      <p>Loading...</p>-->
    {:then component}
      <svelte:component this={component.default} />
    {:catch error}
      { setModal("Error", "Error", `Could not load ${$activeModal} <br> ${error}`) }
    {/await}
  {/if}

</main>