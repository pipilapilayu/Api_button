import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'

import Home from '../views/Home'
import About from '../views/About'
import Dynamic from '../views/Dynamic'
import Timeline from '../views/Timeline'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },{
        name: 'home',
        path: '/home',
        component: Home
    }, {
        name: 'dynamic',
        path: '/dynamic',
        component: Dynamic
    },
    {
        name: 'about',
        path: '/about',
        component: About
    },
    {
        name:'timeline',
        path:'/timeline',
        component: Timeline
    },
  {
    path: '/editor',
    component: () => import('../views/VoiceEditor.vue')
  },
  {
    path: '/memes',
    component: () => import('../views/Memes.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition && to.path !== '/memes') {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
