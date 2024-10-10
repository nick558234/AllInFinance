<template>
  <div class="container mx-auto">
    <!-- Header -->
    <header class="flex flex-wrap justify-between items-center py-4 bg-[#2C83EC] px-8">
      <div class="logo font-bold text-lg">AllInFinance</div>
      <nav class="w-full md:w-auto">
        <ul class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0">
          <li><a href="#" class="hover:underline">Home</a></li>
          <li><a href="#" class="hover:underline">Services</a></li>
          <li><a href="#" class="hover:underline">About Us</a></li>
          <li><a href="#" class="hover:underline">Contact</a></li>
          <li><a href="/login" class="hover:underline">Login</a></li>
        </ul>
      </nav>
    </header>

    <!-- Main Section -->
    <section class="flex flex-wrap justify-between items-start my-12 px-8">
      <div class="w-full md:w-1/2 mb-8 md:mb-0">
        <h1 class="font-bold text-2xl mb-4">Welcome to AllInFinance</h1>
        <p class="text-gray-700">
          AllInFinance is your go-to source for the latest financial news, market analysis, and investment tips. Stay
          informed with our expert insights and make smarter financial decisions.
        </p>
      </div>
      <div class="w-full md:w-1/3 bg-gray-200 h-48 flex items-center justify-center">
        <img class="w-full h-full object-contain"
          src="data:image/jpeg;base64,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"
          alt="AllInFinance Logo">
      </div>
    </section>

    <!-- What We Offer Section -->
    <section class="my-12 px-8">
      <h2 class="font-bold text-xl mb-4">What We Offer</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Market Analysis</h3>
          <p class="text-gray-700">Get the latest market trends and analysis from our team of experts.</p>
        </div>
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Investment Tips</h3>
          <p class="text-gray-700">Discover investment opportunities and strategies to grow your wealth.</p>
        </div>
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Financial News</h3>
          <p class="text-gray-700">Stay updated with the latest financial news and events around the world.</p>
        </div>
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Portfolio Management</h3>
          <p class="text-gray-700">Manage your investment portfolio with our advanced tools and insights.</p>
        </div>
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Retirement Planning</h3>
          <p class="text-gray-700">Plan for your retirement with our comprehensive guides and resources.</p>
        </div>
        <div class="bg-gray-200 h-32 p-4">
          <h3 class="font-bold text-lg mb-2">Tax Advice</h3>
          <p class="text-gray-700">Get expert tax advice to maximize your returns and minimize liabilities.</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="my-12 px-8">
      <h2 class="font-bold text-xl mb-4">About Us</h2>
      <div class="flex flex-wrap justify-between items-start">
        <div class="w-full md:w-1/2 mb-8 md:mb-0">
          <h3 class="font-bold text-lg mb-2">Our Mission</h3>
          <p class="text-gray-700">
            At AllInFinance, our mission is to empower individuals with the knowledge and tools they need to achieve
            financial success. We believe that informed decisions lead to better financial outcomes.
          </p>
        </div>
        <div class="w-full md:w-1/3 h-48 flex items-center justify-center">
          <img
            src="https://wp.globaluniversitysystems.com/bsbi/wp-content/uploads/sites/2/2021/12/7-very-good-reasons-to-do-master-s-in-finance.jpg"
            alt="Our Mission" class="w-full h-full object-cover">
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="my-12 px-8">
      <h2 class="font-bold text-xl mb-4">Our Partners</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div class="flex items-center justify-center">
          <img
            src="https://iq.wiki/cdn-cgi/image/width=640,format=auto,quality=95/https://ipfs.everipedia.org/ipfs/QmYcnHzqH75MZY2DUrgaUwQQB7VGaJfvKSH8johcM7w4DP"
            alt="Partner 1" class="w-full">
        </div>
        <div class="flex items-center justify-center">
          <img
            src="https://metalpriceapi.com/assets/logo-dark-b4271658d08b5c510c2204a516115f6707c329150d4ccc483ba70d0d9830b35a.png"
            alt="Partner 2">
        </div>
        <div class="flex items-center justify-center h-full">
          <img src="https://raise.uniroma1.it/wp-content/uploads/2024/02/image.png" alt="Partner 3" class="h-16">
        </div>
        <div class="bg-gray-200 h-24 flex items-center justify-center">
          <img src="https://via.placeholder.com/100" alt="Partner 4" class="h-16">
        </div>
        <div class="bg-gray-200 h-24 flex items-center justify-center">
          <img src="https://via.placeholder.com/100" alt="Partner 5" class="h-16">
        </div>
        <div class="bg-gray-200 h-24 flex items-center justify-center">
          <img src="https://via.placeholder.com/100" alt="Partner 6" class="h-16">
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic required yet.
</script>

<style scoped>
/* Custom styling if needed */
</style>