<template>
  <div>
    <h2>Metal Prices</h2>
    <p v-if="goldPrice !== null">Current Gold Price (XAU to EUR): {{ goldPrice.toFixed(2) }} EUR</p>
    <p v-if="silverPrice !== null">Current Silver Price (XAG to EUR): {{ silverPrice.toFixed(2) }} EUR</p>
    <p v-if="platinumPrice !== null">Current Platinum Price (XPT to EUR): {{ platinumPrice.toFixed(2) }} EUR</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const goldPrice = ref(null)
const silverPrice = ref(null)
const platinumPrice = ref(null)

const fetchMetalPrices = async () => {
  try {
    const response = await axios.get('https://api.metalpriceapi.com/v1/latest', {
      params: {
        api_key: '08dbdf40f26b1408208aa0584a9e6bf6',  
        base: 'XAU', // Base metal
        currencies: 'EUR,XAG,XPT' // Get the prices in EUR, Silver, and Platinum
      }
    })
    
    if (response.data && response.data.rates) {
      goldPrice.value = response.data.rates.EUR // Price for gold in EUR
      silverPrice.value = response.data.rates.XAG // Price for silver in EUR
      platinumPrice.value = response.data.rates.XPT // Price for platinum in EUR
    } else {
      console.error('No results found for metal prices.')
      goldPrice.value = null
      silverPrice.value = null
      platinumPrice.value = null
    }
  } catch (error) {
    console.error('Error fetching metal prices:', error)
    goldPrice.value = null
    silverPrice.value = null
    platinumPrice.value = null
  }
}

onMounted(() => {
  fetchMetalPrices()
})
</script>