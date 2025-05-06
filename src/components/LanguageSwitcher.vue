<template>
  <div class="language-switcher">
    <button
      class="language-btn"
      :class="{ active: currentLocale === 'en' }"
      @click="changeLocale('en')"
    >
      EN
    </button>
    <button
      class="language-btn"
      :class="{ active: currentLocale === 'he' }"
      @click="changeLocale('he')"
    >
      עברית
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)

// Load saved language preference on component mount
onMounted(() => {
  const savedLocale = localStorage.getItem('language')
  if (savedLocale) {
    changeLocale(savedLocale)
  }
})

const changeLocale = (newLocale: string) => {
  locale.value = newLocale
  document.documentElement.lang = newLocale
  document.documentElement.dir = newLocale === 'he' ? 'rtl' : 'ltr'
  localStorage.setItem('language', newLocale)
  if (typeof window !== 'undefined') {
    window.nl_lang = newLocale
    reloadAccessibilityWidget()
  }
}

const reloadAccessibilityWidget = () => {
  // Remove the old script
  const oldScript = document.querySelector('script[src*="nagishli.js"]');
  if (oldScript) oldScript.remove();

  // Remove the old widget UI (adjust selector as needed)
  const nagishliRoot = document.getElementById('NagishLiTag');
  if (nagishliRoot) nagishliRoot.remove();

  // You may need to remove other elements/classes if the widget uses them
  // document.querySelectorAll('.nagishli-widget').forEach(el => el.remove());

  // Add the script again
  const script = document.createElement('script');
  script.src = "https://aviv-rs.github.io/instagram-unfollowers/accessibility/nagishli.js?v=2.3";
  script.charset = "utf-8";
  script.defer = true;
  document.body.appendChild(script);
};

// Add this to declare nl_lang on the Window type
// @ts-ignore
declare global {
  interface Window {
    nl_lang?: string;
  }
}
</script>

<style lang="scss">
.language-switcher {
  display: flex;
  gap: var(--spacing-xs);
  align-items: center;
}

.language-btn {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--main-3);
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-normal) var(--transition-timing);
  font-size: var(--font-size-sm);
  
  &:hover {
    background: var(--main-2);
  }
  
  &.active {
    background: var(--main-5);
    color: var(--text-inverted);
    border-color: var(--main-5);
  }
}
</style> 