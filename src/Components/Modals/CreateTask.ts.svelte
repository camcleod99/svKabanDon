<script lang="ts">
  import { closeModal } from '../../../store.js';
  import { Icon } from 'svelte-icons-pack';
  import { createTask } from '../../store/store_database';
  // @ts-ignore - This is a false positive, the import is working fine
  import { FaSolidPlus as modalIcon } from 'svelte-icons-pack/fa';

  // Form validation variables
  let task_name = '';
  let task_description = '';
  let task_column = '';
  let task_name_error = '';
  let task_description_error = '';
  let task_column_error = '';

  // Error Messages
  const errorText  = [ 'required', 'invalid - A-Z, a-z, 0-9, and space only' ];

  // Function to validate form fields
  function validateForm() {
    task_name_error = validateInput(task_name);
    task_description_error = validateInput(task_description);
    task_column_error = validateInput(task_column);
  }

  // Function to submit task
  function submitTask() {
    validateForm();

    // Only submit the form if there are no validation errors
    if (!task_name_error && !task_description_error) {
      const task = {
        task_name,
        task_description,
        task_column
      }
      console.log(task);
      createTask(task_name, task_description, 1, 'uzgoox9s26lp3oa');
      window.alert('Submit Clicked');
      closeModal();
      } else {
      window.alert('Please fill in all required fields');
    }
  }

  $: validateForm();
  function validateInput(input: string): string {
    if (!input) {
      return errorText[0];
    } else if (!/^[a-zA-Z0-9 ]*$/.test(input)) {
      return errorText[1];
    } else {
      return '';
    }
  }

  // The Assumption is that "" will be the default value for the select because why wouldn't you have it as the default value?
  function validateSelect(input: string): string {
    if (input === "") {
      return errorText[0];
    } else {
      return '';
    }
  }

  // Reactive form Validations
  $: task_name_error = validateInput(task_name);
  $: task_description_error = validateInput(task_description);
  $: task_column_error = validateSelect(task_column);
</script>

<main class="fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
      flex justify-center items-center"
      on:click={() => closeModal()}
      on:keydown={() => {}}>
    <div class="bg-gray-200 rounded shadow-md w-[40%] flex gap-5 flex-col overflow-hidden"
         on:click={event => event.stopPropagation()}
         on:keydown={() => {}}>

        <div class="flex p-4 gap-4 pb-0">
            <div id="m_c_b_c_icon"
                 class="bg-red-200 rounded-full text-red-600 w-[50px] h-[50px]
                 p-2.5 m-2.5 mt-0 flex items-center justify-center">
                <Icon src={ modalIcon } size="32"/>
            </div>
            <div class="flex-grow">
                <h1 class="font-bold text-lg mb-5 text-gray-800">
                    New Task
                </h1>
              <form class="flex flex-col gap-5">
                <div class="flex flex-col gap-1">
                  <label for="task_name" class="text-gray-800">Task Name <span class="text-red-500">{task_name_error}</span></label>
                  <input type="text" id="task_name" name="task_name" bind:value={task_name} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"/>

                  <label for="task_description" class="text-gray-800">Task Description  <span class="text-red-500">{task_description_error}</span></label>
                  <input type="text" id="task_description" name="task_description" bind:value={task_description} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"/>

                  <label for="task_column" class="text-gray-800">Task Column <span class="text-red-500">{task_column_error}</span></label>
                  <select id="task_column" name="task_column" bind:value={task_column} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500">
                    {#if task_column_error } <option value="">Select a column</option> {/if}
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </form>
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
               class="bg-blue-500 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-blue-700"
               on:click={() => submitTask() }
               on:keydown={() => {}}>
                 Submit
             </button>
         </div>

     </div>
 </main>