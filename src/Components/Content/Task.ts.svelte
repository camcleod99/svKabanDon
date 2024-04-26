<script lang="ts">
  export let name:  string = 'Task Name';
 export let description: string = 'Task Description';
</script>

<main class="mx-auto py-2">
  <a
    href="#"
    class="block max-w-64 min-w-64 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800
         dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {name}
    </h3>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
  </a>
</main>