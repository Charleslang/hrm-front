const getters = {
  token(state) {
    return state.accessToken
  },
  currentUser(state) {
    return state.currentUser
  },
  routes(state){
    return state.routes
  }
}

export default getters