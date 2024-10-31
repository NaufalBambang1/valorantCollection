import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/agents',
    name: 'agents',
    component: function () {
      return import('../views/Agents.vue')
    }
  },
  {
    path: '/agents/:id',
    name: 'agentsDetail',
    component: function () {
      return import('../views/AgentsDetail.vue')
    }
  },
  {
    path: '/weapons',
    name: 'weapons',
    component: function () {
      return import('../views/Weapons.vue')
    }
  },
  {
    path: '/weapons/:id',
    name: 'weaponsDetail',
    component: function () {
      return import('../views/WeaponsDetail.vue')
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
