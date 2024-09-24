<template>
  <div class="flex h-screen">
    <Aside class="w-64" />
    <div class="flex flex-col flex-1">
      <Header class="w-full" />
      <div class="flex flex-col flex-1 p-4">
        <div class="flex flex-1 mb-4">
          <div class="w-1/4 p-4 border rounded shadow">
            <h2 class="text-lg font-semibold">Total Price of All Assets</h2>
            <p class="text-xl">{{ totalPrice.toFixed(2) }}</p>
          </div>
          <div class="w-3/4 p-4 border rounded shadow">
            <CryptoPrices class="h-96" v-if="selectedCrypto" :cryptoName="selectedCrypto" @update:latestPrice="updateLatestPrice" />
          </div>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold mb-4">Assets gesorteerd op Categorie</h1>
          <div v-if="filteredAssets.length" class="overflow-x-auto">
            <table class="min-w-full bg-white border">
              <thead>
                <tr>
                  <th class="py-2 px-4 border-b">ID</th>
                  <th class="py-2 px-4 border-b">Name</th>
                  <th class="py-2 px-4 border-b">Type</th>
                  <th class="py-2 px-4 border-b">Current Value</th>
                  <th class="py-2 px-4 border-b">Purchase Price</th>
                  <th class="py-2 px-4 border-b">Category ID</th>
                  <th class="py-2 px-4 border-b">Current Price</th>
                  <th class="py-2 px-4 border-b">Calculated Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(asset, index) in filteredAssets" :key="index" class="cursor-pointer" @click="selectCrypto(asset.name.toLowerCase())">
                  <td class="py-2 px-4 border-b">{{ asset.id }}</td>
                  <td class="py-2 px-4 border-b">{{ asset.name }}</td>
                  <td class="py-2 px-4 border-b">{{ asset.type }}</td>
                  <td class="py-2 px-4 border-b">{{ asset.current_value }}</td>
                  <td class="py-2 px-4 border-b">{{ asset.purchase_price }}</td>
                  <td class="py-2 px-4 border-b">{{ asset.category_id }}</td>
                  <td class="py-2 px-4 border-b">
                    {{ latestPrices[asset.name.toLowerCase()] ? latestPrices[asset.name.toLowerCase()].toFixed(2) : 'Loading...' }}
                  </td>
                  <td class="py-2 px-4 border-b">
                    {{ calculateValue(asset.amount, asset.name.toLowerCase()).toFixed(2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>Geen assets gevonden.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Nobles />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#app'
import Aside from '~/components/Aside.vue'
import Header from '~/components/Header.vue'
import CryptoPrices from '~/components/CryptoPrices.vue'
import { useCategory } from '~/composables/useCategory'

const config = useRuntimeConfig()
const assets = ref([])
const selectedCrypto = ref(null)
const latestPrices = ref({})

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

const totalPrice = computed(() => {
  return assets.value.reduce((sum, asset) => {
    const currentPrice = latestPrices.value[asset.name.toLowerCase()] || 0
    return sum + (asset.amount * currentPrice)
  }, 0)
})

const selectCrypto = (cryptoName) => {
  selectedCrypto.value = cryptoName
}

const updateLatestPrice = (price) => {
  latestPrices.value[selectedCrypto.value] = price
}

const calculateValue = (amount, cryptoName) => {
  const currentPrice = latestPrices.value[cryptoName] || 0
  return amount * currentPrice
}

onMounted(() => {
  getAssets()
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.top-row {
  display: flex;
  width: 100%;
}

.left-top {
  width: 25%;
  padding: 1rem;
}

.right-top {
  width: 75%;
  padding: 1rem;
}

.bottom-row {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}

.asset-card {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .asset-card {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .asset-card {
    width: 33.33%;
  }
}
</style>