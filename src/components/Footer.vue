<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-content">
        <div class="footer-logo">
          <h2 class="footer-logo-text ltr">Unfollower<span class="text-gradient">Track</span></h2>
          <p class="footer-tagline">{{ $t('app.description') }}</p>
        </div>
        
        <div class="footer-links">
          <div class="footer-links-column">
            <h3 class="footer-links-title">{{ $t('nav.home') }}</h3>
            <ul class="footer-links-list">
              <li><a href="#hero-section">{{ $t('nav.home') }}</a></li>
              <li><a href="#upload-section">{{ $t('nav.upload') }}</a></li>
              <li><a href="#faq-section">{{ $t('nav.faq') }}</a></li>
            </ul>
          </div>
          
          <!-- <div class="footer-links-column">
            <h3 class="footer-links-title">{{ $t('footer.links.title') }}</h3>
            <ul class="footer-links-list">
              <li><a href="#faq-section">{{ $t('footer.links.privacy') }}</a></li>
              <li><a href="#faq-section">{{ $t('footer.links.terms') }}</a></li>
              <li><a href="#faq-section">{{ $t('footer.links.contact') }}</a></li>
            </ul>
          </div> -->
        </div>
      </div>
      
      <div class="footer-bottom">
        <p class="footer-copyright">
          {{ $t('footer.copyright', { year: currentYear }) }}
        </p>
        <p class="footer-privacy">
          {{ $t('footer.privacy') }}
        </p>
        <p class="footer-disclaimer">
          {{ $t('footer.disclaimer') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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