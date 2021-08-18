import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Apps from '../views/Apps.vue'
import Help from '../views/Help.vue'
import Profile from '../views/Profile.vue'
import Settings from '../views/Settings.vue'
import Dashboard from '../views/Dashboard.vue'
import store from "../store/index"

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Apps,

    children: [{
        name: 'Dashboard',
        path: '',
        component: Dashboard,
        // beforeEnter(to, from, next) {
        //   if (store.getters.isAuth) {
        //     return next({
        //       path: ""
        //     });
        //   } else {
        //     return next({

        //       path: "/Login"
        //     });
        //   }
        // }

      },
      {
        name: 'Settings',
        path: '/settings',
        component: Settings,


      },
      {
        name: 'Help',
        path: '/help',
        component: Help,

      },
      {
        name: 'Profile',
        path: '/profile',
        component: Profile,
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


// router.beforeEach((to, from, next) => {
//   if (to.name !== 'Login' && !store.getters.isAuth) next({
//     name: 'Login'
//   })
//   else next()
// })