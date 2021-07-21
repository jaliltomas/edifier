import { store } from '../../services'

const state = {
  productsInCart: [],
  cartSummary: [],
  totalAmount: 0,
}

const getters = {
  CART_PRODUCTS: state => state.productsInCart,
  TOTAL_AMOUNT: state => state.totalAmount,
  GET_CART_SUMMARY: state => state.cartSummary,
}

const mutations = {
  SET_ITEM: (state, payload) => {
    state.productsInCart = payload;
  },

  ADD_ITEM: (state, payload) => {
    state.productsInCart.shopping_cart_items.push(payload);
  },

  UPDATE_ITEM: (state, payload) => {
    const indexUpdate = state.productsInCart.shopping_cart_items.findIndex(
      index => payload.product.publication_id == index.publication_id
    );

    if (indexUpdate > -1) {
      if (payload.action == 'plus') {
        state.productsInCart.shopping_cart_items[indexUpdate].original_quantity++;
      }
      if (payload.action == 'minus') {
        state.productsInCart.shopping_cart_items[indexUpdate].original_quantity--;
      }
    }
  },

  REMOVE_ITEM: (state, payload) => {
    const indexDelete = state.productsInCart.shopping_cart_items.findIndex(
      index => payload.publication_id == index.publication_id
    );

    if (indexDelete > -1) {
      state.productsInCart.shopping_cart_items.splice(indexDelete, 1);
    }
  },

  TOTAL_AMOUNT(state, payload) {
    state.totalAmount = payload.items.reduce(
      (acc, arr) => {
        acc = acc + parseFloat(arr.publication.price.pvp) * arr.original_quantity;
        return acc;
      },
      0
    );
  },

  SET_CART_SUMMART: (state, payload) => {
    state.cartSummary = payload;
  },

  CLEAN_CART: (state) => {
    state.productsInCart = [];
    state.cartSummary = [];
    state.totalAmount = 0;
  }
}

const actions = {
  async CREATE_CART(_, payload) {
    try {
      const response = await store.post(
        "api/shooping_carts",
        payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_CURRENT_CART({ commit }, payload) {
    try {
      const response = await store.get(
        "api/shooping_cart_active",
        payload
      );
      commit('SET_ITEM', response.data.data);
      commit("TOTAL_AMOUNT", { items: [...response.data.data.shopping_cart_items] })
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CONFIRM_PRODUCTS_CART(_, payload) {
    try {
      const response = await store.post(
        "api/shooping_carts/check",
        payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
}

export const cart = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
