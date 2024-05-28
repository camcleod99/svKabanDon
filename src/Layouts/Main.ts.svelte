<script lang="ts">
    import Sidebar from '../Components/Sections/Sidebar.ts.svelte';
    import Header from '../Components/Sections/Header.ts.svelte';
    import Board from '../Components/Sections/Board.ts.svelte';
    import ModalManager from "../Components/Sections/ModalManager.ts.svelte";

    import { initTasks } from "../Controllers/tasks";
    import { initColumns } from "../Controllers/columns";
</script>

<main id="layout_main">
  <ModalManager />
  <Header />
  <section>
    <Sidebar/>
    <Board/>
  </section>
</main>