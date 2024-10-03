<template>
  <header class="flex justify-between items-center py-4 bg-[#2C83EC] px-8">
    <div class="logo font-bold text-lg">AllInFinance</div>
    <nav>
      <ul class="flex space-x-8">
        <li><a href="#" class="hover:underline">Home</a></li>
        <li><a href="#" class="hover:underline">Services</a></li>
        <li><a href="#" class="hover:underline">About Us</a></li>
        <li><a href="#" class="hover:underline">Contact</a></li>
        <li><a href="/login" class="hover:underline">Login</a></li>
      </ul>
    </nav>
  </header>
  <div class="flex justify-center items-center min-h-screen">
    <div class="bg-[#d4e9fe] p-8 rounded-lg shadow-lg w-80">
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
          <input 
            type="text" 
            id="email" 
            v-model="email" 
            placeholder="Email" 
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Password"
            class="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button 
            type="submit" 
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2C83EC] hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = () => {
  const validEmail = 'admin'
  const validPassword = 'password'

  if (email.value === validEmail && password.value === validPassword) {
    router.push('/dashboard')
  } else {
    alert('Invalid credentials')
  }
}
</script>