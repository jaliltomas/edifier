import { store } from '../../services'

const state = {
  productsInCart: { shopping_cart_items: [] },
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
    state.productsInCart.shopping_cart_items.push({
      publication_id: payload.id,
      original_quantity: payload.original_quantity,
      publication: payload
    });
    if (!localStorage.getItem('token')) {
      localStorage.setItem('guest_cart', JSON.stringify(state.productsInCart));
    }
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
    if (!localStorage.getItem('token')) {
      localStorage.setItem('guest_cart', JSON.stringify(state.productsInCart));
    }
  },

  UPDATE_ITEM_QUANTITY: (state, payload) => {
    const index = state.productsInCart.shopping_cart_items.findIndex(
      p => p.publication_id === payload.publication_id
    );
    if (index > -1) {
      state.productsInCart.shopping_cart_items[index].original_quantity = payload.quantity;
      if (!localStorage.getItem('token')) {
          localStorage.setItem('guest_cart', JSON.stringify(state.productsInCart));
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
    if (!localStorage.getItem('token')) {
      localStorage.setItem('guest_cart', JSON.stringify(state.productsInCart));
    }
  },

  TOTAL_AMOUNT(state, payload) {
    if (payload && payload.items) {
      state.totalAmount = payload.items.reduce(
        (acc, arr) => {
          acc = acc + parseFloat(arr.publication.price.pvp) * arr.original_quantity;
          return acc;
        },
        0
      );
    }
  },

  SET_CART_SUMMART: (state, payload) => {
    state.cartSummary = payload;
  },

  CLEAN_CART: (state) => {
    state.productsInCart = { shopping_cart_items: [] };
    state.cartSummary = [];
    state.totalAmount = 0;
    localStorage.removeItem('guest_cart');
  },
  
  LOAD_GUEST_CART_MUTATION: (state, payload) => {
      state.productsInCart = payload;
  }
}

const actions = {
  async LOAD_GUEST_CART({ commit }) {
      const guestCart = localStorage.getItem('guest_cart');
      if (guestCart) {
          const parsedCart = JSON.parse(guestCart);
          commit('LOAD_GUEST_CART_MUTATION', parsedCart);
          commit('TOTAL_AMOUNT', { items: parsedCart.shopping_cart_items });
      }
  },

  async SYNC_GUEST_CART({ state, dispatch }) {
      const guestCart = localStorage.getItem('guest_cart');
      if (guestCart) {
          const parsedCart = JSON.parse(guestCart);
          if (parsedCart.shopping_cart_items && parsedCart.shopping_cart_items.length > 0) {
              const itemsToSync = parsedCart.shopping_cart_items.map(item => ({
                  publication_id: item.publication_id,
                  quantity: item.original_quantity
              }));
              
              // We use CREATE_CART to sync. 
              // NOTE: API behavior of CREATE_CART needs to be verified if it *adds* to existing or *replaces*.
              // Assuming it adds/updates based on `ProductDetails.vue` logic.
              await dispatch('CREATE_CART', { items: itemsToSync });
              
              // Clear guest cart after sync
              localStorage.removeItem('guest_cart');
          }
      }
  },

  async SHIPPING_QUOTE_ARG(_, payload) {
    try {
      const response = await store.post(
        "api/quote_arg",
        payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

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

  async GET_CURRENT_CART({ commit, state }, payload) {
    try {
      if (!localStorage.getItem('token')) {
           // Return local state mocked as response
           return { data: { data: state.productsInCart } };
      }
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
