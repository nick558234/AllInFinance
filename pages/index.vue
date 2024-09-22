<template>
  <div class="flex h-screen">
    <Aside class="w-64" />
    <div class="flex flex-col flex-1">
      <Header class="w-full" />
      <div class="p-4">
        <h1>Assets gesorteerd op Categorie</h1>
        <div v-if="filteredAssets.length">
          <div v-for="(asset, index) in filteredAssets" :key="index">
            <p>ID: {{ asset.id }}</p>
            <p>Name: {{ asset.name }}</p>
            <p>Type: {{ asset.type }}</p>
            <p>Current Value: {{ asset.current_value }}</p>
            <p>Purchase Price: {{ asset.purchase_price }}</p>
            <p>Category ID: {{ asset.category_id }}</p>
            <hr />
            <Bitcoin v-if="asset.name.toLowerCase() === 'bitcoin'" />
          </div>
        </div>
        <div v-else>
          <p>Geen assets gevonden.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import Aside from '~/components/Aside.vue'
import Header from '~/components/Header.vue'
import Bitcoin from '~/components/Bitcoin.vue'
import { useCategory } from '~/composables/useCategory'

const config = useRuntimeConfig()
const assets = ref([])

const { selectedCategory } = useCategory()

// Fetch data using useAsyncData to ensure SSR compatibility
const getAssets = async () => {
  try {
    const data = await $fetch(`${config.public.apiUrl}/assets`)
    assets.value = data
  } catch (error) {
    console.error('Error fetching assets:', error)
    assets.value = [] // Ensure assets is always an array
  }
}

const filteredAssets = computed(() => {
  if (!assets.value) {
    return []
  }
  if (!selectedCategory.value) {
    return assets.value
  }
  return assets.value.filter(asset => asset.category_id === selectedCategory.value)
})

onMounted(() => {
  getAssets()
})
</script>