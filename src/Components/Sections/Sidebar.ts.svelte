<script lang="ts">
  import SideBarIcon from "../Elements/SideBarIcon.ts.svelte";
  import Divider from '../Elements/Divider.ts.svelte';
  import { activeModal, modalHeader, modalText} from "../../Controllers/modal";

  function setModal(modal: string = "Default", header: string = "Deftauly", body: string = "Default" ){
    $activeModal = modal;
    $modalHeader = header;
    $modalText = body;
  }
</script>

<main id="section_Sidebar" class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-400 text-white-shadow-lg ">
  <SideBarIcon icon="BsGearFill" tooltip="⚙️️ Manage Board" action={() => setModal('UpdateBoard')} />
  <Divider />
  <SideBarIcon icon="BsPlus" tooltip="🗒️️ Add Task" action="{() => setModal('CreateTask')}" />
  <SideBarIcon icon="BsFileText" tooltip="📒️ Add Column" action="{() => setModal('CreateColumn')}" />
</main>