import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory('/health/'),
    routes
})

router.afterEach((to, from) => {
    document.title = 'Health Management System'
})

export default router
