import {doGet} from 'utils/request'
import qs from 'qs'
import {page404} from '@/settings'
import path from 'path'

function getMenu4User() {
  return doGet({
    url: '/menu/menu'
  })
}

function resolvePath(parent, child) {
  return path.resolve(parent, child)
}

function createRoutes(routes) {
  let routesArr = []
  routes.forEach(router => {
    let { path, name, icon, component, children } = router
    if (children && children instanceof Array && children.length > 0) {
      children = createRoutes(children)
    }
    let finalRoutes = {
      path, 
      name, 
      icon,
      component: () => import(`@/${component}.vue`), 
      children
    }
    routesArr.push(finalRoutes)
  })
  return routesArr
}

export function initRoutes(router, store) {
  return new Promise((resolve, reject) => {
    if (store.getters.routes.length > 0) {
      return store.getters.routes
    } else {
      getMenu4User().then(res => {
        if (res) {
          console.log(res)
          let routes = createRoutes(res.data)
          routes.push(page404)
          console.log(routes)
          router.addRoutes(routes)
          // store.dispatch('getRoutes', routes)
          resolve(routes)
        }
      }, err => {
        reject(err)
      })
    }
  })
}

export function getMenuByRoleId(id) {
  return doGet({
    url: '/menu/menu/' + id
  })
}

export function getAllMenus() {
  return doGet({
    url: '/menu/all'
  })
}
