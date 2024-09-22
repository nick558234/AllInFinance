<template>
  <div>
    <h1>Bitcoin Price</h1>
    <p v-if="bitcoinPrice">Current Bitcoin Price: {{ bitcoinPrice }} USD</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const bitcoinPrice = ref(null)

const fetchBitcoinPrice = async () => {
  try {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    bitcoinPrice.value = response.data.bpi.USD.rate
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error)
  }
}

onMounted(() => {
  fetchBitcoinPrice()
})
</script>