<script>
    import { onMount } from 'svelte';
    let MainComp = 'Main'; // Set this to either 'Main' or 'Testbed'
    let Component;

    onMount(async () => {
        const module = await import(`./Layouts/${MainComp}.ts.svelte`);
        Component = module.default;
    });
</script>

<main>
  {#if Component}
    <svelte:component this={Component} />
  {/if}
</main>