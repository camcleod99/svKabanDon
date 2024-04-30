<script lang="ts">
  import ModalManager from '../Components/Sections/ModalManager.ts.svelte';
  import Button from '../Components/Elements/Button.ts.svelte';
  import {setModal} from "../store";
</script>

<main id="layout_main">
  <ModalManager />
  <Button text="Test"  action={() => setModal( )} />
</main>