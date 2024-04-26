<script lang="ts">
  // TypeScript code goes here

  // Props
  export let text: string = 'Enter Some Text, Dipstick!';
  export let action: () => void = () => console.log('Default action');
</script>

<style>
  /* CSS styles go here */
</style>

<main>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    on:click="{action}">
    {text}
  </button>
</main>

