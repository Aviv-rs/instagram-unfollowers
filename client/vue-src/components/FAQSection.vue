<template>
  <section id="faq-section" class="faq-section">
    <div class="container">
      <h2 class="section-title text-center">
        <span class="text-gradient">Frequently Asked Questions</span>
      </h2>
      
      <div class="faq-container">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="faq-item"
          :class="{ 'active': activeIndex === index }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h3 class="faq-question-text">{{ faq.question }}</h3>
            <span class="faq-icon">
              <svg class="faq-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </div>
          <div 
            class="faq-answer" 
            :style="{ maxHeight: activeIndex === index ? faqHeights[index] + 'px' : '0px' }"
          >
            <div class="faq-answer-content" ref="answerRefs">
              <p v-html="faq.answer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

const faqs = [
  {
    question: "How do I get my Instagram data file?",
    answer: "Go to your Instagram profile, tap the three lines in the top right, select 'Your activity', then 'Download your information'. Request a download in JSON format. Instagram will email you when it's ready to download."
  },
  {
    question: "Is my data secure when using this tool?",
    answer: "Yes, all data processing happens locally in your browser. Your Instagram data never leaves your device and is not sent to our servers. This ensures complete privacy and security."
  },
  {
    question: "How accurate is the unfollower detection?",
    answer: "The tool identifies users who don't follow you back with 100% accuracy. However, for detecting users who unfollowed you, Instagram doesn't provide historical follower data, so we can only show users who were following you in previous exports but not in the current one."
  },
  {
    question: "Why should I use this instead of other tools?",
    answer: "Our tool provides privacy-first analysis without requiring your Instagram login credentials. Many other tools require access to your account, which poses security risks. Our tool works with your exported data file, keeping your account secure."
  },
  {
    question: "Can I see who viewed my profile?",
    answer: "No, Instagram does not provide data on who views your profile, so no tool can accurately show this information."
  },
  {
    question: "How often should I check for unfollowers?",
    answer: "Instagram limits data exports, so we recommend checking once every 1-2 months. This also allows enough time for meaningful changes in your follower relationships."
  }
]

const activeIndex = ref<number | null>(null)
const answerRefs = ref<HTMLElement[]>([])
const faqHeights = ref<number[]>(Array(faqs.length).fill(0))

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

onMounted(async () => {
  await nextTick()
  
  // Get heights of all answer content
  const elements = answerRefs.value
  
  if (elements && elements.length > 0) {
    elements.forEach((el, index) => {
      if (el) {
        faqHeights.value[index] = el.scrollHeight
      }
    })
  }
})
</script>

<style lang="scss">
.faq-section {
  padding: var(--spacing-2xl) 0;
  background-color: var(--main-1);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: var(--main-0);
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-md);
  }
  
  &.active {
    box-shadow: var(--shadow-md);
    
    .faq-question {
      border-bottom-color: var(--main-2);
    }
    
    .faq-arrow {
      transform: rotate(180deg);
    }
  }
}

.faq-question {
  padding: var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.faq-question-text {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
}

.faq-icon {
  color: var(--main-7);
}

.faq-arrow {
  transition: transform 0.3s ease;
}

.faq-answer {
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer-content {
  padding: 0 var(--spacing-lg) var(--spacing-lg);
  color: var(--text-secondary);
  
  p {
    margin-bottom: var(--spacing-md);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  a {
    color: var(--main-7);
    text-decoration: underline;
  }
}
</style>