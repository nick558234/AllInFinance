<template>
  <aside class="w-64 bg-[#002093] text-white flex flex-col">
    <div class="p-4 text-2xl font-bold">
      <img src="~/assets/logo(2).webp" alt="Logo" class="w-full h-auto">
    </div>
    <nav class="flex-1 p-4">
      <ul>
        <li v-for="category in categories" :key="category.id" class="mb-4">
          <button @click="selectCategory(category.id)" class="hover:bg-gray-700 p-2 rounded block">{{ category.name }}</button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import { useCategory } from '~/composables/useCategory'

const { selectedCategory } = useCategory()

// get all categories
const categories = ref([])

const getCategories = async () => {
  const config = useRuntimeConfig()
  try {
    const { data } = await axios.get(`${config.public.apiUrl}/categories`)
    categories.value = data
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

// Emit an event when a category is selected
const selectCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// Fetch categories when the component is mounted
onMounted(() => {
  getCategories()
})
</script>