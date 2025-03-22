<template>
  <section id="upload-section" class="file-upload-section">
    <div class="container">
      <div class="file-upload-container">
        <h2 class="section-title text-center">
          <span class="text-gradient">Upload Your Instagram Data</span>
        </h2>
        
        <p class="file-upload-description text-center">
          Upload both your followers and following Instagram data files (JSON format) to analyze your relationships.
          All processing happens in your browser - your data never leaves your device.
        </p>
        
        <div v-if="fileUploadState === 'idle'" class="file-upload-grid">
          <!-- Followers File Upload -->
          <div 
            class="file-upload-area"
            :class="{ 
              'drag-active': isDraggingFollowers,
              'file-uploaded': followersUploaded
            }"
            @dragover.prevent="handleDragOver('followers')"
            @dragleave.prevent="handleDragLeave('followers')"
            @drop.prevent="handleFileDrop($event, 'followers')"
          >
            <div class="file-upload-content">
              <div class="file-upload-icon" :class="{ 'file-uploaded-icon': followersUploaded }">
                <svg v-if="!followersUploaded" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 class="file-upload-title">
                {{ followersUploaded ? 'Followers File Uploaded' : 'Upload Followers File' }}
              </h3>
              <p class="file-upload-subtitle">
                {{ followersUploaded ? 'File successfully uploaded' : 'Drag & drop or click to browse' }}
              </p>
              <input 
                type="file" 
                ref="followersFileInput" 
                class="file-input" 
                accept=".json" 
                @change="handleFileInputChange($event, 'followers')"
              />
              <button 
                class="btn" 
                :class="followersUploaded ? 'btn-secondary' : 'btn-primary'"
                @click="triggerFileInput('followers')"
              >
                {{ followersUploaded ? 'Change File' : 'Browse Files' }}
              </button>
            </div>
          </div>
          
          <!-- Following File Upload -->
          <div 
            class="file-upload-area"
            :class="{ 
              'drag-active': isDraggingFollowing,
              'file-uploaded': followingUploaded 
            }"
            @dragover.prevent="handleDragOver('following')"
            @dragleave.prevent="handleDragLeave('following')"
            @drop.prevent="handleFileDrop($event, 'following')"
          >
            <div class="file-upload-content">
              <div class="file-upload-icon" :class="{ 'file-uploaded-icon': followingUploaded }">
                <svg v-if="!followingUploaded" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 class="file-upload-title">
                {{ followingUploaded ? 'Following File Uploaded' : 'Upload Following File' }}
              </h3>
              <p class="file-upload-subtitle">
                {{ followingUploaded ? 'File successfully uploaded' : 'Drag & drop or click to browse' }}
              </p>
              <input 
                type="file" 
                ref="followingFileInput" 
                class="file-input" 
                accept=".json" 
                @change="handleFileInputChange($event, 'following')"
              />
              <button 
                class="btn" 
                :class="followingUploaded ? 'btn-secondary' : 'btn-primary'"
                @click="triggerFileInput('following')"
              >
                {{ followingUploaded ? 'Change File' : 'Browse Files' }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- Upload Status Message -->
        <div v-if="fileUploadState === 'idle'" class="upload-status">
          <p v-if="followersUploaded && followingUploaded" class="upload-status-success">
            Both files uploaded successfully! Processing your data...
          </p>
          <p v-else-if="followersUploaded || followingUploaded" class="upload-status-partial">
            <span v-if="followersUploaded">Followers file uploaded. </span>
            <span v-if="followingUploaded">Following file uploaded. </span>
            Please upload the remaining file to continue.
          </p>
          <p v-else class="upload-status-info">
            Please upload both your followers and following data files to analyze your Instagram relationships.
          </p>
          
          <button v-if="followersUploaded || followingUploaded" class="btn btn-secondary" @click="resetUpload">
            Reset
          </button>
        </div>
        
        <!-- Loading state -->
        <div v-else-if="fileUploadState === 'uploading' || fileUploadState === 'processing'" class="file-upload-loading">
          <div class="spinner"></div>
          <p v-if="fileUploadState === 'uploading'" class="loading-text">Uploading your files...</p>
          <p v-else class="loading-text">Processing your Instagram data...</p>
        </div>
        
        <!-- Error state -->
        <div v-else-if="fileUploadState === 'error'" class="file-upload-error">
          <div class="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3 class="error-title">Something went wrong</h3>
          <p class="error-message">{{ error || 'An unknown error occurred. Please try again.' }}</p>
          <button class="btn btn-primary" @click="resetUpload">
            Try Again
          </button>
        </div>
        
        <!-- Success state -->
        <div v-else-if="fileUploadState === 'complete'" class="file-upload-success">
          <div class="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 class="success-title">Data Processed Successfully</h3>
          <p class="success-message">
            Your Instagram data has been processed. Scroll down to see your results!
          </p>
          <button class="btn btn-secondary" @click="resetUpload">
            Upload Different Files
          </button>
        </div>
        
        <!-- Instructions Area -->
        <div class="instructions-area">
          <h3 class="instructions-title">How to get your Instagram data</h3>
          <ol class="instructions-list">
            <li>Log in to your Instagram account</li>
            <li>Go to your profile and tap the menu icon in the top right</li>
            <li>Select "Your activity"</li>
            <li>Scroll down and tap "Download your information"</li>
            <li>Select "JSON" as the format and request the download</li>
            <li>Instagram will email you when your data is ready to download</li>
            <li>Extract the ZIP file and find the "followers_1" and "following" JSON files in the "connections" folder</li>
            <li>Upload both files separately in the corresponding upload areas above</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileUploadState, UploadFileType } from '@/types/instagram'

