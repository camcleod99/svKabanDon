<script lang="ts">
  import { onMount } from 'svelte';
  import { Icon } from 'svelte-icons-pack';
  import { closeModal } from '../../Controllers/modal';
  import { readSettings, updateTitle } from '../../Controllers/system';
  // @ts-ignore - This is a false positive endemic to svelte-icons-pack. The import is working fine
  import { FiGlobe as modalIcon } from 'svelte-icons-pack/fi';

  // Form validation variables
  let boardName = '';
  let oldBoardName = '';
  let boardID = '';

  // Get the variables for the board
  onMount(async() => {
   const settings = await readSettings('board_name');
   if (!settings){
     boardName = '⚠️️ No Board Name Found in DB';
   } else {
     boardName = settings.value;
     oldBoardName = settings.value;
     boardID = settings.id;
   }
  })

  // Error Messages
  const errorText  = [ 'required', 'Letters, Numbers, and Space only', 'Same as old Name' ];

  // Function to validate form fields
  function validateForm() {
    boardNameError = validateInput(boardName);
  }

  // Function to submit a task
  function submitForm() {
    validateForm();

    // Only submit the form if there are no validation errors
    if (!boardNameError) {
      console.log(boardID, boardName)
      updateTitle(boardID, boardName);
      closeModal();
      } else {
      window.alert(boardNameError);
    }
  }

  $: validateForm();
  function validateInput(input: string): string {
    if (!input) {
      return errorText[0];
    } else if (!/^[a-zA-Z0-9' ]*$/.test(input)) {
      return errorText[1];
    } else if (input === oldBoardName){
      return errorText[2];
    } else {
      return '';
    }
  }

  // Reactive form Validations
  $: boardNameError = validateInput(boardName);
</script>

<main id="modal_modifyBoard"
      class="fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
      flex justify-center items-center z-50"
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
                   Modify Board
                </h1>
              <form class="flex flex-col gap-5"
                    on:submit|preventDefault={submitForm}
                    on:keydown={e => { if (e.key === 'Enter') { submitForm(); }
                    else if (e.key === 'Escape') { closeModal();} } }>
                <div class="flex flex-col gap-1">
                  <label for="task_name" class="text-gray-800">Board Name <span class="text-red-500">{boardNameError}</span></label>
                  <input type="text" id="task_name" name="task_name" bind:value={boardName} class="p-2 border border-gray-400 rounded focus:outline-none focus:border-blue-500"/>
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
               on:click={() => submitForm() }
               on:keydown={() => {}}>
                 Submit
             </button>
         </div>

     </div>
 </main>