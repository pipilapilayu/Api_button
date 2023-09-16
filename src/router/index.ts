import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/Index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: Index
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
    path: '/timeline',
    component: () => import('../views/TimeLine.vue')
  },
  // {
  //   path: 'menu',
  //   children: [{
  //     path: 'home',
  //     name: '主页',
  //     component: () => import('@/views/TimeLine.vue')
  //   }]
  // },
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
