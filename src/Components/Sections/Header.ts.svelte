<script lang="ts">
  import { onMount } from 'svelte';
  // Controllers
  import { titleStore, readSettings } from "../../Controllers/system"
  import { activeModal, modalHeader, modalText} from "../../Controllers/modal";
  function setModal(modal: string = "Default", header: string = "Default", body: string = "Default" ){
    $activeModal = modal;
    $modalHeader = header;
    $modalText = body;
  }

  let title : string;

  titleStore.subscribe(value => {
    title = value;
  });

  onMount(async() => {
    try{
      const settings = await readSettings('board_name');
      if (settings){
        titleStore.set(settings.value);
      } else {
        console.error('Error HEADER_ONMOUNT ln 13: No Setting Found in DB')
        titleStore.set(`ERROR: DB READ FAILED`)
    }
    } catch (e) {
      console.log(`Error HEADER_ONMOUNT ln 17: ${e}`)
      titleStore.set(`ERROR: ASYNC CALL FAILED`)
    }
  })


</script>

<main id="section_Header" class="flex cursor-pointer h-16 align-middle w-screen bg-green-400 ">
  <header>
    <p on:click={() => setModal('UpdateBoard')} on:keydown={()=>{}} class="text-4xl p-2">{title}</p>
  </header>
</main>