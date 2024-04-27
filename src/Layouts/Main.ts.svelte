<script>
    import Sidebar from '../Components/Sections/Sidebar.ts.svelte';
    import Header from '../Components/Sections/Header.ts.svelte';
    import Board from '../Components/Sections/Board.ts.svelte';
</script>

<main id="layout_main">
  <Header />
  <section>
    <Sidebar/>
    <Board/>
  </section>
</main>