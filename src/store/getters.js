const getters = {
  token(state) {
    return state.accessToken
  },
  currentUser(state) {
    return state.currentUser
  }
}

export default getters