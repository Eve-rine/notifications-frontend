import Vue from 'vue'
import VueRouter from 'vue-router'
// login
import LoginRegister from '../components/LoginComponent.vue'
import Dashboard from "@/views/Dashboard.vue";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
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
    name: 'loginPage',
    component: LoginRegister,
    },
  {
    path: '/send-notification',
    name: 'SendNotification',
    component: () => import('../components/SendNotification.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})
router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
  }
  return middleware[0]({
    ...context
  })
});
export default router
