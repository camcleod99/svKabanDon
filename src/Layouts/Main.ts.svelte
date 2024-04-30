<script lang="ts">
    import Sidebar from '../Components/Sections/Sidebar.ts.svelte';
    import Header from '../Components/Sections/Header.ts.svelte';
    import Board from '../Components/Sections/Board.ts.svelte';
    import ModalManager from "../Components/Sections/ModalManager.ts.svelte";
</script>

<main id="layout_main">
  <ModalManager />
  <Header />
  <section>
    <Sidebar/>
    <Board/>
  </section>
</main>