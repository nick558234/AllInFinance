<template>
  <aside class="w-64 bg-[#2C83EC] text-white flex flex-col h-screen">
    <div class="p-4 text-2xl font-bold">
      <a href="/">
        <img src="~/assets/logo(2).webp" alt="Logo" class="h-32">
      </a>
    </div>
    <nav class="flex-1 p-4 overflow-y-auto">
      <ul>
        <li class="mb-4">
          <a href="/financialHealth" class="hover:bg-[#333333] font-bold text-xl uppercase hover:text-white p-2 rounded block">financial-health</a>
        </li>
        <li v-for="category in categories" :key="category.id" class="mb-4">
          <a :href="getCategoryLink(category.id)" @click="selectCategory(category.id)" class="hover:bg-[#333333] font-bold text-xl uppercase hover:text-white p-2 rounded block">{{ category.name }}</a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRuntimeConfig, useRoute } from '#app'
import axios from 'axios'
import { useCategory } from '~/composables/useCategory'

const { selectedCategory } = useCategory()
const route = useRoute()

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

// Determine the link for each category
const getCategoryLink = (categoryId) => {
  if (route.path === '/financialHealth') {
    return `/dashboard`
  }
  return '#'
}

// Fetch categories when the component is mounted
onMounted(() => {
  getCategories()
})
</script>

<style scoped>
/* Add any additional styles here */
</style>