<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <div class="footer-logo">
          <h2 class="footer-logo-text">Unfollower<span class="text-gradient">Track</span></h2>
          <p class="footer-tagline">Track who unfollowed you on Instagram with privacy and ease.</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-column">
            <h3 class="footer-links-title">Navigation</h3>
            <ul class="footer-links-list">
              <li><a href="#hero-section">Home</a></li>
              <li><a href="#upload-section">Upload Data</a></li>
              <li><a href="#faq-section">FAQ</a></li>
            </ul>
          </div>
          
          <div class="footer-links-column">
            <h3 class="footer-links-title">Resources</h3>
            <ul class="footer-links-list">
              <li><a href="#faq-section">How it Works</a></li>
              <li><a href="#faq-section">Privacy Policy</a></li>
              <li><a href="#faq-section">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">
          &copy; {{ currentYear }} UnfollowerTrack. All rights reserved.
        </p>
        <p class="footer-privacy">
          Your data never leaves your browser. We respect your privacy.
        </p>
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
  padding: var(--spacing-xl) 0 var(--spacing-lg);
}

.footer-container {
  display: flex;
  flex-direction: column;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.footer-logo {
  max-width: 300px;
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-lg);
  }
}

.footer-logo-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.footer-tagline {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  line-height: 1.5;
}

.footer-links {
  display: flex;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
}

.footer-links-column {
  margin-left: var(--spacing-2xl);
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-right: var(--spacing-2xl);
  }
  
  @media (max-width: 480px) {
    margin-bottom: var(--spacing-lg);
  }
}

.footer-links-title {
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.footer-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: var(--spacing-sm);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--main-7);
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--main-3);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.footer-copyright, .footer-privacy {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-xs);
  }
}
</style>