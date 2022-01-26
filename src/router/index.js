import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/resident',
    name: 'Resident',
    component: () => import('../views/Resident.vue')
  },
  {
    path: '/security',
    name: 'Security',
    component: () => import('../views/Security.vue'),
    children: [
      {
        path: 'scanner',
        name: 'SecurityScanner',
        component: () => import('../components/security/Scanner.vue')
      },
      {
        path: 'service-access',
        name: 'SecurityServiceAccess',
        component: () => import('../components/administrator/SecurityStaff.vue')
      },
      {
        path: 'account',
        name: 'SecurityAccount',
        component: () => import('../components/administrator/Account.vue')
      },
    ]
  },
  {
    path: '/administrator',
    name: 'Administrator',
    component: () => import('../views/Administrator.vue'),
    children: [
      {
        path: 'residential',
        name: 'AdministratorResidential',
        component: () => import('../components/administrator/Residential.vue')
      },
      {
        path: 'securityStaff',
        name: 'AdministratorSecurityStaff',
        component: () => import('../components/administrator/SecurityStaff.vue')
      },
      {
        path: 'account',
        name: 'AdministratorAccount',
        component: () => import('../components/administrator/Account.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
