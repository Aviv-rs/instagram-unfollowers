<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <h2 class="not-found-subtitle">Page Not Found</h2>
      <p class="not-found-text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="not-found-actions">
        <router-link to="/" class="btn btn-primary">
          Go Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px); // Account for header and footer
  padding: var(--spacing-xl);
  text-align: center;
}

.not-found-content {
  max-width: 500px;
}

.not-found-title {
  font-size: 8rem;
  font-weight: 700;
  color: var(--main-5);
  margin-bottom: var(--spacing-md);
  line-height: 1;
}

.not-found-subtitle {
  font-size: var(--font-size-3xl);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
}

.not-found-text {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.not-found-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}
</style>