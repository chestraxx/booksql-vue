<template>
  <div id="app" class="font-sans antialiased text-black">
    <div id="nav" class="bg-purple-600 flex justify-center">
      <div class="container flex items-center justify-between py-4">
        <div>
          <a href="/">
            <img src="./assets/logo.svg" alt="logo" class="w-10" />
          </a>
        </div>

        <router-link to="/" class="text-white hover:text-gray-200">Home</router-link>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped></style>
