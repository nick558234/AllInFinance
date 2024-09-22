<template>
  <div>
    <h1>{{ cryptoName | capitalize }} Price</h1>
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

const chartData = ref(null)
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Time'
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

const fetchCryptoPrice = async (cryptoName) => {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart`, {
      params: {
        vs_currency: 'eur',
        days: '7'
      }
    })
    const prices = response.data.prices.map(price => ({
      x: new Date(price[0]),
      y: price[1]
    }))
    chartData.value = {
      labels: prices.map(price => price.x),
      datasets: [
        {
          label: `${cryptoName | capitalize} Price in EUR`,
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    }
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