import Vue from 'vue'
import Vuex from 'vuex'
import createPersistanceState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    residentials: []
  },
  getters:{
    user(state){
      return state.user
    }
  },
  mutations: {
    user(state, value) {
      state.user = value
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('user', user)
    }
  },
  modules: {},
  plugins: [createPersistanceState()]
})