// Props
defineProps<{
  fileUploadState: FileUploadState
  error: string | null
  followersUploaded: boolean
  followingUploaded: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'fileUpload', file: File, fileType: UploadFileType): void
  (e: 'reset'): void
}>()

// State
const isDraggingFollowers = ref(false)
const isDraggingFollowing = ref(false)
const followersFileInput = ref<HTMLInputElement | null>(null)
const followingFileInput = ref<HTMLInputElement | null>(null)

// Methods
const handleDragOver = (fileType: UploadFileType) => {
  if (fileType === 'followers') {
    isDraggingFollowers.value = true
  } else {
    isDraggingFollowing.value = true
  }
}

const handleDragLeave = (fileType: UploadFileType) => {
  if (fileType === 'followers') {
    isDraggingFollowers.value = false
  } else {
    isDraggingFollowing.value = false
  }
}

const handleFileDrop = (event: DragEvent, fileType: UploadFileType) => {
  if (fileType === 'followers') {
    isDraggingFollowers.value = false
  } else {
    isDraggingFollowing.value = false
  }
  
  if (!event.dataTransfer?.files.length) return
  
  const file = event.dataTransfer.files[0]
  validateAndEmitFile(file, fileType)
}

const triggerFileInput = (fileType: UploadFileType) => {
  if (fileType === 'followers') {
    followersFileInput.value?.click()
  } else {
    followingFileInput.value?.click()
  }
}

const handleFileInputChange = (event: Event, fileType: UploadFileType) => {
  const target = event.target as HTMLInputElement
  
  if (!target.files?.length) return
  
  const file = target.files[0]
  validateAndEmitFile(file, fileType)
}

const validateAndEmitFile = (file: File, fileType: UploadFileType) => {
  // Check if it's a JSON file
  if (!file.name.endsWith('.json')) {
    alert('Please upload a valid JSON file')
    return
  }
  
  emit('fileUpload', file, fileType)
}

const resetUpload = () => {
  emit('reset')
  
  // Reset file inputs
  if (followersFileInput.value) {
    followersFileInput.value.value = ''
  }
  
  if (followingFileInput.value) {
    followingFileInput.value.value = ''
  }
}
</script>

<style lang="scss">
.file-upload-section {
  padding: var(--spacing-3xl) 0;
  background-color: var(--main-1);
}

.file-upload-container {
  max-width: 800px;
  margin: 0 auto;
}

.file-upload-description {
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  
  @include mobile {
    font-size: var(--font-size-md);
  }
}

.file-upload-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  
  @include mobile {
    grid-template-columns: 1fr;
  }
}

.file-upload-area {
  border: 2px dashed var(--main-4);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--main-0);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    border-color: var(--main-5);
  }
  
  &.drag-active {
    background-color: rgba(var(--main-5-rgb), 0.05);
    border-color: var(--main-5);
  }
  
  &.file-uploaded {
    border-style: solid;
    border-color: var(--success);
    background-color: rgba(var(--success-rgb), 0.05);
  }
}

.file-upload-content {
  text-align: center;
}

.file-upload-icon {
  color: var(--main-5);
  margin-bottom: var(--spacing-md);
  
  &.file-uploaded-icon {
    color: var(--success);
  }
}

.file-upload-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
  
  @include mobile {
    font-size: var(--font-size-md);
  }
}

.file-upload-subtitle {
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}

.file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Upload status */
.upload-status {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-md);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  text-align: center;
  
  p {
    margin-bottom: var(--spacing-md);
  }
}

.upload-status-success {
  color: var(--success);
  font-weight: 500;
}

.upload-status-partial {
  color: var(--warning);
  font-weight: 500;
}

.upload-status-info {
  color: var(--text-secondary);
}

/* Loading state */
.file-upload-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-xl);
  
  .spinner {
    margin-bottom: var(--spacing-md);
  }
  
  .loading-text {
    font-size: var(--font-size-lg);
    font-weight: 500;
    color: var(--text-primary);
  }
}

/* Error state */
.file-upload-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  
  .error-icon {
    color: var(--error);
    margin-bottom: var(--spacing-md);
  }
  
  .error-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  .error-message {
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
    max-width: 500px;
  }
}

/* Success state */
.file-upload-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  
  .success-icon {
    color: var(--success);
    margin-bottom: var(--spacing-md);
  }
  
  .success-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  .success-message {
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-lg);
  }
}

/* Instructions area */
.instructions-area {
  margin-top: var(--spacing-xl);
  padding: var(--spacing-lg);
  background-color: var(--main-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
}

.instructions-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.instructions-list {
  padding-left: var(--spacing-lg);
  
  li {
    margin-bottom: var(--spacing-xs);
    font-size: var(--font-size-md);
    color: var(--text-secondary);
    list-style-type: decimal;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>