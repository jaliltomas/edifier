const state = {
  productsInFavorites: localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []
}

const getters = {
  // tokens
  GET_ITEMS: state => state.productsInFavorites
}

const mutations = {
  ADD_ITEM: (state, payload) => {
    const existingProduct = state.productsInFavorites.find(p => payload.id === p.id)

    if (!existingProduct) {
      // if the product does not exist, create a new product object
      state.productsInFavorites.push(payload)
    }

    // update the favorites in local storage too
    localStorage.setItem('favorites', JSON.stringify(state.productsInFavorites))
  },
  REMOVE_ITEM: (state, payload) => {
    const indexOfProduct = state.productsInFavorites.findIndex(p => p.id === payload.id)

    if (indexOfProduct !== -1) {
      state.productsInFavorites.splice(indexOfProduct, 1)
    }

    // update the favorites in local storage too
    localStorage.setItem('favorites', JSON.stringify(state.productsInFavorites))
  }
}

const actions = {}

export const favorites = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
