<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-text">Oops! The page you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary not-found-btn">
        Go back to home
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this component
</script>

<style lang="scss">
.not-found-container {
  @include flex-center;
  min-height: 80vh;
}

.not-found-content {
  @include flex-column;
  align-items: center;
  text-align: center;
  max-width: 600px;
  padding: var(--spacing-xl);
}

.not-found-title {
  @include gradient-text;
  font-size: 6rem;
  margin-bottom: var(--spacing-md);
}

.not-found-text {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
  color: var(--text-secondary);
}

.not-found-btn {
  margin-top: var(--spacing-md);
}
</style>