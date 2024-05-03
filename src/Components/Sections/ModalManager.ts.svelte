<script lang="ts">
 // Import modals
 // import  Default  from '../Modals/Default.ts.svelte';
 // import  Error  from '../Modals/Error.ts.svelte';
 // import  Create  from '../Modals/Create.ts.svelte';
 // import  Task  from '../Modals/Task.ts.svelte';
 // import  Destroy  from '../Modals/Destroy.ts.svelte';

 // Import Global Props
  import { activeModal } from '../../store.js';

</script>

<main>
  {#if $activeModal}
    {#await import(`../Modals/${$activeModal}.ts.svelte`)}
      <p>Loading...</p>
    {:then component}
      <svelte:component this={component.default} />
    {:catch error}
      <p>Could not load the modal.</p>
    {/await}
  {/if}
  <!--{#if $activeModal === 'Default'}-->
  <!--  <Default/>-->
  <!--{/if}-->
  <!--{#if $activeModal === 'Error'}-->
  <!--  <Error />-->
  <!--{/if}-->
  <!--{#if $activeModal === 'Create'}-->
  <!--  <Create />-->
  <!--{/if}-->
  <!--{#if $activeModal === 'Task'}-->
  <!--  <Task />-->
  <!--{/if}-->
  <!--{#if $activeModal === 'Destroy'}-->
  <!--  <Destroy />-->
  <!--{/if}-->
</main>