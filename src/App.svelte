<script>
    import { onMount } from 'svelte';

    import { initTasks } from "./Controllers/tasks";
    import { initColumns } from "./Controllers/columns";

    let MainComp = 'Main'; // Set this to either 'Main' or 'Testbed'
    let Component;

    onMount(async () => {
        // Initialize Data from DB on Initial Load
        await initTasks();
        await initColumns();
        // Load the Layout Component
        const module = await import(`./Layouts/${MainComp}.ts.svelte`);
        Component = module.default;
    });
</script>

<main>
  {#if Component}
    <svelte:component this={Component} />
  {/if}
</main>