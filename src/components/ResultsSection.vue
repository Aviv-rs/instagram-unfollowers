<template>
  <section id="results-section" class="results-section">
    <div class="container">
      <h2 class="section-title text-center">
        <span class="text-gradient">{{ $t('results.title') }}</span>
      </h2>
      
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-value">{{ instagramData.followersCount }}</div>
          <div class="stat-label">{{ $t('results.stats.followers') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ instagramData.followingCount }}</div>
          <div class="stat-label">{{ $t('results.stats.following') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ youDontFollowBack.length }}</div>
          <div class="stat-label">{{ $t('results.stats.youDontFollowBack') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ notFollowingBack.length }}</div>
          <div class="stat-label">{{ $t('results.stats.notFollowingBack') }}</div>
        </div>
      </div>
      
      <div class="results-tabs">
        <div class="results-tabs-header">
          <button 
            class="tab-button" 
            :class="{ 'active': activeTab === 'youDontFollowBack' }"
            @click="$emit('setActiveTab', 'youDontFollowBack')"
          >
            {{ $t('results.tabs.youDontFollowBack') }}
          </button>
          <button 
            class="tab-button"
            :class="{ 'active': activeTab === 'notFollowingBack' }"
            @click="$emit('setActiveTab', 'notFollowingBack')"
          >
            {{ $t('results.tabs.notFollowingBack') }}
          </button>
          <button 
            class="tab-button"
            :class="{ 'active': activeTab === 'newFollowers' }"
            @click="$emit('setActiveTab', 'newFollowers')"
          >
            {{ $t('results.tabs.newFollowers') }}
          </button>
        </div>
        
        <div class="results-tabs-content">
          <!-- You Don't Follow Back Tab -->
          <div v-if="activeTab === 'youDontFollowBack'" class="tab-content">
            <div v-if="youDontFollowBack.length > 0" class="unfollowers-grid">
              <UnfollowerCard 
                v-for="user in youDontFollowBack" 
                :key="user.username" 
                :user="user" 
              />
            </div>
            <div v-else class="empty-state">
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 class="empty-title">{{ $t('results.empty.youDontFollowBack.title') }}</h3>
              <p class="empty-description">
                {{ $t('results.empty.youDontFollowBack.description') }}
              </p>
            </div>
          </div>
          
          <!-- Not Following Back Tab -->
          <div v-if="activeTab === 'notFollowingBack'" class="tab-content">
            <div v-if="notFollowingBack.length > 0" class="unfollowers-grid">
              <UnfollowerCard 
                v-for="user in notFollowingBack" 
                :key="user.username" 
                :user="user" 
              />
            </div>
            <div v-else class="empty-state">
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 class="empty-title">{{ $t('results.empty.notFollowingBack.title') }}</h3>
              <p class="empty-description">
                {{ $t('results.empty.notFollowingBack.description') }}
              </p>
            </div>
          </div>
          
          <!-- New Followers Tab -->
          <div v-if="activeTab === 'newFollowers'" class="tab-content">
            <div class="empty-state">
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 class="empty-title">{{ $t('results.empty.newFollowers.title') }}</h3>
              <p class="empty-description">
                {{ $t('results.empty.newFollowers.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UnfollowerCard from '@/components/UnfollowerCard.vue'
import type { InstagramData, Unfollower } from '@/types/instagram'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  instagramData: InstagramData
  youDontFollowBack: Unfollower[]
  notFollowingBack: Unfollower[]
  activeTab: 'youDontFollowBack' | 'notFollowingBack' | 'newFollowers'
}>()

defineEmits<{
  (e: 'setActiveTab', tab: 'youDontFollowBack' | 'notFollowingBack' | 'newFollowers'): void
}>()
</script>

<style lang="scss">
.results-section {
  padding: var(--spacing-3xl) 0;
  background-color: var(--main-1);
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
  
  @include tablet {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
  }
}

.stat-value {
  font-size: var(--font-size-4xl);
  font-weight: 700;
  color: var(--main-5);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  font-weight: 500;
}

.results-tabs {
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.results-tabs-header {
  display: flex;
  border-bottom: 1px solid var(--main-2);
  overflow-x: auto;
  
  @include mobile {
    flex-wrap: wrap;
  }
}

.tab-button {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-secondary);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  flex: 1;
  text-align: center;
  
  &:hover {
    color: var(--main-7);
  }
  
  &.active {
    color: var(--main-7);
    border-bottom-color: var(--main-7);
  }
  
  @include mobile {
    flex: 1 0 auto;
    min-width: 33.333%;
  }
}

.results-tabs-content {
  padding: var(--spacing-xl);
}

.tab-content {
  min-height: 300px;
}

.unfollowers-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  
  @include desktop {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
  padding: var(--spacing-xl);
}

.empty-icon {
  color: var(--main-3);
  margin-bottom: var(--spacing-md);
}

.empty-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.empty-description {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  max-width: 400px;
}
</style>