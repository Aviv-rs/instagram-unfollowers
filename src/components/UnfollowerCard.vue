<template>
  <div class="unfollower-card">
    <div class="unfollower-header">
      <div class="unfollower-avatar">
        <template v-if="user.profilePicUrl">
          <img :src="user.profilePicUrl" :alt="user.username" class="unfollower-avatar-img" />
        </template>
        <template v-else>
          <div class="unfollower-avatar-placeholder">
            {{ userInitial }}
          </div>
        </template>
      </div>
      <div class="unfollower-info">
        <h3 class="unfollower-username">
          <a :href="instagramUrl" target="_blank" rel="noopener noreferrer">
            {{ user.username }}
          </a>
        </h3>
        <p v-if="user.fullName" class="unfollower-name">{{ user.fullName }}</p>
      </div>
    </div>
    <div class="unfollower-details">
      <div class="unfollower-detail">
        <span class="unfollower-detail-label">{{ $t('results.card.dateFollowed') }}</span>
        <span class="unfollower-detail-value">{{ formattedUnfollowedTime }}</span>
      </div>
      <div v-if="user.followDuration && user.followDuration !== 'N/A'" class="unfollower-detail">
        <span class="unfollower-detail-label">{{ $t('results.card.followedFor') }}</span>
        <span class="unfollower-detail-value">{{ formattedFollowDuration }}</span>
      </div>
    </div>
    <div class="unfollower-actions">
      <a 
        :href="instagramUrl" 
        target="_blank" 
        rel="noopener noreferrer"
        class="unfollower-action-btn"
      >
        {{ $t('results.card.visitProfile') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Unfollower } from '@/types/instagram'
import { formatTimestamp, calculateFollowDuration } from '@/lib/instagram-parser'

const props = defineProps<{
  user: Unfollower
}>()

const instagramUrl = computed(() => {
  return `https://instagram.com/${props.user.username}`
})

const userInitial = computed(() => {
  return props.user.username.charAt(0).toUpperCase()
})

// Make the formatted time reactive to locale changes
const formattedUnfollowedTime = computed(() => formatTimestamp(props.user.timestamp))
const formattedFollowDuration = computed(() => calculateFollowDuration(props.user.timestamp))
</script>

<style lang="scss">
.unfollower-card {
  background-color: var(--main-0);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }
}

.unfollower-header {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--main-2);
}

.unfollower-avatar {
  width: 50px;
  height: 50px;
  margin-right: var(--spacing-md);
  border-radius: 50%;
  overflow: hidden;
}

.unfollower-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.unfollower-avatar-placeholder {
  width: 100%;
  height: 100%;
  @include flex-center;
  background: linear-gradient(to right bottom, var(--main-5), var(--main-7));
  color: white;
  font-size: var(--font-size-xl);
  font-weight: 600;
}

.unfollower-info {
  flex: 1;
}

.unfollower-username {
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  
  a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--main-7);
    }
  }
}

.unfollower-name {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.unfollower-details {
  padding: var(--spacing-md);
}

.unfollower-detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
  
  &:last-child {
    margin-bottom: 0;
  }
}

.unfollower-detail-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.unfollower-detail-value {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.unfollower-actions {
  padding: var(--spacing-md);
  border-top: 1px solid var(--main-2);
  text-align: center;
}

.unfollower-action-btn {
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--main-2);
  color: var(--main-7);
  border: none;
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: var(--main-3);
  }
}
</style>