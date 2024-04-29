<script lang="ts">
    export let title: string = 'Something went wrong! (That or you forgot to set a title, genius)';
    export let text: string="This is an error box which will appear when " +
      "something goes wrong.<br/>Nothing's wrong right now but this is also the default message. " +
      "If you're making a webapp and this message wasn't what you were " +
      "expecting then you might want to look into that, champ.";

    import { Icon } from 'svelte-icons-pack';
    import { FaSolidExclamation } from 'svelte-icons-pack/fa';
</script>

<main id="modal_default"
      class="fixed left-0 top-0 bg-gray-700 bg-opacity-50 w-screen h-screen
      flex justify-center items-center"
      on:click={() => window.alert('background clicked')}
      on:keydown={() => {}}>
    <div id="m_d_body"
         class="bg-gray-200 rounded shadow-md w-[40%] flex gap-5 flex-col overflow-hidden"
         on:click={event => event.stopPropagation()}
         on:keydown={() => {}}>

        <div id="m_d_b_text" class="flex p-4 gap-4 pb-0">
            <div id="m-d_b_c_icon"
                 class="bg-red-200 rounded-full text-red-600 w-[50px] h-[50px]
                 p-2.5 m-2.5 mt-0 flex items-center justify-center">
                <Icon src={ FaSolidExclamation } size="32"/>
            </div>
            <div id="m_d_b_c_right" class="flex-grow">
                <h1 class="font-bold text-lg mb-5 text-gray-800">
                    Error! {title}
                </h1>
                <p>{@html text}</p>
            </div>
        </div>

        <div id="m_d_footer" class="bg-gray-300 p-1.5 px-3 flex justify-end gap-5">
<!--            <button-->
<!--              class="bg-gray-50 rounded  border-gray-400 border-2 px-2.5 py-1.5 text-black cursor-pointer hover:bg-gray-500 hover:text-white"-->
<!--              on:click={() => window.alert('Button 1 Clicked')}-->
<!--              on:keydown={() => {}}>-->
<!--                Something!-->
<!--            </button>-->
            <button
              class="bg-blue-700 rounded px-2.5 py-1.5 text-white cursor-pointer hover:bg-blue-500"
              on:click={() => window.alert('Button 2 clicked')}
              on:keydown={() => {}}>
                OK
            </button>
        </div>

    </div>
</main>