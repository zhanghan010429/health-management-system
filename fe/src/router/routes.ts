import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/home.vue')
    },
    {
        path: '/breathe',
        name: 'Breathe',
        component: () => import('@/pages/breathe/index.vue')
    },
    {
        path: '/body-measure',
        name: 'BodyMeasure',
        component: () => import('@/pages/body-measure/index.vue')
    },
    {
        path: '/exercise',
        name: 'Exercise',
        component: () => import('@/pages/exercise/index.vue')
    },
    {
        path: '/heart',
        name: 'Heart',
        component: () => import('@/pages/heart/index.vue')
    },
    {
        path: '/nutrition',
        name: 'Nutrition',
        component: () => import('@/pages/nutrition/index.vue')
    },
    {
        path: '/account',
        name: 'AccountIndex',
        component: () => import('@/pages/account/index.vue'),
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/pages/account/login.vue')
            },
            {
                path: 'regist',
                name: 'Regist',
                component: () => import('@/pages/account/regist.vue')
            },
            {
                path: 'get-phone-code',
                name: 'GetPhoneCode',
                component: () => import('@/pages/account/get-phone-code.vue')
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: () => import('@/pages/account/reset-password.vue')
            }
        ]
    },
    {
        path: '/personal-edit',
        name: 'PersonEdit',
        component: () => import('@/pages/personal/personal-edit.vue')
    },
    {
        path: '/personal',
        name: 'Person',
        component: () => import('@/pages/personal/index.vue')
    },
    {
        path: '/change-user-name',
        name: 'ChangeUserName',
        component: () => import('@/pages/personal/change-user-name.vue')
    },
    {
        path: '/change-user-sex',
        name: 'ChangeUserSex',
        component: () => import('@/pages/personal/change-user-sex.vue')
    }
]

export default routes
