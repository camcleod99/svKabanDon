<script lang="ts">
  import { onMount } from 'svelte';
  import { readSystemSettings } from '../../store/store_database';
  import { titleStore } from "../../store/store_database";

  let title : string;

  titleStore.subscribe(value => {
    title = value;
  });

  onMount(async() => {
    try{
      const settings = await readSystemSettings('board_name');
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

<main id="section_Header" class="fixed flex top-0 left-16 h-16 align-middle w-screen bg-green-400 ">
  <header>
    <p class="text-4xl p-2">{title}</p>
  </header>
</main>