import Vue from 'vue'
import Vuex from 'vuex'

import { auth } from './modules/auth'
import { products } from './modules/products'
import { cart } from './modules/cart'
import { favorites } from './modules/favorites'
import { country } from './modules/country'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search: false,
  },
  mutations: {
    activeSearch: ((state) => state.search = !state.search)
  },
  actions: {},
  modules: {
    auth,
    products,
    cart,
    favorites,
    country
  },
  getters: {
    activeSearchValue: (state => state.search)
  }
})
