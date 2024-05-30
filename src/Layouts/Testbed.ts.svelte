<script lang="ts">
  import ModalManager from '../Components/Sections/ModalManager.ts.svelte';
  import Button from '../Components/Elements/Button.ts.svelte';
  import { setModal } from "../Controllers/modal";
</script>

<main id="layout_main" class="gap-2">
  <ModalManager />
  <Button text="Test"     action={() => setModal({modal: "Default", header: "Header", body: "ipsom lorem."} )} />
  <Button text="Input"    action={() => setModal({modal: "Create"} )} />
  <Button text="Destroy"  action={() => setModal({modal: "Destroy"} )} />
  <Button text="Task"     action={() => setModal({modal: "Task"} )} />
</main>