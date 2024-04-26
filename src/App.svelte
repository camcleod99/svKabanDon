<script>
  import Button from './Components/Elements/Button.ts.svelte'
  import SideBarIcon from './Components/Elements/SideBarIcon.ts.svelte'
  import Column from './Components/Content/Column.ts.svelte'
</script>

<main>
  <SideBarIcon icon="AiOutlineNodeExpand" size="32" />
  <SideBarIcon icon="AiOutlineNodeExpand" size="16" />
  <SideBarIcon icon="BsPlus" size="16" />
  <Button text="Click me"  action={() => alert('The button has been pressed')} />
  <div class="flex">
    <Column/>
    <Column/>
    <Column/>
  </div>
</main>