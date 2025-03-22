import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/reset.scss'
import './assets/styles/variables.scss'
import './assets/styles/global.scss'

createApp(App)
  .use(router)
  .mount('#app')