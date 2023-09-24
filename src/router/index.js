import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// login
import LoginRegister from '../components/Login.vue'
import Login from '../views/login.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
    {
    path: '/login',
    name: 'login',
    component: LoginRegister

    },
    {
    path: '/register',
    name: 'register',
    component: Login
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
