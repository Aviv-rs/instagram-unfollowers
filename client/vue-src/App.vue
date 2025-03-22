<template>
  <div class="app">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

onMounted(() => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDarkScheme) {
    document.body.classList.add('dark-theme')
  }
})
</script>

<style lang="scss">
@import './assets/styles/reset.scss';
@import './assets/styles/variables.scss';
@import './assets/styles/global.scss';

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>