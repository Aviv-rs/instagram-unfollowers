<template>
  <section id="hero-section" class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Discover Who <span class="text-gradient">Unfollowed</span> You on Instagram
          </h1>
          <p class="hero-subtitle">
            Upload your Instagram data to get a comprehensive list of unfollowers, 
            with complete privacy - all analysis happens in your browser.
          </p>
          <div class="hero-actions">
            <a href="#upload-section" class="btn btn-primary btn-lg">
              Get Started
            </a>
            <a href="#faq-section" class="btn btn-outline btn-lg">
              Learn More
            </a>
          </div>
          <div class="hero-features">
            <div class="hero-feature">
              <div class="hero-feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div class="hero-feature-text">
                <h3>100% Privacy</h3>
                <p>All processing happens locally in your browser</p>
              </div>
            </div>
            <div class="hero-feature">
              <div class="hero-feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <div class="hero-feature-text">
                <h3>No Login Required</h3>
                <p>No need to share your Instagram credentials</p>
              </div>
            </div>
            <div class="hero-feature">
              <div class="hero-feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <div class="hero-feature-text">
                <h3>Works on All Devices</h3>
                <p>Track unfollowers on desktop, tablet, or mobile</p>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-image">
          <div class="hero-image-wrapper">
            <div class="hero-image-phone">
              <div class="phone-frame">
                <div class="phone-screen">
                  <div class="phone-app">
                    <div class="app-header">
                      <div class="app-header-icon"></div>
                      <div class="app-header-title"></div>
                    </div>
                    <div class="app-content">
                      <div class="app-card"></div>
                      <div class="app-card"></div>
                      <div class="app-card"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-background"></div>
  </section>
</template>

<style lang="scss">
.hero-section {
  padding: var(--spacing-3xl) 0;
  position: relative;
  overflow: hidden;
  
  @include tablet {
    padding: var(--spacing-2xl) 0;
  }
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, var(--main-1), var(--main-0));
  z-index: -1;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(var(--main-5-rgb), 0.1) 0%, rgba(var(--main-5-rgb), 0) 70%);
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(var(--main-7-rgb), 0.1) 0%, rgba(var(--main-7-rgb), 0) 70%);
    z-index: -1;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
  
  @include tablet {
    grid-template-columns: 1fr;
  }
}

.hero-text {
  @include tablet {
    text-align: center;
    order: 2;
  }
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: var(--spacing-lg);
  
  @include tablet {
    font-size: var(--font-size-4xl);
  }
  
  @include mobile {
    font-size: var(--font-size-3xl);
  }
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  max-width: 540px;
  
  @include tablet {
    font-size: var(--font-size-lg);
    margin-left: auto;
    margin-right: auto;
  }
  
  @include mobile {
    font-size: var(--font-size-md);
  }
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  
  @include mobile {
    flex-direction: column;
  }
  
  @include tablet {
    justify-content: center;
  }
}

.hero-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  
  @include tablet {
    justify-content: center;
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.hero-feature {
  display: flex;
  align-items: flex-start;
  
  @include tablet {
    justify-content: center;
    text-align: center;
    flex-direction: column;
    align-items: center;
  }
}

.hero-feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--main-2);
  color: var(--main-7);
  margin-right: var(--spacing-sm);
  flex-shrink: 0;
  
  @include tablet {
    margin-right: 0;
    margin-bottom: var(--spacing-xs);
  }
}

.hero-feature-text {
  h3 {
    font-size: var(--font-size-md);
    font-weight: 600;
    margin-bottom: var(--spacing-xs);
  }
  
  p {
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
  }
}

.hero-image {
  @include tablet {
    order: 1;
  }
}

.hero-image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  
  @include tablet {
    max-width: 400px;
    margin: 0 auto;
  }
}

.hero-image-phone {
  width: 100%;
  max-width: 300px;
}

.phone-frame {
  position: relative;
  width: 100%;
  padding-bottom: 200%;
  background: linear-gradient(to bottom right, var(--main-5), var(--main-7));
  border-radius: 24px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 12px;
    background-color: var(--main-0);
    border-radius: 6px;
    z-index: 1;
  }
}

.phone-screen {
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  background-color: var(--main-0);
  border-radius: 18px;
  overflow: hidden;
}

.phone-app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--main-2);
}

.app-header-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(to bottom right, var(--main-5), var(--main-7));
  margin-right: 12px;
}

.app-header-title {
  width: 120px;
  height: 16px;
  background-color: var(--main-2);
  border-radius: 4px;
}

.app-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.app-card {
  width: 100%;
  height: 80px;
  background-color: var(--main-1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 16px;
    left: 16px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--main-2);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 80px;
    width: 120px;
    height: 16px;
    border-radius: 4px;
    background-color: var(--main-2);
  }
}
</style>