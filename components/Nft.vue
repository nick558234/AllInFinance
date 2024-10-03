<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold mb-4">NFT Collection</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="nft in nfts" :key="nft.id" class="bg-white p-4 rounded-lg shadow-lg">
        <img :src="nft.image_url" alt="NFT Image" class="w-full h-48 object-cover mb-4 rounded-lg">
        <h2 class="text-lg font-semibold">{{ nft.name }}</h2>
        <p class="text-gray-700">{{ nft.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const nfts = ref([])
const loading = ref(true)

const fetchNfts = async () => {
  try {
    const response = await axios.get('https://api.opensea.io/api/v2/chain/amoy/contract/address/nfts/identifier', {
      headers: {
        accept: 'application/json',
        'x-api-key': 'c13df43d69b84fd999bc04dc5a943347'  // Replace with your actual API key
      }
    })
    nfts.value = response.data.assets
  } catch (error) {
    console.error('Error fetching NFTs:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNfts()
})
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>