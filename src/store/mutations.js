const getDefaultState = () => {
  return {
    accessToken: localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '',
    currentUser: {},
    routes: []
  }
}

const mutations = {
  setToken(state, accessToken) {
    state.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)
    console.log('保存token成功')
  },
  removeToken() {
    localStorage.removeItem('accessToken')
    console.log('成功删除token')
  },
  setCurrentUser(state, user) {
    state.currentUser = user
    console.log('设置用户信息成功')
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  },
  setRoutes(state, routes) {
    state.routes = routes
    console.log('设置菜单成功')
  }
}

export default mutations