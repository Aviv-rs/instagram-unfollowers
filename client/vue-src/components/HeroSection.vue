<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="text-gradient">Discover Who Unfollowed You</span> on Instagram
        </h1>
        <p class="hero-description">
          Our privacy-focused tool processes your Instagram data file locally to identify
          unfollowers without sharing your information. Simply upload your data export and
          get immediate insights into your follower relationships.
        </p>
        <div class="hero-actions">
          <a href="#upload-section" class="btn btn-primary btn-lg">
            Get Started
          </a>
          <a href="#faq-section" class="btn btn-secondary btn-lg">
            Learn More
          </a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-image-container">
          <div class="hero-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
              <rect width="400" height="300" fill="var(--main-2)" />
              <text x="50%" y="50%" font-size="24" fill="var(--main-6)" text-anchor="middle">
                Demo Video
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No additional script logic needed
</script>

<style lang="scss">
.hero {
  padding: var(--spacing-2xl) 0;
  background: linear-gradient(to bottom, var(--main-1), var(--main-0));
}

.hero-container {
  @include flex-row;
  gap: var(--spacing-2xl);
  
  @media (max-width: $breakpoint-lg) {
    @include flex-column;
    align-items: center;
  }
}

.hero-content {
  flex: 1;
  
  @media (max-width: $breakpoint-lg) {
    text-align: center;
    max-width: 600px;
  }
}

.hero-title {
  font-size: var(--font-size-4xl);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
  
  @media (max-width: $breakpoint-md) {
    font-size: var(--font-size-3xl);
  }
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: $breakpoint-md) {
    font-size: var(--font-size-md);
  }
}

.hero-actions {
  @include flex-row;
  gap: var(--spacing-md);
  
  @media (max-width: $breakpoint-md) {
    @include flex-column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
}

.hero-visual {
  flex: 1;
  @include flex-center;
}

.hero-image-container {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 4 / 3;
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.hero-placeholder {
  width: 100%;
  height: 100%;
  @include flex-center;
  background-color: var(--main-2);
}
</style>