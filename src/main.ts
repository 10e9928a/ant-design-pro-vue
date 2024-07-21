import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import 'ant-design-vue/dist/reset.css'
import 'uno.css'
import '@/assets/styles/reset.css'
import '@/router/router-guard'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
