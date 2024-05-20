<script lang="ts">
  export let id: string = "Task ID";
  export let name: string = "Task Name";
  export let description: string = "Task Description";
</script>

<main class="mx-auto py-2">
  <section class="block max-w-64 min-w-64 p-6
      bg-white border border-gray-200 rounded-lg shadow
      hover:bg-gray-100 dark:bg-gray-800
      dark:border-gray-700 dark:hover:bg-gray-700">
    <p class="mb-2 text-2xl
      tracking-tight font-bold text-gray-900 dark:text-gray-400">
      {name}
    </p>
    <p class="font-normal text-gray-700 dark:text-gray-400">
      {description}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      {id}
    </p>
  </section>
</main>