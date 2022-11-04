import Vue from 'vue'
import VueRouter from 'vue-router'
import userManage from '../views/home/userManage.vue'
import * as masEncrypt from "@/util/masEncrypt-es-min.js";

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/login.vue')
},
{
  path: '/home',
  name: 'Home',
  component: () => import('../views/Home.vue'),
  children: [{
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home/index',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/home/everytip',
    component: () => import('../views/home/everytip.vue')
  },
  {
    path: '/home/userManage',
    component: userManage
  },
  ]
},
{
  path: '*',
  redirect: '/login'
},
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  console.log(to);
  let isLogin = 0
  let code = window.localStorage.getItem('loginCode',)
  if (code) {
    code = masEncrypt.default.decode(code, 'matrixYYDS')
    if (code.login == 1) {
      window.sessionStorage.setItem('empid', 1)
      isLogin=1
    }
  }
  if (!window.sessionStorage.getItem('empid') && to.path != '/login' && isLogin==0) next('/login')
  else if (isLogin==1 && to.path=='/login') {
    next('/home/index')
  }
  else next()

})
export default router