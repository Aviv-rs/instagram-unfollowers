<template>
  <header class="navbar">
    <div class="container navbar-container">
      <router-link to="/" class="navbar-logo">
        <span class="text-gradient">Unfollower Tracker</span>
      </router-link>
      <nav class="navbar-nav">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          class="navbar-link"
        >
          GitHub
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// No additional script logic needed
</script>

<style lang="scss">
.navbar {
  padding: var(--spacing-md) 0;
  background-color: var(--main-0);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  @include flex-between;
}

.navbar-logo {
  font-size: var(--font-size-xl);
  font-weight: 700;
  text-decoration: none;
}

.navbar-nav {
  @include flex-row;
  gap: var(--spacing-md);
}

.navbar-link {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-md);
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--main-1);
  }
}
</style>