<script>
  import Counter from './Components/Content/Counter.svelte'
  import SideBarIcon from './Components/Elements/SideBarIcon.ts.svelte'
</script>

<main>
  <SideBarIcon icon="AiOutlineNodeExpand" size="32" />
  <SideBarIcon icon="AiOutlineNodeExpand" size="16" />
  <SideBarIcon icon="BsPlus" size="16" />
  <h1 class="py-8 px-4 rounded-lg border border-indigo-900 shadow-lg">Hello {name}!</h1>
  <p>Visit the <a href="https://svelte.dev/tutorial">Svelte Tutorial</a></p>
  <div class="card">
    <Counter />
  </div>
</main>