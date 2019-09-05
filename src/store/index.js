import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state.js'
import mutations from './mutations.js'
import getters from './getters.js'
import actions from './actions.js'

let env = process.env.NODE_ENV

Vue.config.devtools = env == 'development'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  plugins: [createPersistedState()]
})