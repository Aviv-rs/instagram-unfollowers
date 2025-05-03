<template>
  <section id="about-section" class="about-section">
    <div class="container">
      <h2 class="section-title">{{ t('about.title') }}</h2>
      <div class="about-content">
        <div class="about-grid">
          <div class="about-image">
            <img src="@/assets/about-picture.png" alt="Profile picture" class="profile-image" />
          </div>
          <div class="about-text">
            <p class="about-description">{{ t('about.description') }}</p>
            <div class="social-section">
              <h3 class="connect-title">{{ t('about.connect') }}</h3>
              <div class="social-links">
                <a v-for="(link, index) in socialLinks" 
                   :key="index" 
                   :href="link.url" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="social-link">
                  <i :class="link.icon"></i>
                  <span>{{ link.name }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { t } = useI18n()

const socialLinks = computed(() => [
  {
    name: t('about.socials.instagram'),
    url: 'https://www.instagram.com/aviv_rs/',
    icon: 'fab fa-instagram'
  },
  {
    name: t('about.socials.linkedin'),
    url: 'https://www.linkedin.com/in/aviv-roas-3b1b55229/',
    icon: 'fab fa-linkedin'
  }
])
</script>

<style lang="scss" scoped>
.about-section {
  padding-block: var(--spacing-xl);
  background-color: var(--main-0);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.section-title {
  font-size: var(--font-size-xxl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.about-content {
  background-color: var(--main-1);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--main-2);
  box-shadow: var(--shadow-lg);
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.about-description {
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--text-secondary);
}

.social-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.connect-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

.social-links {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--main-2);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    transform: translateY(-2px);
    background-color: var(--main-3);
    box-shadow: var(--shadow-lg);
  }

  i {
    font-size: var(--font-size-lg);
  }
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: 300px 1fr;
    gap: var(--spacing-xxl);
  }

  .about-image {
    justify-content: flex-start;
  }

  .social-links {
    justify-content: flex-start;
  }

  .connect-title {
    text-align: left;
    width: fit-content;
  }
}

@media (max-width: 767px) {
  .about-section {
    padding: var(--spacing-xl) 0;
  }

  .about-content {
    padding: var(--spacing-lg);
  }

  .section-title {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-lg);
  }

  .about-description {
    font-size: var(--font-size-md);
  }

  .profile-image {
    width: 200px;
    height: 200px;
  }

  .social-links {
    gap: var(--spacing-sm);
  }

  .social-link {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-sm);
  }
}
</style> 