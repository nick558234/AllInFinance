<template>
  <Line :data="chartData" :options="options" />
</template>

<script setup>
import { defineProps } from 'vue'
import { Line } from 'vue-chartjs'

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    required: true
  }
})
</script>