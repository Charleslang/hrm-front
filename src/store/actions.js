import store from '@/store'
import router from '@/router'
import {logout} from 'api/login'
import {getCurrentUser} from 'api/user'
import {initRoutes} from 'api/menu'
import { resetRouter } from '@/router'


const actions = {
  logout() {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        console.log('退出成功')
        store.commit('removeToken') // 必须先移除 token
        resetRouter()
        store.commit('resetState')
        resolve(res)
      }, error => {
        reject(error)
      })
    })
  },
  getCurrentUser() {
    return Promise.all([
      new Promise((resolve, reject) => {
        getCurrentUser().then(res => {
          store.commit('setCurrentUser', res)
          resolve()
        }, err => {
          reject(err)
        })
      }),
      new Promise((resolve, reject) => {
        initRoutes(router, store).then(res => {
          store.commit('setRoutes', res)
          console.log(router)
          resolve()
        }, err => {
          reject(err)
        })
      })
    ])
    // return new Promise((resolve, reject) => {
    //   getCurrentUser().then(res => {
    //     store.commit('setCurrentUser', res)
    //     resolve(res)
    //   }, err => {
    //     reject(err)
    //   })
    // })
  },
  resetState({commit}) {
    return new Promise((resolve, reject) => {
      commit('removeToken')
      commit('resetState')
      resolve()
    })
  },
  refreshToken({commit}, token) {
    return new Promise(resolve => {
      commit('setToken',token)
      resolve()
    })
  },
  getRoutes({commit}, routes) {
    return new Promise((resolve, reject) => {
      commit('setRoutes', routes)
      resolve()
    })
  }
}

export default actions