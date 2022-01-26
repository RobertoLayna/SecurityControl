import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      role: null,
      name: null,
      phone: null
    },
    residentials: []
  },
  mutations: {},
  actions: {
    preLogin() {
      
    },
    login() {

    },
    getResidential(){
      
    }
  },
  modules: {}
})
