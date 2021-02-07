import store from '@/store'
import {logout} from 'api/login'
import {getCurrentUser} from 'api/user'


const actions = {
  logout() {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        console.log('退出成功')
        store.commit('removeToken')
        resolve(res)
      }, error => {
        reject(error)
      })
    })
  },
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      getCurrentUser().then(res => {
        store.commit('setCurrentUser', res)
        resolve(res)
      }, err => {
        reject(err)
      })
    })
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
  }
}

export default actions