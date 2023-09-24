import Vue from 'vue'
import VueRouter from 'vue-router'
// login
import LoginRegister from '../components/LoginComponent.vue'
import Dashboard from "@/views/Dashboard.vue";
import Authentication from "@/middleware/Auth";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      middleware: [Authentication],
    },
  },
    {
    path: '/login',
    name: 'loginPage',
    component: LoginRegister,
    },
  {
    path: '/notify',
    name: 'SendNotification',
    component: () => import('../components/SendNotification.vue'),
    meta: {
      middleware: [Authentication],
    },
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
