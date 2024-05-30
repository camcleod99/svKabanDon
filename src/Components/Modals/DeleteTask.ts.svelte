<script lang="ts">
  import { get } from 'svelte/store';
  import { Icon } from 'svelte-icons-pack';
  // @ts-ignore - This is a false positive endemic to svelte-icons-pack. The import is working fine
  import { FaSolidBomb as modalIcon } from 'svelte-icons-pack/fa';
  import { readOneTask } from "../../Controllers/tasks";
  import { deleteTask } from "../../Controllers/tasks";
  import { closeModal, activeId } from '../../Controllers/modal';

  let id = get(activeId);
  let task_name: string;

  // Get the name of the task
  async function setUpModal(){
    task_name = await getTaskName(id);
  }
  async function getTaskName(id: string){
    console.log(id)
    let task = await readOneTask(id);
    if (task){
      console.log(task)
      console.log(task.name)
      return task.name;
    } else {
      return 'ERROR: TASK NAME NOT FOUND'
    }
  }

  setUpModal();

  async function destroyTask(id: string){
    let result = await deleteTask(id);
    if (result){
      // TODO FUTURE: Implement a toast notification saying the task was deleted
      closeModal();
    } else {
      // TODO FUTURE: AS ABOVE, EXCEPT FOR ERROR
      closeModal();
    }
  }
</script>

<main id="modal_destroy"
      class="glass z-100 fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
      flex justify-center items-center"
      on:click={() => closeModal()}
      on:keydown={() => {}}>
  <div class="bg-gray-200 rounded shadow-md w-[40%] flex gap-5 flex-col overflow-hidden"
       on:click={event => event.stopPropagation()}
       on:keydown={() => {}}>

    <div class="flex p-4 gap-4 pb-0">
      <div class="bg-red-200 rounded-full text-red-600 w-[50px] h-[50px]
                 p-2.5 m-2.5 mt-0 flex items-center justify-center">
        <Icon src={ modalIcon } size="32"/>
      </div>
      <div class="flex-grow">
        <h1 class="font-bold text-lg mb-5 text-gray-800">
          Destroy Task - {task_name}
        </h1>
        <p class="text-gray-800">
          Are you sure you want to delete this task?
          You can not undo this action.
        </p>
      </div>
    </div>

    <div class="bg-gray-300 p-1.5 px-3 flex justify-end gap-5">
      <button
        class="bg-gray-50 rounded  border-gray-400 border-2 px-2.5 py-1.5 text-black cursor-pointer hover:bg-gray-500 hover:text-white"
        on:click={() => closeModal() }
        on:keydown={() => {}}>
        Cancel
      </button>
      <button
        class="bg-red-500 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-red-700"
        on:click={() => destroyTask(id)}
        on:keydown={() => {}}>
        Delete Task
      </button>
    </div>

  </div>
</main>