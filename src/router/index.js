import Vue from 'vue'
import VueRouter from 'vue-router'

// import Layout from '@/layout'
import Layout from 'components/layout'

const PortalIndex = () => import('views/portal/index')
const PortalMain = () => import('views/portal/components/PortalMain')
const Purchase = () => import('views/portal/components/Purchase')

const Login = () => import('views/login/Login')
const LoginMain = () => import('views/login/components/LoginMain')
const ResetPwd = () => import('views/login/components/ResetPwd')
const Register =() => import('views/login/components/Register')

const Dasboard = () => import('views/dashboard/index')

Vue.use(VueRouter)

const constantRoutes = [
  {
    path: '/404',
    component: () => import('views/404'),
    name: '404',
    hidden: true
  },
  {
    path: '/portal',
    component: Login,
    name: '登录',
    redirect: '/portal/login',
    children: [
      {path: 'login', name: 'Login', component: LoginMain},
      {path: 'reset', name: 'ResetPwd', component: ResetPwd},
      {path: 'register', name: 'Register', component: Register}
    ]
  },
  {
    path: '/',
    redirect: '/index',
    component: PortalIndex,
    name: '前端',
    children: [
      { path: '/index',name: 'PortalMain',component: PortalMain },
      { path: '/purchase',name: 'Purchase',component: Purchase }

    ]
  },
  {
    path: '/backend',
    redirect: '/backend/dasboard',
    component: Layout,
    name: '后端',
    children: [
      { path: 'dasboard',name: 'Dasboard',component: Dasboard ,
        children: [
          {path: 'c1', name: '子元素1', component: () => import('views/C1')}
        ]
      },
      {path: 'c2', name: '子元素2', component: () => import('views/C2')}
    ]
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   name: '重定向',
  //   hidden: true
  // }

]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const createRouter = () => new VueRouter({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router