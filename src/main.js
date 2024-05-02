import './assets/scss/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initDirective } from '@/directive';

import App from './App.vue'
import router from './router'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)

initDirective(app)

app.component('VueDatePicker', VueDatePicker);

const pinia = createPinia()
app.use(pinia)

app.use(router)

app.mount('#app')
