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
    />
    
    <ResultsSection
      v-if="fileUploadState === 'complete'"
      :instagramData="instagramData"
      :youDontFollowBack="youDontFollowBack"
      :notFollowingBack="notFollowingBack"
      :activeTab="activeTab"
      @setActiveTab="setActiveTab"
    />
    
    <FAQSection />
    <About />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import FileUploadSection from '@/components/FileUploadSection.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import FAQSection from '@/components/FAQSection.vue'
import About from '@/components/About.vue'
import { parseInstagramData } from '@/lib/instagram-parser'
import type { FileUploadState, InstagramData, Unfollower, UploadFileType } from '@/types/instagram'

// State management
const fileUploadState = ref<FileUploadState>('idle')
const error = ref<string | null>(null)
const activeTab = ref<'youDontFollowBack' | 'notFollowingBack' | 'newFollowers'>('youDontFollowBack')

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

// Watch for both files to be uploaded
watch([followersFile, followingFile], async ([newFollowersFile, newFollowingFile]) => {
  if (newFollowersFile && newFollowingFile) {
    try {
      const followersContent = await readFileAsText(newFollowersFile)
      const followingContent = await readFileAsText(newFollowingFile)
      
      const parsedData = await parseInstagramData(followersContent, followingContent)
      
      instagramData.value = parsedData.data
      youDontFollowBack.value = parsedData.youDontFollowBack
      notFollowingBack.value = parsedData.notFollowingBack
      
      fileUploadState.value = 'complete'
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred while processing the files.'
      fileUploadState.value = 'error'
    }
  }
})

// File upload handler
const handleFileUpload = async (file: File, fileType: UploadFileType) => {
  if (!file) return
  
  try {
    fileUploadState.value = 'uploading'
    error.value = null
    
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
    
    
  } catch (err) {
    console.error('Error uploading file:', err)
    fileUploadState.value = 'error'
    error.value = 'An unexpected error occurred. Please try again.'
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
    
    // Parse the Instagram data
    const parsedData = await parseInstagramData(followersContent, followingContent)
    
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
  fileUploadState.value = 'idle'
  error.value = null
  followersFile.value = null
  followingFile.value = null
  instagramData.value = {
    followersCount: 0,
    followingCount: 0,
    followers: [],
    following: []
  }
  youDontFollowBack.value = []
  notFollowingBack.value = []
}

// Tab handler
const setActiveTab = (tab: 'youDontFollowBack' | 'notFollowingBack' | 'newFollowers') => {
  activeTab.value = tab
}
</script>

<style lang="scss">
.home {
  min-height: 100vh;
}
</style>