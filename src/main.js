import './assets/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initDirective } from '@/directive';

import App from './App.vue'
import router from './router'

const app = createApp(App)

initDirective(app)

const pinia = createPinia()
app.use(pinia)

app.use(router)

app.mount('#app')
