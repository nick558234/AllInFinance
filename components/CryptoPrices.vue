<template>
  <div>
    <h1 class="text-4xl font-semibold">{{ cryptoName }}</h1>
    <p v-if="latestPrice">Latest Price: €{{ latestPrice.toFixed(2) }} EUR</p>
    <div
      v-if="chartData"
      :class="[
        'p-4 rounded-lg shadow-md',
        isGoodToBuy
          ? 'bg-green-100 border-green-800 border-2'
          : 'bg-red-100 border-red-800 border-2',
      ]"
    >
      <p
        v-if="isMarketCrashing"
        class="text-red-600 font-bold flex items-center"
      >
        <i class="fas fa-exclamation-triangle mr-2"></i> Market is crashing!
      </p>
      <p
        v-else-if="isGoodToBuy"
        class="text-green-600 font-bold flex items-center"
      >
        <i class="fas fa-thumbs-up mr-2"></i> Good time to buy!
      </p>
      <p v-else class="text-red-600 font-bold flex items-center">
        <i class="fas fa-thumbs-down mr-2"></i> Not a good time to buy.
      </p>
      <p v-if="isGoodToBuy" class="text-gray-700">
        The current price is lower than the average price of the last 3 days,
        indicating a potential buying opportunity.
      </p>
      <p v-else class="text-gray-700">
        The current price is higher than the average price of the last 3 days,
        indicating it may not be a good time to buy.
      </p>
      <p v-if="isMarketCrashing" class="mt-2 text-gray-700">
        The price has dropped more than 20% in the last day, indicating a market
        crash.
      </p>
    </div>
    <line-chart
      class="pb-8"
      v-if="chartData"
      :chart-data="chartData"
      :options="chartOptions"
    ></line-chart>
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const props = defineProps({
  cryptoName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:latestPrice"]);

const chartData = ref(null);
const latestPrice = ref(null);
const isGoodToBuy = ref(false);
const isMarketCrashing = ref(false);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
      ticks: {
        callback: function (value, index, values) {
          const date = new Date(values[index].value);
          return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
          });
        },
      },
    },
    y: {
      title: {
        display: true,
        text: "Price (EUR)",
      },
    },
  },
});
const cache = new Map();

const analyzeData = (prices) => {
  if (prices.length < 2) {
    isGoodToBuy.value = false;
    isMarketCrashing.value = false;
    return;
  }

  // Simple analysis: if the latest price is lower than the average price of the last 3 days, it's a good time to buy
  const averagePrice =
    prices.reduce((sum, price) => sum + price.y, 0) / prices.length;
  isGoodToBuy.value = latestPrice.value < averagePrice;

  // Check if the market is crashing: if the price has dropped more than 20% in the last day
  const latestPriceValue = prices[prices.length - 1].y;
  const previousPrice = prices[prices.length - 2].y;
  const priceDrop = ((previousPrice - latestPriceValue) / previousPrice) * 100;
  isMarketCrashing.value = priceDrop > 20;
};

const fetchCryptoPrice = async (cryptoName) => {
  if (cache.has(cryptoName)) {
    const cachedData = cache.get(cryptoName);
    chartData.value = cachedData.chartData;
    latestPrice.value = cachedData.latestPrice;
    analyzeData(cachedData.chartData.datasets[0].data);
    emit("update:latestPrice", latestPrice.value);
    return;
  }

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${cryptoName}/market_chart`,
      {
        params: {
          vs_currency: "eur",
          days: "3",
        },
      }
    );
    const prices = response.data.prices.map((price) => ({
      x: new Date(price[0]),
      y: price[1],
    }));
    const data = {
      labels: prices.map((price) => price.x),
      datasets: [
        {
          label: `${
            cryptoName.charAt(0).toUpperCase() + cryptoName.slice(1)
          } Price in EUR`,
          data: prices,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
    chartData.value = data;
    latestPrice.value = prices[prices.length - 1].y;
    analyzeData(prices);
    emit("update:latestPrice", latestPrice.value);
    cache.set(cryptoName, { chartData: data, latestPrice: latestPrice.value }); // Store in cache
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.warn(`Rate limit exceeded for ${cryptoName}. Using cached data.`);
      if (cache.has(cryptoName)) {
        const cachedData = cache.get(cryptoName);
        chartData.value = cachedData.chartData;
        latestPrice.value = cachedData.latestPrice;
        analyzeData(cachedData.chartData.datasets[0].data);
        emit("update:latestPrice", latestPrice.value);
      } else {
        console.error(`No cached data available for ${cryptoName}`);
      }
    } else {
      console.error(`Error fetching ${cryptoName} price:`, error);
    }
  }
};

watch(
  () => props.cryptoName,
  (newCryptoName) => {
    fetchCryptoPrice(newCryptoName);
  }
);

onMounted(() => {
  fetchCryptoPrice(props.cryptoName);
});
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
