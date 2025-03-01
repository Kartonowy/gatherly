import { createApp } from 'vue'
import './style.css'

import { createMemoryHistory, createRouter } from 'vue-router'

import Homepage from './components/Homepage.vue'
import LoginForm from './components/LoginForm.vue'
import App from './App.vue'
import RegisterForm from './components/RegisterForm.vue'

const routes = [
    { path: '/', component: Homepage},
    { path: '/signin', component: LoginForm},
    { path: '/signup', component: RegisterForm}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
