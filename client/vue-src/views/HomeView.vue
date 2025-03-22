<template>
  <div class="home">
    <HeroSection />
    <FileUploadSection 
      :fileUploadState="fileUploadState"
      :error="error"
      @fileUpload="handleFileUpload"
      @reset="resetUpload"
    />
    <ResultsSection 
      v-if="parsedData"
      :instagramData="parsedData.data"
      :unfollowers="parsedData.unfollowers"
      :notFollowingBack="parsedData.notFollowingBack"
      :activeTab="activeTab"
      @setActiveTab="setActiveTab"
    />
    <FAQSection />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import HeroSection from '@/components/HeroSection.vue'
import FileUploadSection from '@/components/FileUploadSection.vue'
import ResultsSection from '@/components/ResultsSection.vue'
import FAQSection from '@/components/FAQSection.vue'
import { parseInstagramData } from '@/lib/instagram-parser'
import type { FileUploadState, ParsedInstagramData } from '@/types/instagram'

// State
const fileUploadState = ref<FileUploadState>('idle')
const error = ref<string | null>(null)
const parsedData = ref<ParsedInstagramData | null>(null)
const activeTab = ref<"unfollowers" | "notFollowingBack" | "newFollowers">("unfollowers")

// Methods
const handleFileUpload = async (files: File[]) => {
  if (files.length === 0) return

  try {
    const file = files[0]
    fileUploadState.value = 'uploading'
    
    const fileContent = await readFileAsText(file)
    
    fileUploadState.value = 'processing'
    // Process the data
    const data = await parseInstagramData(fileContent)
    parsedData.value = data
    
    fileUploadState.value = 'complete'
  } catch (err: any) {
    fileUploadState.value = 'error'
    error.value = err.message || 'Failed to process file. Please make sure you selected the right JSON file.'
  }
}

const resetUpload = () => {
  fileUploadState.value = 'idle'
  error.value = null
  parsedData.value = null
}

const setActiveTab = (tab: "unfollowers" | "notFollowingBack" | "newFollowers") => {
  activeTab.value = tab
}

// Helper function to read file content
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    reader.readAsText(file)
  })
}
</script>

<style lang="scss">
.home {
  @include flex-column;
  gap: var(--spacing-2xl);
}
</style>