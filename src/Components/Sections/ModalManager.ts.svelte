<script lang="ts">
 // Import Global Props
 import {activeModal, modalHeader, modalText} from '../../../store.js';
 function setModal(modal: string = "Default", header: string = "Deftauly", body: string = "Default" ){
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