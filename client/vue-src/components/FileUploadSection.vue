<template>
  <section id="upload-section" class="upload-section">
    <div class="container">
      <h2 class="section-title text-center">
        <span class="text-gradient">Upload Your Instagram Data</span>
      </h2>
      <p class="section-description text-center">
        We process your data file locally in your browser. Your information is never sent to our servers.
      </p>
      
      <div class="upload-container">
        <!-- File Upload Area -->
        <div v-if="fileUploadState === 'idle'" class="dropzone-container">
          <div 
            class="dropzone"
            :class="{ 'dropzone-active': isDragActive }"
            @dragenter="handleDragEnter"
            @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="openFileDialog"
          >
            <input 
              ref="fileInput"
              type="file" 
              accept=".json"
              class="file-input" 
              @change="handleFileChange"
            />
            <div class="dropzone-content">
              <div class="dropzone-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3 class="dropzone-title">
                {{ isDragActive ? 'Drop your file here' : 'Drag & drop your Instagram data file here' }}
              </h3>
              <p class="dropzone-description">
                or <span class="dropzone-link">browse your files</span>
              </p>
              <p class="dropzone-hint">
                Please upload the followers_and_following.json file from your Instagram data export
              </p>
            </div>
          </div>
        </div>
        
        <!-- Loading State -->
        <div v-else-if="fileUploadState === 'uploading' || fileUploadState === 'processing'" class="upload-status">
          <div class="upload-status-icon">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
          </div>
          <h3 class="upload-status-title">
            {{ fileUploadState === 'uploading' ? 'Uploading...' : 'Processing...' }}
          </h3>
          <p class="upload-status-description">
            {{ fileUploadState === 'uploading' ? 'Reading your data file' : 'Analyzing your follower relationships' }}
          </p>
        </div>
        
        <!-- Error State -->
        <div v-else-if="fileUploadState === 'error'" class="upload-status upload-error">
          <div class="upload-status-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 class="upload-status-title">Error Processing File</h3>
          <p class="upload-status-description">{{ error }}</p>
          <button class="btn btn-secondary mt-md" @click="resetUpload">Try Again</button>
        </div>
        
        <!-- Success State -->
        <div v-else-if="fileUploadState === 'complete'" class="upload-status upload-success">
          <div class="upload-status-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="upload-status-title">Analysis Complete</h3>
          <p class="upload-status-description">Your data has been processed successfully.</p>
          <div class="upload-status-actions">
            <a href="#results-section" class="btn btn-primary mt-md">View Results</a>
            <button class="btn btn-secondary mt-md ml-md" @click="resetUpload">Upload Another File</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { FileUploadState } from '@/types/instagram'

const props = defineProps<{
  fileUploadState: FileUploadState
  error: string | null
}>()

const emit = defineEmits<{
  fileUpload: [files: File[]]
  reset: []
}>()

// File input reference
const fileInput = ref<HTMLInputElement | null>(null)

// Drag and drop state
const isDragActive = ref(false)

// Drag and drop handlers
const handleDragEnter = (e: DragEvent) => {
  e.preventDefault()
  isDragActive.value = true
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragActive.value = true
}

const handleDragLeave = () => {
  isDragActive.value = false
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragActive.value = false
  
  if (e.dataTransfer?.files) {
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      emit('fileUpload', files)
    }
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const files = Array.from(target.files)
    emit('fileUpload', files)
  }
}

const openFileDialog = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const resetUpload = () => {
  emit('reset')
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<style lang="scss">
.upload-section {
  padding: var(--spacing-2xl) 0;
}

.section-title {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  max-width: 700px;
  margin: 0 auto var(--spacing-xl);
}

.upload-container {
  max-width: 700px;
  margin: 0 auto;
}

.dropzone-container {
  width: 100%;
}

.dropzone {
  border: 2px dashed var(--main-4);
  border-radius: var(--border-radius-lg);
  background-color: var(--main-1);
  padding: var(--spacing-xl);
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--main-6);
    background-color: var(--main-2);
  }
  
  &.dropzone-active {
    border-color: var(--main-7);
    background-color: var(--main-2);
  }
}

.file-input {
  display: none;
}

.dropzone-content {
  @include flex-column;
  align-items: center;
}

.dropzone-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--main-2);
  color: var(--main-7);
  margin-bottom: var(--spacing-md);
}

.dropzone-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.dropzone-description {
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-md);
}

.dropzone-link {
  color: var(--main-7);
  font-weight: 600;
  text-decoration: underline;
}

.dropzone-hint {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.upload-status {
  @include flex-column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  background-color: var(--main-0);
  box-shadow: var(--shadow-md);
}

.upload-status-icon {
  margin-bottom: var(--spacing-md);
  
  svg {
    color: var(--main-7);
  }
}

.upload-status-title {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-sm);
}

.upload-status-description {
  font-size: var(--font-size-md);
  color: var(--text-secondary);
  max-width: 400px;
  margin-bottom: var(--spacing-md);
}

.upload-status-actions {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
  
  @media (max-width: $breakpoint-sm) {
    @include flex-column;
  }
}

.upload-error {
  .upload-status-icon svg {
    color: var(--error);
  }
}

.upload-success {
  .upload-status-icon svg {
    color: var(--success);
  }
}

/* Spinner animation */
.spinner {
  animation: rotate 2s linear infinite;
  width: 50px;
  height: 50px;
  
  .path {
    stroke: var(--main-7);
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>