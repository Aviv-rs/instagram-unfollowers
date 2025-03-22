<template>
  <section id="results-section" class="results-section">
    <div class="container">
      <h2 class="section-title text-center">
        <span class="text-gradient">Your Instagram Insights</span>
      </h2>
      
      <div class="stats-cards">
        <div class="stat-card">
          <h3 class="stat-number">{{ instagramData.followersCount }}</h3>
          <p class="stat-label">Followers</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">{{ instagramData.followingCount }}</h3>
          <p class="stat-label">Following</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">{{ unfollowers.length }}</h3>
          <p class="stat-label">Unfollowers</p>
        </div>
        <div class="stat-card">
          <h3 class="stat-number">{{ notFollowingBack.length }}</h3>
          <p class="stat-label">Not Following Back</p>
        </div>
      </div>
      
      <div class="tabs">
        <button 
          class="tab" 
          :class="{ 'active': activeTab === 'unfollowers' }"
          @click="setActiveTab('unfollowers')"
        >
          Unfollowers
        </button>
        <button 
          class="tab" 
          :class="{ 'active': activeTab === 'notFollowingBack' }"
          @click="setActiveTab('notFollowingBack')"
        >
          Not Following Back
        </button>
      </div>
      
      <div class="user-cards" v-if="activeTab === 'unfollowers'">
        <template v-if="unfollowers.length > 0">
          <UnfollowerCard 
            v-for="user in unfollowers" 
            :key="user.username" 
            :user="user" 
          />
        </template>
        <div v-else class="empty-state">
          <p>No unfollowers found.</p>
        </div>
      </div>
      
      <div class="user-cards" v-if="activeTab === 'notFollowingBack'">
        <template v-if="notFollowingBack.length > 0">
          <UnfollowerCard 
            v-for="user in notFollowingBack" 
            :key="user.username" 
            :user="user" 
          />
        </template>
        <div v-else class="empty-state">
          <p>Everyone you follow is following you back!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import UnfollowerCard from './UnfollowerCard.vue'
import type { InstagramData, Unfollower } from '@/types/instagram'

const props = defineProps<{
  instagramData: InstagramData
  unfollowers: Unfollower[]
  notFollowingBack: Unfollower[]
  activeTab: "unfollowers" | "notFollowingBack" | "newFollowers"
}>()

const emit = defineEmits<{
  setActiveTab: [tab: "unfollowers" | "notFollowingBack" | "newFollowers"]
}>()

const setActiveTab = (tab: "unfollowers" | "notFollowingBack" | "newFollowers") => {
  emit('setActiveTab', tab)
}
</script>

<style lang="scss">
.results-section {
  padding: var(--spacing-2xl) 0;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  
  @media (max-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.stat-card {
  background-color: var(--main-0);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-lg);
  text-align: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  background: linear-gradient(to right, var(--main-6), var(--main-7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--main-3);
}

.tab {
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  font-weight: 600;
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, var(--main-6), var(--main-7));
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }
  
  &.active {
    color: var(--main-7);
    
    &::after {
      transform: scaleX(1);
    }
  }
  
  &:hover {
    color: var(--main-6);
  }
}

.user-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  
  @media (max-width: $breakpoint-sm) {
    grid-template-columns: 1fr;
  }
}

.empty-state {
  grid-column: 1 / -1;
  padding: var(--spacing-xl);
  text-align: center;
  background-color: var(--main-1);
  border-radius: var(--border-radius-md);
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  margin: var(--spacing-xl) 0;
}
</style>