<template>
  <div class="home">
    <HeroSection />
    
    <FileUploadSection 
      id="upload-section"
      :fileUploadState="fileUploadState"
      :error="error"
      :followersUploaded="!!followersFile"
      :followingUploaded="!!followingFile"
      @fileUpload="handleFileUpload"
      @reset="handleReset"
      @viewResults="scrollToResults"
      @resetData="showResetConfirmation = true"
    />
    
    <ResultsSection
      v-if="fileUploadState === 'complete' || instagramData.followersCount > 0"
      :instagramData="instagramData"
      :youDontFollowBack="youDontFollowBack"
      :notFollowingBack="notFollowingBack"
      :activeTab="activeTab"
      :previousData="previousData"
      :importHistory="importHistory"
      @setActiveTab="setActiveTab"
    />
    
    <FAQSection />
    <About />

    <!-- Reset Confirmation Dialog -->
    <div v-if="showResetConfirmation" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">{{ $t('upload.resetConfirmation.title') }}</h3>
        <p class="modal-message">{{ $t('upload.resetConfirmation.message') }}</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="showResetConfirmation = false">
            {{ $t('common.cancel') }}
          </button>
          <button class="btn btn-danger" @click="resetAllData">
            {{ $t('upload.resetConfirmation.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import FileUploadSection from '@/components/FileUploadSection.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import FAQSection from '@/components/FAQSection.vue'
import About from '@/components/About.vue'
import { parseInstagramData, processZipFile } from '@/lib/instagram-parser'
import type { FileUploadState, InstagramData, Unfollower, UploadFileType, ImportHistoryEntry, ParsedInstagramData, InstagramUser } from '@/types/instagram'

// State management
const fileUploadState = ref<FileUploadState>('idle')
const error = ref<string | null>(null)
const activeTab = ref<'youDontFollowBack' | 'notFollowingBack' | 'newFollowers'>('youDontFollowBack')
const showResetConfirmation = ref(false)

// File storage
const followersFile = ref<File | null>(null)
const followingFile = ref<File | null>(null)

// Data storage
const instagramData = ref<InstagramData>({
  followersCount: 0,
  followingCount: 0,
  followers: [],
  following: []
})
const youDontFollowBack = ref<Unfollower[]>([])
const notFollowingBack = ref<Unfollower[]>([])
const lastParsedData = ref<ParsedInstagramData | null>(null)

// Previous data storage
const previousData = ref<InstagramData | null>(null)
const importHistory = ref<ImportHistoryEntry[]>([])

// Save data to localStorage
const saveToLocalStorage = () => {
  // Get previous followers list BEFORE adding the new import
  let prevFollowers: InstagramUser[] = []
  if (importHistory.value.length > 0 && importHistory.value[0].data.followers && importHistory.value[0].data.followers.length > 0) {
    prevFollowers = importHistory.value[0].data.followers
  }

  // Compute newFollowers by comparing to previous import (if available)
  let newFollowersArr: InstagramUser[] = []
  let lostFollowersArr: InstagramUser[] = []
  if (prevFollowers.length > 0) {
    newFollowersArr = instagramData.value.followers.filter(
      currentFollower => !prevFollowers.some(prevFollower => prevFollower.username === currentFollower.username)
    )
    lostFollowersArr = prevFollowers.filter(
      prevFollower => !instagramData.value.followers.some(currentFollower => currentFollower.username === prevFollower.username)
    )
  } else {
    newFollowersArr = []
    lostFollowersArr = []
  }

  // Prepare new import (with full lists)
  const newImport: ImportHistoryEntry = {
    data: { ...instagramData.value },
    timestamp: new Date().toISOString(),
    changes: lastParsedData.value?.changes,
    newFollowers: newFollowersArr,
    lostFollowers: lostFollowersArr
  }

  // Add new import to history (at the start)
  importHistory.value.unshift(newImport)

  // Only keep the latest import with full lists, trim older ones
  for (let i = 1; i < importHistory.value.length; i++) {
    const entry = importHistory.value[i]
    // Remove followers/following arrays, keep only counts
    entry.data = {
      followersCount: entry.data.followersCount,
      followingCount: entry.data.followingCount,
      followers: [],
      following: []
    }
    // Remove newFollowers and lostFollowers from previous imports to save space
    if ('newFollowers' in entry) {
      delete entry.newFollowers
    }
    if ('lostFollowers' in entry) {
      delete entry.lostFollowers
    }
  }

  // Save complete history
  const dataToSave = {
    importHistory: importHistory.value,
    currentData: {
      instagramData: instagramData.value,
      youDontFollowBack: youDontFollowBack.value,
      notFollowingBack: notFollowingBack.value
    }
  }

  localStorage.setItem('instagramData', JSON.stringify(dataToSave))
}

// Load data from localStorage
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('instagramData')
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData)

      // Restore import history
      if (parsedData.importHistory) {
        importHistory.value = parsedData.importHistory
      }

      // Restore current state
      if (parsedData.currentData) {
        instagramData.value = parsedData.currentData.instagramData
        youDontFollowBack.value = parsedData.currentData.youDontFollowBack
        notFollowingBack.value = parsedData.currentData.notFollowingBack
        fileUploadState.value = 'complete'
      }

      // Set previous data to the last import if available
      if (importHistory.value.length > 1) {
        // previousData will only have counts, not full lists
        previousData.value = {
          followersCount: importHistory.value[1].data.followersCount,
          followingCount: importHistory.value[1].data.followingCount,
          followers: [],
          following: []
        }
      }

      console.log('Successfully loaded saved data from localStorage')
    } catch (err) {
      console.error('Error loading saved data:', err)
    }
  }
}

