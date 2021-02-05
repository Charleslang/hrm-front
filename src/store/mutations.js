const mutations = {
  setToken(state, accessToken) {
    state.accessToken = accessToken
    localStorage.setItem('accessToken', accessToken)
    console.log('保存token成功')
  },
  removeToken() {
    localStorage.removeItem('accessToken')
    console.log('成功删除token')
  }
}

export default mutations