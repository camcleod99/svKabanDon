<script lang="ts">
  // import { writable } from 'svelte/store';
  import { closeModal } from '../../store.js';
  import { Icon } from 'svelte-icons-pack';
  // @ts-ignore - This is a false positive, the import is working fine
  import { FiFolderPlus as modalIcon } from 'svelte-icons-pack/fi';

  // Form validation variables
  let columnName = '';
  let columnDescription = '';

  // Error Messages
  const errorText  = [ 'required', 'invalid - A-Z, a-z, 0-9, and space only' ];

  // Function to validate form fields
  function validateForm() {
    columnNameError = validateInput(columnName);
    columnDescriptionError = validateInput(columnDescription);
  }

  // Function to submit task
  function submitColumn() {
    validateForm();

    // Only submit the form if there are no validation errors
    if (!columnNameError && !columnDescriptionError) {
      const column = {
        ColumnName,
        ColumnDescription
      }
      console.log(column);
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
  $: columnNameError = validateInput(columnName);
  $: columnDescriptionError = validateInput(columnDescription);
</script>

<main id="modal_create"
      class="fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
      flex justify-center items-center"
      on:click={() => closeModal()}
      on:keydown={() => {}}>
    <div id="m_c_body"
         class="bg-gray-200 rounded shadow-md w-[40%] flex gap-5 flex-col overflow-hidden"
         on:click={event => event.stopPropagation()}
         on:keydown={() => {}}>

        <div id="m_c_b_text" class="flex p-4 gap-4 pb-0">
            <div id="m_c_b_c_icon"
                 class="bg-red-200 rounded-full text-red-600 w-[50px] h-[50px]
                 p-2.5 m-2.5 mt-0 flex items-center justify-center">
                <Icon src={ modalIcon } size="32"/>
            </div>
            <div id="m_c_b_c_right" class="flex-grow">
                <h1 class="font-bold text-lg mb-5 text-gray-800">
                    New Task
                </h1>
              <form id="m_c_b_c_r_form" class="flex flex-col gap-5">
                <div class="flex flex-col gap-1">
                  <label for="task_name" class="text-gray-800">Task Name <span class="text-red-500">{columnNameError}</span></label>
                  <input type="text" id="task_name" name="task_name" bind:value={columnName} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"/>

                  <label for="task_description" class="text-gray-800">Task Description  <span class="text-red-500">{columnDescriptionError}</span></label>
                  <input type="text" id="task_description" name="task_description" bind:value={columnDescription} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"/>

                </div>
              </form>
             </div>
         </div>

         <div id="m_d_footer" class="bg-gray-300 p-1.5 px-3 flex justify-end gap-5">
             <button
               class="bg-gray-50 rounded  border-gray-400 border-2 px-2.5 py-1.5 text-black cursor-pointer hover:bg-gray-500 hover:text-white"
               on:click={() => closeModal() }
               on:keydown={() => {}}>
                 Cancel
             </button>
             <button
               class="bg-blue-500 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-blue-700"
               on:click={() => submitColumn() }
               on:keydown={() => {}}>
                 Submit
             </button>
         </div>

     </div>
 </main>