// Watch for both files to be uploaded
watch([followersFile, followingFile], async ([newFollowersFile, newFollowingFile]) => {
  if (newFollowersFile && newFollowingFile) {
    try {
      const followersContent = await readFileAsText(newFollowersFile)
      const followingContent = await readFileAsText(newFollowingFile)
      
      // Get the most recent data from history if available
      const existingData = importHistory.value.length > 0 ? importHistory.value[0].data : undefined
      
      const parsedData = await parseInstagramData(followersContent, followingContent, existingData)
      
      // Store the parsed data
      lastParsedData.value = parsedData
      
      // Update current data
      instagramData.value = parsedData.data
      youDontFollowBack.value = parsedData.youDontFollowBack
      notFollowingBack.value = parsedData.notFollowingBack
      
      // Save the new data to localStorage
      saveToLocalStorage()
      
      // Set previous data to the last import if available
      if (importHistory.value.length > 1) {
        previousData.value = importHistory.value[1].data
      }
      
      fileUploadState.value = 'complete'
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while processing the files.'
      fileUploadState.value = 'error'
    }
  }
})

// Load saved data when component mounts
onMounted(() => {
  loadFromLocalStorage()
})

// File upload handler
const handleFileUpload = async (file: File, fileType: UploadFileType) => {
  if (!file) return
  
  try {
    fileUploadState.value = 'uploading'
    error.value = null
    
    if (fileType === 'zip') {
      // Process ZIP file
      const { followersContent, followingContent } = await processZipFile(file)
      
      // Get the most recent data from history if available
      const existingData = importHistory.value.length > 0 ? importHistory.value[0].data : undefined
      
      // Parse the Instagram data
      const parsedData = await parseInstagramData(followersContent, followingContent, existingData)
      
      // Update state with parsed data
      instagramData.value = parsedData.data
      notFollowingBack.value = parsedData.notFollowingBack
      youDontFollowBack.value = parsedData.youDontFollowBack
      
      // Save the new data to localStorage
      saveToLocalStorage()
      
      // Set previous data to the last import if available
      if (importHistory.value.length > 1) {
        previousData.value = importHistory.value[1].data
      }
      
      fileUploadState.value = 'complete'
    } else {
      if (fileType === 'followers') {
        followersFile.value = file
      } else {
        followingFile.value = file
      }

      fileUploadState.value = 'idle'
      
      // If we have both files, process them
      if (followersFile.value && followingFile.value) {
        await processFiles()
        fileUploadState.value = 'complete'
      }
    }
  } catch (err) {
    console.error('Error uploading file:', err)
    fileUploadState.value = 'error'
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
  }
}

// Process both files when ready
const processFiles = async () => {
  if (!followersFile.value || !followingFile.value) return
  
  try {
    fileUploadState.value = 'processing'
    
    // Read followers file
    const followersContent = await readFileAsText(followersFile.value)
    
    // Read following file
    const followingContent = await readFileAsText(followingFile.value)
    
    // Get the most recent data from history if available
    const existingData = importHistory.value.length > 0 ? importHistory.value[0].data : undefined
    
    // Parse the Instagram data
    const parsedData = await parseInstagramData(followersContent, followingContent, existingData)
    
    // Update state with parsed data
    instagramData.value = parsedData.data
    notFollowingBack.value = parsedData.notFollowingBack
    youDontFollowBack.value = parsedData.youDontFollowBack
    
    fileUploadState.value = 'complete'
  } catch (err) {
    console.error('Error processing Instagram data:', err)
    fileUploadState.value = 'error'
    error.value = 'Failed to process Instagram data. Please make sure you uploaded the correct JSON files.'
  }
}

// Helper function to read file as text
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      resolve(e.target?.result as string)
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read the file.'))
    }
    
    reader.readAsText(file)
  })
}

// Reset handler
const handleReset = () => {
  // Only reset the file upload state and file references
  fileUploadState.value = 'idle'
  error.value = null
  followersFile.value = null
  followingFile.value = null
  
  // Don't clear the data or localStorage
  // This allows users to upload new files while keeping the previous data
}

// Tab handler
const setActiveTab = (tab: 'youDontFollowBack' | 'notFollowingBack' | 'newFollowers') => {
  activeTab.value = tab
}

// Reset all data
const resetAllData = () => {
  // Clear all data
  instagramData.value = {
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: []
  }
  youDontFollowBack.value = []
  notFollowingBack.value = []
  previousData.value = null
  importHistory.value = []
  lastParsedData.value = null
  
  // Clear localStorage
  localStorage.removeItem('instagramData')
  
  // Reset file upload state
  fileUploadState.value = 'idle'
  error.value = null
  followersFile.value = null
  followingFile.value = null
  
  // Hide confirmation dialog
  showResetConfirmation.value = false
}

// Scroll to results section
const scrollToResults = () => {
  const resultsSection = document.getElementById('results-section')
  if (resultsSection) {
    resultsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss">
.home {
  min-height: 100vh;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  max-width: 500px;
  width: 90%;
  box-shadow: var(--shadow-lg);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.modal-message {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  align-items: center;
}
</style>