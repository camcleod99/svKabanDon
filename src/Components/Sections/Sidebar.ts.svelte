<script lang="ts">
  import SideBarIcon from "../Elements/SideBarIcon.ts.svelte";
  import Divider from '../Elements/Divider.ts.svelte';
  import {activeModal, modalAction, modalHeader, modalText} from "../../store";

  function setModal(modal: string = "Default", header: string = "Deftauly", body: string = "Default", action: () => void =  () => console.log('Default Action') ){
    $activeModal = modal;
    $modalHeader = header;
    $modalText = body;
    $modalAction = action;
  }
</script>

<main id="section_Sidebar" class="fixed top-0 left-0 h-screen w-16 m-0 flex flex-col bg-gray-400 text-white-shadow-lg ">
  <SideBarIcon icon="BsGearFill" tooltip="⚙️️ Manage Board" action={() => setModal()} />
  <Divider />
  <SideBarIcon icon="BsGearFill" tooltip="⚙️️ Manage Board" action={() => console.log('Default action')} />
  <SideBarIcon icon="BsPlus" tooltip="🗒️️ Add Task" />
  <SideBarIcon icon="BsFileText" tooltip="📒️ Add Column" />
</main>