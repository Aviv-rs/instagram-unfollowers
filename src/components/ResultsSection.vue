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
          <!-- Search Input -->
          <div class="search-container">
            <input
              type="text"
              v-model="searchQuery"
              :placeholder="$t('results.search.placeholder')"
              class="search-input"
            />
          </div>

          <!-- You Don't Follow Back Tab -->
          <div v-if="activeTab === 'youDontFollowBack'" class="tab-content">
            <div v-if="filteredYouDontFollowBack.length > 0" class="pagination pagination-top">
              <button 
                class="pagination-button" 
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
              >
                {{ $t('pagination.previous') }}
              </button>
              <span class="pagination-info">
                {{ $t('pagination.page', { current: currentPage, total: totalPages }) }}
              </span>
              <button 
                class="pagination-button" 
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)"
              >
                {{ $t('pagination.next') }}
              </button>
            </div>
            <div v-if="filteredYouDontFollowBack.length > 0" class="unfollowers-grid">
              <UnfollowerCard 
                v-for="user in paginatedYouDontFollowBack" 
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
              <h3 class="empty-title">{{ searchQuery ? $t('results.empty.search.title') : $t('results.empty.youDontFollowBack.title') }}</h3>
              <p class="empty-description">
                {{ searchQuery ? $t('results.empty.search.description') : $t('results.empty.youDontFollowBack.description') }}
              </p>
            </div>
            <div v-if="filteredYouDontFollowBack.length > 0" class="pagination pagination-bottom">
              <button 
                class="pagination-button" 
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
              >
                {{ $t('pagination.previous') }}
              </button>
              <span class="pagination-info">
                {{ $t('pagination.page', { current: currentPage, total: totalPages }) }}
              </span>
              <button 
                class="pagination-button" 
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)"
              >
                {{ $t('pagination.next') }}
              </button>
            </div>
          </div>
          
          <!-- Not Following Back Tab -->
          <div v-if="activeTab === 'notFollowingBack'" class="tab-content">
            <div v-if="filteredNotFollowingBack.length > 0" class="pagination pagination-top">
              <button 
                class="pagination-button" 
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
              >
                {{ $t('pagination.previous') }}
              </button>
              <span class="pagination-info">
                {{ $t('pagination.page', { current: currentPage, total: totalPages }) }}
              </span>
              <button 
                class="pagination-button" 
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)"
              >
                {{ $t('pagination.next') }}
              </button>
            </div>
            <div v-if="filteredNotFollowingBack.length > 0" class="unfollowers-grid">
              <UnfollowerCard 
                v-for="user in paginatedNotFollowingBack" 
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
              <h3 class="empty-title">{{ searchQuery ? $t('results.empty.search.title') : $t('results.empty.notFollowingBack.title') }}</h3>
              <p class="empty-description">
                {{ searchQuery ? $t('results.empty.search.description') : $t('results.empty.notFollowingBack.description') }}
              </p>
            </div>
            <div v-if="filteredNotFollowingBack.length > 0" class="pagination pagination-bottom">
              <button 
                class="pagination-button" 
                :disabled="currentPage === 1"
                @click="handlePageChange(currentPage - 1)"
              >
                {{ $t('pagination.previous') }}
              </button>
              <span class="pagination-info">
                {{ $t('pagination.page', { current: currentPage, total: totalPages }) }}
              </span>
              <button 
                class="pagination-button" 
                :disabled="currentPage === totalPages"
                @click="handlePageChange(currentPage + 1)"
              >
                {{ $t('pagination.next') }}
              </button>
            </div>
          </div>
          
          <!-- New Followers Tab -->
          <div v-if="activeTab === 'newFollowers'" class="tab-content">
            <div v-if="props.previousData" class="new-followers-section">
              <div class="comparison-stats">
                <div class="stat-card">
                  <div class="stat-value">{{ props.instagramData.followersCount - props.previousData.followersCount }}</div>
                  <div class="stat-label">{{ $t('results.stats.newFollowers') }}</div>
                </div>
                <div class="stat-card">
                  <div class="stat-value">{{ props.instagramData.followingCount - props.previousData.followingCount }}</div>
                  <div class="stat-label">{{ $t('results.stats.newFollowing') }}</div>
                </div>
              </div>
              
              <div v-if="newFollowers.length > 0" class="unfollowers-grid">
                <UnfollowerCard 
                  v-for="user in newFollowers" 
                  :key="user.username" 
                  :user="user" 
                />
              </div>
              <div v-else class="empty-state">
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
            <div v-else class="empty-state">
              <div class="empty-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 class="empty-title">{{ $t('results.empty.newFollowers.title') }}</h3>
              <p class="empty-description">
                {{ $t('results.empty.newFollowers.noPreviousData') }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="props.importHistory && props.importHistory.length > 1" class="import-history">
        <h3 class="import-history-title">{{ $t('results.importHistory.title') }}</h3>
        <div class="import-history-list">
          <div 
            v-for="(import_, index) in props.importHistory" 
            :key="import_.timestamp"
            class="import-history-item"
          >
            <div class="import-date">{{ formatImportDate(import_.timestamp) }}</div>
            <div class="import-stats">
              <span>{{ $t('results.stats.followers') }}: {{ import_.data.followersCount }}</span>
              <span>{{ $t('results.stats.following') }}: {{ import_.data.followingCount }}</span>
              <span v-if="import_.changes" class="import-changes">
                <template v-if="import_.changes.gainedFollowers.length > 0">
                  {{ $t('results.importHistory.gainedFollowers', { count: import_.changes.gainedFollowers.length }) }}
                </template>
                <template v-if="import_.changes.lostFollowers.length > 0">
                  {{ $t('results.importHistory.lostFollowers', { count: import_.changes.lostFollowers.length }) }}
                </template>
                <template v-if="import_.changes.gainedFollowing.length > 0">
                  {{ $t('results.importHistory.gainedFollowing', { count: import_.changes.gainedFollowing.length }) }}
                </template>
                <template v-if="import_.changes.lostFollowing.length > 0">
                  {{ $t('results.importHistory.lostFollowing', { count: import_.changes.lostFollowing.length }) }}
                </template>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import UnfollowerCard from '@/components/UnfollowerCard.vue'
import type { InstagramData, Unfollower, ImportHistoryEntry } from '@/types/instagram'
import { ref, computed } from 'vue'
import { formatTimestamp } from '@/lib/instagram-parser'
import i18n from '@/i18n'

const ITEMS_PER_PAGE = 12
const currentPage = ref(1)
const searchQuery = ref('')

const props = defineProps<{
  instagramData: InstagramData
  youDontFollowBack: Unfollower[]
  notFollowingBack: Unfollower[]
  activeTab: 'youDontFollowBack' | 'notFollowingBack' | 'newFollowers'
  previousData?: InstagramData | null
  importHistory?: ImportHistoryEntry[]
}>()

const filteredYouDontFollowBack = computed(() => {
  if (!searchQuery.value) return props.youDontFollowBack
  
  const query = searchQuery.value.toLowerCase()
  return props.youDontFollowBack.filter(user => 
    user.username.toLowerCase().includes(query) ||
    (user.fullName && user.fullName.toLowerCase().includes(query))
  )
})

const filteredNotFollowingBack = computed(() => {
  if (!searchQuery.value) return props.notFollowingBack
  
  const query = searchQuery.value.toLowerCase()
  return props.notFollowingBack.filter(user => 
    user.username.toLowerCase().includes(query) ||
    (user.fullName && user.fullName.toLowerCase().includes(query))
  )
})

const paginatedYouDontFollowBack = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredYouDontFollowBack.value.slice(start, end)
})

