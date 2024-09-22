<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Aside />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-gray-200 p-4 flex justify-between items-center">
        <h1 class="text-3xl font-bold">Winkelvooraadbeheer</h1>
      </header>

      <!-- Content -->
      <main class="flex-1 p-4 overflow-y-auto">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Winkelvooraadbeheer'
})

</script>

<style scoped>
/* Add any additional styles here */
</style>