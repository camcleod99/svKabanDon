<script lang="ts">
    import { closeModal } from '../../store.js';
    import { Icon } from 'svelte-icons-pack';
    // @ts-ignore - This is a false positive, the import is working fine
    import { FaNoteSticky as modalIcon } from 'svelte-icons-pack/fa';
</script>

<main id="modal_task"
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
                    [Task Name]
                </h1>
                <p>
                    [Task Description]
                </p>
            </div>
        </div>

        <div class="bg-gray-300 p-1.5 px-3 flex justify-end gap-5">
            <button
              class="bg-red-50 rounded  border-red-400 border-2 px-2.5 py-1.5 text-black cursor-pointer hover:bg-red-500 hover:text-white"
              on:click={() => window.alert('Button 1 Clicked')}
              on:keydown={() => {}}>
                Delete
            </button>
            <button
              class="bg-blue-700 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-blue-500"
              on:click={() => window.alert('Button 2 clicked')}
              on:keydown={() => {}}>
                Edit
            </button>
        </div>
    </div>
</main>