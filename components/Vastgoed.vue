<template>
  <div>
    <h1 class="text-4xl font-semibold">{{ cryptoName  }}</h1>

    <h2>Real Estate Prices</h2>
    <div  v-if="chartData">
    <line-chart :chart-data="chartData" :options="chartOptions"></line-chart>
</div>
    <p v-else>Loading...</p>
    <!-- <ul v-if="properties.length">
      <li v-for="(property, index) in properties" :key="index">
        <strong>{{ property.date }}</strong><br>
        High: €{{ property.high }}
      </li>
    </ul> -->
    <p v-else>No properties found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

const props = defineProps({
  cryptoName: {
    type: Object,
    required: true
  }
})

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// Reactive references for storing property data and chart data
const properties = ref([]);
const chartData = ref(null);
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date'
      },
      ticks: {
        callback: function(value, index, values) {
          const date = new Date(values[index].value);
          return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
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
});

// Get today's date formatted as YYYY-MM-DD
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(today.getDate()).padStart(2, '0');
const endDate = `${year}-${month}-${day}`; // Current date

// Calculate the start date (30 days ago)
const startDate = new Date(today);
startDate.setDate(today.getDate() - 30);
const startYear = startDate.getFullYear();
const startMonth = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const startDay = String(startDate.getDate()).padStart(2, '0');
const formattedStartDate = `${startYear}-${startMonth}-${startDay}`;

const generateRandomData = () => {
  const now = new Date();
  const prices = Array.from({ length: 30 }, (_, i) => ({
    x: new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000),
    y: (Math.random() * 100).toFixed(2)
  }));
  return {
    labels: prices.map(price => price.x),
    datasets: [
      {
        label: 'Random High Price in EUR',
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }
    ]
  };
};

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/REIT/range/1/day/${formattedStartDate}/${endDate}`, {
      params: {
        adjusted: true,
        sort: 'asc',
        apiKey: '5vueL20lbu02HyqKApEljBC8lgNZbVZH'
      }
    });

    // Process and store the results
    properties.value = response.data.results.slice(-30).map(item => ({
      date: new Date(item.t).toLocaleDateString(), // Convert timestamp to human-readable date
      high: item.h
    }));

    const prices = properties.value.map(item => ({
      x: new Date(item.date),
      y: item.high
    }));

    chartData.value = {
      labels: prices.map(price => price.x),
      datasets: [
        {
          label: 'REIT High Price in EUR',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true
        }
      ]
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    chartData.value = generateRandomData();
  }
});
</script>