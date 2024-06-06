<script lang="ts">
  import SideBarIcon from "../Elements/SideBarIcon.ts.svelte";
  import { activeModal, modalHeader, modalText} from "../../Controllers/modal";
  import { setUpTasks } from "../../Controllers/tasks";
  import {setUpColumns} from "../../Controllers/columns";

  function setModal(modal: string = "Default", header: string = "Deftauly", body: string = "Default" ){
    $activeModal = modal;
    $modalHeader = header;
    $modalText = body;
  }
</script>

<main id="section_Sidebar" class="fixed h-screen w-16 m-0 flex flex-col content-center justify-end text-white-shadow-lg z-50">
  <SideBarIcon icon="AiOutlineNodeExpand" tooltip="🗒️️ Add Task" action="{() => setUpColumns()}" />
  <SideBarIcon icon="BsFileText" tooltip="🗒️️ Add Task" action="{() => setUpTasks()}" />
  <SideBarIcon icon="BsPlus" tooltip="🗒️️ Add Task" action="{() => setModal('CreateTask')}" />
</main>