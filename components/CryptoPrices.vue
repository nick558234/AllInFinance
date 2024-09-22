<template>
  <div>
    <h1>{{ cryptoName | capitalize }} Price</h1>
    <p v-if="cryptoPrice">Current {{ cryptoName | capitalize }} Price: {{ cryptoPrice }} EUR</p>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  cryptoName: {
    type: String,
    required: true
  }
})

const cryptoPrice = ref(null)

const fetchCryptoPrice = async (cryptoName) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: cryptoName,
        vs_currencies: 'eur'
      }
    })
    cryptoPrice.value = response.data[cryptoName].eur
  } catch (error) {
    console.error(`Error fetching ${cryptoName} price:`, error)
  }
}

watch(() => props.cryptoName, (newCryptoName) => {
  fetchCryptoPrice(newCryptoName)
})

onMounted(() => {
  fetchCryptoPrice(props.cryptoName)
})
</script>

<script>
export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>