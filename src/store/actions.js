import {logout} from 'api/login'
import store from '@/store'

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
  }
}

export default actions