<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <div class="navbar-logo">
        <router-link to="/" class="logo-link">
          <span class="logo-text ltr">Unfollower<span class="text-gradient">Track</span></span>
        </router-link>
      </div>
      
      <div class="navbar-menu" :class="{ 'active': isMenuOpen }">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="#hero-section" class="nav-link" @click="closeMenu">{{ $t('nav.home') }}</a>
          </li>
          <li class="nav-item">
            <a href="#upload-section" class="nav-link" @click="closeMenu">{{ $t('nav.upload') }}</a>
          </li>
          <li class="nav-item">
            <a href="#faq-section" class="nav-link" @click="closeMenu">{{ $t('nav.faq') }}</a>
          </li>
          <li class="nav-item">
            <a href="#about-section" class="nav-link" @click="closeMenu">{{ $t('nav.about') }}</a>
          </li>
        </ul>
      </div>
      
      <div class="navbar-actions gap-2">
        <LanguageSwitcher class="language-switcher" />
        
        <button 
          class="theme-toggle"
          @click="toggleTheme"
          :aria-label="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
        >
          <svg v-if="isDarkTheme" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        
        <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
          <span class="menu-toggle-line"></span>
          <span class="menu-toggle-line"></span>
          <span class="menu-toggle-line"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const isMenuOpen = ref(false)
const isDarkTheme = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  document.documentElement.setAttribute('data-theme', isDarkTheme.value ? 'dark' : 'light')
  
  // Optional: Save theme preference to localStorage
  localStorage.setItem('theme', isDarkTheme.value ? 'dark' : 'light')
}

// Handle clicks outside the menu
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (isMenuOpen.value && !target.closest('.navbar-menu') && !target.closest('.menu-toggle')) {
    closeMenu()
  }
}

// Smooth scroll to sections when clicking nav links
const handleNavLinkClick = (event: Event) => {
  const target = event.target as HTMLAnchorElement
  const href = target.getAttribute('href')
  
  if (href && href.startsWith('#')) {
    event.preventDefault()
    const element = document.querySelector(href)
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      })
    }
    
    if (isMenuOpen.value) {
      closeMenu()
    }
  }
}

onMounted(() => {
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDarkTheme.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
  
  // Add click outside event listener
  document.addEventListener('click', handleClickOutside)
  
  // Add event listeners to nav links
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavLinkClick)
  })
})

onUnmounted(() => {
  // Remove event listeners
  document.removeEventListener('click', handleClickOutside)
  
  const navLinks = document.querySelectorAll('.nav-link')
  navLinks.forEach(link => {
    link.removeEventListener('click', handleNavLinkClick)
  })
})
</script>

<style lang="scss">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: var(--main-0);
  box-shadow: var(--shadow-sm);
  z-index: 100;
}

.navbar-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  .logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  
  .logo-text {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--text-primary);
  }
}

.navbar-menu {
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--main-0);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.active {
      transform: translateX(0);
    }
  }
}

.navbar-nav {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
}

.nav-item {
  margin: 0 var(--spacing-sm);
  
  @media (max-width: 768px) {
    margin: var(--spacing-sm) 0;
    width: 100%;
    text-align: center;
  }
}

.nav-link {
  font-size: var(--font-size-md);
  font-weight: 500;
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: background-color 0.2s ease, color 0.2s ease;
  
  &:hover {
    background-color: var(--main-1);
    color: var(--main-7);
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: var(--spacing-md);
    font-size: var(--font-size-lg);
  }
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: var(--main-1);
  }
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: var(--spacing-md);
  
  @media (max-width: 768px) {
    display: flex;
  }
}

.menu-toggle-line {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all 0.3s ease;
}
</style>