<script lang="ts">
  import ModalManager from '../Components/Sections/ModalManager.ts.svelte';
  import Button from '../Components/Elements/Button.ts.svelte';
  import {setModal} from "../store";
</script>

<main id="layout_main">
  <ModalManager />
  <Button text="Test"  action={() => setModal({modal: "Default", header: "Header", body: "ipsom lorem upsom."} )} />
  <Button text="Input"  action={() => setModal({modal: "Create"} )} />
</main>