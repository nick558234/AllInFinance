<template>
  <div>
    <div class="flex h-screen">
      <Aside class="w-64" />
      <div class="flex flex-col flex-1">
        <Header class="w-full" />
        <div class="flex justify-center items-center flex-1 flex-col w-full h-full">
          <div>
            <button @click="setGood" class="bg-green-500 text-white px-6 py-3 rounded mr-4 text-xl">Good</button>
            <button @click="setBad" class="bg-red-500 text-white px-6 py-3 rounded text-xl">Bad</button>
          </div>
    
          <p class="text-4xl font-bold text-center">money {{ leaves.length }}</p>

          <div class="relative w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
              <!-- Tree trunk -->
              <rect x="590" y="400" width="30" height="400" fill="#8B4513" />
              <!-- Tree branches -->
              <circle cx="600" cy="300" r="150" fill="#228B22" />
              <circle cx="480" cy="380" r="120" fill="#228B22" />
              <circle cx="720" cy="380" r="120" fill="#228B22" />
              <!-- Money leaves -->
              <text v-for="(leaf, index) in leaves" :key="index" :x="leaf.x" :y="leaf.y" font-size="40" fill="green" :class="{'falling': isBad, 'spawning': isGood}">💵</text>
            </svg>
            <img v-if="isBad" src="public/fire.png" alt="Fire" class="absolute bottom-0 left-0 w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'

export default {
  components: {
    Aside,
    Header
  },
  setup() {
    const isGood = ref(false)
    const isBad = ref(false)
    const leaves = ref([])
    const maxLeaves = 50
    let leafInterval = null

    const generateLeafPosition = () => {
      // Generate coordinates inside the branches
      const positions = [
        { cx: 600, cy: 300, r: 150 },  // Top branch
        { cx: 480, cy: 380, r: 120 },  // Left branch
        { cx: 720, cy: 380, r: 120 }   // Right branch
      ]

      const branch = positions[Math.floor(Math.random() * positions.length)]
      let angle = Math.random() * 2 * Math.PI
      let radius = Math.random() * branch.r

      // Polar coordinates to Cartesian conversion
      const x = branch.cx + radius * Math.cos(angle)
      const y = branch.cy + radius * Math.sin(angle)

      return { x, y }
    }

    const addLeaf = () => {
      if (leaves.value.length < maxLeaves) {
        leaves.value.push(generateLeafPosition())
      } else {
        clearInterval(leafInterval) // Stop adding leaves when reaching max
      }
    }

    const setGood = () => {
      isGood.value = true
      isBad.value = false
      leaves.value = [] // Clear the leaves

      if (leafInterval) clearInterval(leafInterval) // Clear any previous intervals
      leafInterval = setInterval(addLeaf, 1000) // Add a new leaf every second
    }

    const setBad = () => {
      isGood.value = false
      isBad.value = true
      if (leafInterval) clearInterval(leafInterval) // Stop adding leaves
    }

    return {
      isGood,
      isBad,
      leaves,
      setGood,
      setBad
    }
  }
}
</script>

<style scoped>
@keyframes fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(600px);
    opacity: 0;
  }
}

@keyframes spawn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.falling {
  animation: fall 2s forwards;
}

.spawning {
  animation: spawn 2s forwards;
}
</style>
