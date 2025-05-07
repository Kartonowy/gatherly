import { createApp } from 'vue'
import '../css/style.css'

import { createMemoryHistory, createRouter } from 'vue-router'

import Homepage from './components/Homepage.vue'
import LoginForm from './components/unused/LoginForm.vue'
import App from './App.vue'
import RegisterForm from './components/unused/RegisterForm.vue'
import { defaultConfig, plugin } from '@formkit/vue'
import config from '../formkit.config.ts'

const routes = [
    { path: '/', component: Homepage},
    { path: '/signin', component: LoginForm},
    { path: '/signup', component: RegisterForm}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).use(plugin, defaultConfig(config)).mount('#app')
