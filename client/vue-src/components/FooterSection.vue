<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} Unfollower Tracker. All rights reserved.</p>
        <p class="footer-disclaimer">
          This tool is not affiliated with, authorized, maintained, sponsored or endorsed by Instagram or any of its affiliates or subsidiaries.
        </p>
      </div>
      <div class="footer-links">
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms of Service</a>
        <a href="#" class="footer-link">Contact</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style lang="scss">
.footer {
  background-color: var(--main-1);
  padding: var(--spacing-xl) 0;
  margin-top: var(--spacing-2xl);
  border-top: 1px solid var(--main-2);
}

.footer-container {
  @include flex-between;
  flex-wrap: wrap;
  gap: var(--spacing-lg);
  
  @media (max-width: $breakpoint-md) {
    @include flex-column;
    align-items: center;
    text-align: center;
  }
}

.footer-content {
  max-width: 600px;
}

.footer-disclaimer {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: var(--spacing-xs);
}

.footer-links {
  @include flex-row;
  gap: var(--spacing-lg);
  
  @media (max-width: $breakpoint-md) {
    @include flex-column;
    gap: var(--spacing-md);
  }
}

.footer-link {
  color: var(--text-secondary);
  
  &:hover {
    color: var(--main-7);
  }
}
</style>