<template>
  <div>
    <h1 class="text-4xl font-semibold">{{ cryptoName  }}</h1>
    <p v-if="latestPrice">Latest Price: €{{ latestPrice }} EUR</p>
    <line-chart v-if="chartData" :chart-data="chartData" :options="chartOptions"></line-chart>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import axios from 'axios'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
  cryptoName: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:latestPrice'])

const chartData = ref(null)
const latestPrice = ref(null)
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time'
      },
      ticks: {
        callback: function(value, index, values) {
          const date = new Date(values[index].value)
          return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
        }
      }
    },
    y: {
      title: {
        display: true,
        text: 'Price (EUR)'
      }
    }
  }
})
const cache = new Map()

const fetchCryptoPrice = async (cryptoName) => {
  if (cache.has(cryptoName)) {
    const cachedData = cache.get(cryptoName)
    chartData.value = cachedData.chartData
    latestPrice.value = cachedData.latestPrice
    emit('update:latestPrice', latestPrice.value)
    return
  }

  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart`, {
      params: {
        vs_currency: 'eur',
        days: '3'
      }
    })
    const prices = response.data.prices.map(price => ({
      x: new Date(price[0]),
      y: price[1]
    }))
    const data = {
      labels: prices.map(price => price.x),
      datasets: [
        {
          label: `${cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1)} Price in EUR`,
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    }
    chartData.value = data
    latestPrice.value = prices[prices.length - 1].y
    emit('update:latestPrice', latestPrice.value)
    cache.set(cryptoName, { chartData: data, latestPrice: latestPrice.value })  // Store in cache
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn(`Rate limit exceeded for ${cryptoName}. Using cached data.`)
      if (cache.has(cryptoName)) {
        const cachedData = cache.get(cryptoName)
        chartData.value = cachedData.chartData
        latestPrice.value = cachedData.latestPrice
        emit('update:latestPrice', latestPrice.value)
      } else {
        console.error(`No cached data available for ${cryptoName}`)
      }
    } else {
      console.error(`Error fetching ${cryptoName} price:`, error)
    }
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

<style scoped>
.chart-container {
  width: 300px;
  height: 300px;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>