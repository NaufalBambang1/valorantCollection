import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Agents from '../views/Agents.vue'
import AgentsDetail from '../views/AgentsDetail.vue'
import Weapons from '../views/Weapons.vue'
import WeaponsDetail from '../views/WeaponsDetail.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/agents',
    name: 'agents',
    component: Agents
  },
  {
    path: '/agents/:id',
    name: 'agentsDetail',
    component: AgentsDetail
  },
  {
    path: '/weapons',
    name: 'weapons',
    component: Weapons
  },
  {
    path: '/weapons/:id',
    name: 'weaponsDetail',
    component: WeaponsDetail
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
