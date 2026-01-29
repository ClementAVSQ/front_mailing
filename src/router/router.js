import { createRouter, createWebHashHistory } from 'vue-router'

import homepage from '../views/homepage.vue'

const routes = [
    {
        path:'/',
        name:'homepage',
        component: homepage
    },
    {
        path:'/campagne/:id',
        name:'campagne',
        component: () => import('../views/data_campagne.vue')
    },
    {
        path:'/comparative',
        name:'comparative',
        component: () => import('../views/comparative_vue.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router