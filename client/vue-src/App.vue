<template>
  <div class="app">
    <NavBar />
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

// Transition animations
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>