const paginatedNotFollowingBack = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return filteredNotFollowingBack.value.slice(start, end)
})

const totalPages = computed(() => {
  const totalItems = props.activeTab === 'youDontFollowBack' 
    ? filteredYouDontFollowBack.value.length 
    : filteredNotFollowingBack.value.length
  return Math.ceil(totalItems / ITEMS_PER_PAGE)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}

const newFollowers = computed(() => {
  if (!props.previousData) return []
  
  return props.instagramData.followers
    .filter(
      currentFollower => !props.previousData?.followers.some(
        prevFollower => prevFollower.username === currentFollower.username
      )
    )
    .map(user => ({
      ...user,
      unfollowedTime: formatTimestamp(Date.now() / 1000),
      followDuration: 'New follower'
    }))
})

const formatImportDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat(i18n.global.locale.value, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

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
  direction: ltr;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  
  &.pagination-top {
    margin-bottom: var(--spacing-lg);
  }
  
  &.pagination-bottom {
    margin-top: var(--spacing-xl);
  }
}

.pagination-button {
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--main-0);
  border: 1px solid var(--main-3);
  border-radius: var(--border-radius-md);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: var(--main-1);
    border-color: var(--main-4);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.pagination-info {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.search-container {
  padding: var(--spacing-md);
  background-color: var(--main-0);
  border-bottom: 1px solid var(--main-2);
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-md);
  border: 1px solid var(--main-3);
  border-radius: var(--border-radius-md);
  background-color: var(--main-0);
  color: var(--text-primary);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--main-5);
    box-shadow: 0 0 0 2px var(--main-2);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
}

.import-history {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-lg);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.import-history-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.import-history-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.import-history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--main-1);
  border-radius: var(--border-radius-md);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--main-2);
  }
}

.import-date {
  font-weight: 500;
  color: var(--text-primary);
}

.import-stats {
  display: flex;
  gap: var(--spacing-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.import-changes {
  color: var(--main-7);
  font-weight: 500;
  
  &.positive {
    color: var(--success);
  }
  
  &.negative {
    color: var(--error);
  }
}
</style>