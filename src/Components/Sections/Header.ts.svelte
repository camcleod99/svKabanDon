<script lang="ts">
  import { onMount } from 'svelte';
  import { getSystemSettings } from '../../../store/store_database';

  let title : string;

  onMount(async() => {
    try{
      title = 'Loading'
      const settings = await getSystemSettings('board_name');
      if (settings){
        title = settings.value;
      } else {
        console.error('Error HEADER_ONMOUNT ln 13: No Setting Found in DB')
        title = `ERROR : DB`;
    }
    } catch (e) {
      console.log(`Error HEADER_ONMOUNT ln 17: ${e}`)
      title = "ERROR : ASYNC"
    }
  })


</script>

<main id="section_Header" class="fixed flex top-0 left-16 h-16 align-middle w-screen bg-green-400 ">
  <header>
    <p class="text-4xl p-2">{title}</p>
  </header>
</main>