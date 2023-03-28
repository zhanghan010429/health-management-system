import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory('/health/'),
    routes
})

router.afterEach((to, from) => {
    document.title = '健康管理系统'
})

export default router
