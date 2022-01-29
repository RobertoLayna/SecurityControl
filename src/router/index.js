import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

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
        path: 'residentials',
        name: 'AdministratorResidentials',
        component: () => import('../components/administrator/Residentials.vue')
      },
      {
        path: 'residential/:id',
        name: 'AdministratorResidentialDetails',
        component: () => import('../components/administrator/ResidentialDetails.vue'),
        props: true
      },
      {
        path: 'residential/:id/config',
        name: 'AdministratorResidenceDetails',
        component: () => import('../components/administrator/ResidenceDetails.vue'),
        props: true
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

router.beforeEach((to, from, next) => {
  const user = store.getters['user']
  console.log(to)
  console.log(from)
  console.log(user)
  if (!user.user_rol) {
    next({name: 'Home'})
  } else {
    if (to.name == 'Home' || to.name == 'Login') {
      if (user.user_rol == 'su_admin') next({name: 'Administrator'})
      if (user.user_rol == 'admin') next({name: 'Administrator'})
      if (user.user_rol == 'security') next({name: 'Security'})
      if (user.user_rol == 'resident') next({name: 'Resident'})
    } else {
      if (user.user_rol == 'su_admin' && !to.path.includes('/administrator')) next({name: 'Administrator'})
      else if (user.user_rol == 'admin' && !to.path.includes('/administrator')) next({name: 'Administrator'})
      else if (user.user_rol == 'security' && !to.path.includes('/security')) next({name: 'Security'})
      else if (user.user_rol == 'resident' && !to.path.includes('/resident')) next({name: 'Resident'})
    }
  }
  next()
})

export default router
