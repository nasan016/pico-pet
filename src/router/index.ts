import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Credits from '../views/Credits.vue'
import Game from '../views/Game.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/credits',
      name: 'credits',
      component: Credits
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
