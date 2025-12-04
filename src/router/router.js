import { createRouter, createWebHistory } from 'vue-router'

//import HomeView from '../views/HomeView.vue'
import homepage from '../views/homepage.vue'

const routes = [
    /*  {
        path: '/',
        name: 'home',
        component: HomeView
      },
      */
    {
        path:'/',
        name:'homepage',
        component: homepage
    },
    {
        path:'/campagne/:id',
        name:'campagne',
        component: () => import('../views/data_campagne.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router