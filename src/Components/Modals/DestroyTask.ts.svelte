<script lang="ts">
  // import { writable } from 'svelte/store';
  import {closeModal} from '../../../store.js';
  import {Icon} from 'svelte-icons-pack';
  // @ts-ignore - This is a false positive, the import is working fine
  import { FaSolidBomb as modalIcon } from 'svelte-icons-pack/fa';

  // Form validation variables
  let task_name = '';
  let task_description = '';
  let task_column = '';
  let task_name_error = '';
  let task_description_error = '';
  let task_column_error = '';

  // Error Messages
  const errorText = ['required', 'invalid - A-Z, a-z, 0-9, and space only'];

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

<main id="modal_destroy"
      class="fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
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
          Destroy Task - [task name]
        </h1>
        <p class="text-gray-800">
          Are you sure you want to destroy this task?
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
      <!--  TODO - 20 / 5 - Add the call to delete the task from the database -->
      <!-- destroy(table, id) -->
      <button
        class="bg-red-500 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-red-700"
        on:click={() => window.alert('PRETEND: Task Deleted')}
        on:keydown={() => {}}>
        Delete Task
      </button>
    </div>

  </div>
</main>