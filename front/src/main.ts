import { createApp } from 'vue'
import '../css/style-midnight.css'

import { createMemoryHistory, createRouter } from 'vue-router'

import Homepage from './components/Homepage.vue'
import App from './App.vue'
import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'

const routes = [
    { path: '/', component: Homepage},
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).use(plugin, defaultConfig(config)).mount('#app')
