import router from './router'
import store from './store'
import {Message} from 'element-ui'
import {messageDuration} from './settings'

const whiteList = ['/', '/index','/purchase','/portal','/portal/login', '/portal/reset', '/portal/register']


router.beforeEach(async(to, from, next) => {
  // start progress bar
  // NProgress.start()

  // set page title

  // determine whether the user has logged in
  const hasToken = store.getters.token

  if (hasToken) {
    if (['/portal', '/portal/index'].includes(to.path)) {
      // if is logged in, redirect to the home page
      next({ path: '/backend' })
      // NProgress.done()
    } else {
      const userInfo = store.getters.currentUser
      if (Object.keys(userInfo).length > 0) {
        console.log('内存中存在')
        next()
      } else {
        console.log('内存中不存在')
        try {
          // get user info
          await store.dispatch('getCurrentUser')

          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('resetState')
          // Message({
          //   message: error || '出错了',
          //   type: 'error',
          //   duration: messageDuration
          // })
          next(`/portal`)
          // NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/portal`)
      // NProgress.done()
      Message({
        message: '请先登录',
        type: 'error',
        duration: messageDuration
      })
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})