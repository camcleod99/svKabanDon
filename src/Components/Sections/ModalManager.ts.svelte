<script lang="ts">
 // Import modals
 import  Default  from '../Modals/Default.ts.svelte';
 import  Error  from '../Modals/Error.ts.svelte';
 import  Create  from '../Modals/Create.ts.svelte';
 import  Task  from '../Modals/Task.ts.svelte';

 // Import Global Props
  import { activeModal } from '../../store.js';

</script>

<main>
  {#if $activeModal === 'Default'}
    <Default/>
  {/if}
  {#if $activeModal === 'Error'}
    <Error />
  {/if}
  {#if $activeModal === 'Create'}
    <Create />
  {/if}
  {#if $activeModal === 'Task'}
    <Task />
  {/if}
</main>