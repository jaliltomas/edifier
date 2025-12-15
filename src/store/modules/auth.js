import { users, store, product } from "../../services";

const state = {
  token: null,
  user: {}
};

const getters = {
  AUTHENTICATED: state => (state.token == null ? false : true),
  GET_PROFILE: state => state.user
};

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
    localStorage.setItem("token", payload);
    users.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    store.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    product.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
  },

  SET_USER: (state, payload) => {
    state.user = payload;
    localStorage.setItem('store_id', payload.store_id);
    localStorage.setItem('zipcode', payload.zipcode);
  },

  CLEAR_DATA: (state) => {
    state.token = null;
    state.user = {};
    localStorage.clear();
  },

  CLEAR_DATA_LOGOUT: state => {
    state.token = null;
    localStorage.clear();
  }
};

const actions = {
  async LOGIN({ commit, dispatch }, payload) {
    try {
      const response = await users.post("api/auth/login/buyers", payload);
      commit("SET_TOKEN", response.data.data.access_token.token);
      commit("SET_USER", response.data.data.user);
      
      // Sync guest cart items if any
      await dispatch("cart/SYNC_GUEST_CART", {}, { root: true });
      
      dispatch("cart/GET_CURRENT_CART", {}, { root: true });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CODE_VERIFICATION(_, payload) {
    try {
      const response = await users.post("api/buyers/verify_code", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async REGISTER(_, payload) {
    try {
      const response = await users.post("api/buyers", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async AUTH_USER({ commit }) {
    try {
      const store_id = localStorage.getItem('store_id');
      const response = await users.get(`api/buyers/auth/getuser?store_id=${store_id}`);
      commit("SET_USER", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async UPDATE_PROFILE({ commit }, payload) {
    try {
      const response = await users.post("api/buyers/update", payload);
      commit("SET_USER", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async UPDATE_USER({ commit }, payload) {
    try {
      const response = await users.post("api/buyers/update", payload);
      commit("SET_USER", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CHANGE_PASSWORD(_, payload) {
    try {
      const response = await users.post(
        "api/buyers/auth/change_password",
        payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async RECOVERY_PASSWORD(_, payload) {
    try {
      const response = await users.post("api/buyers/forgot_password", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async VERIFY_CODE(_, payload) {
    try {
      const response = await users.post("api/buyers/verify_code", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CHANGE_PASSWORD_RECOVERY(_, payload) {
    try {
      const response = await users.post("api/buyers/new_password", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async LOGOUT({ commit }) {
    try {
      // const response = await users.get("api/auth/logout");
      commit("CLEAR_DATA");
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  TRY_AUTO_LOGIN({ commit, dispatch }) {
    try {
      const token = localStorage.getItem("token");
      
      // Verificar si hay un checkout recién completado para limpiar el carrito
      const checkoutCompleted = localStorage.getItem('checkout_completed');
      if (checkoutCompleted) {
        try {
          const result = JSON.parse(checkoutCompleted);
          if (result.success) {
            commit("cart/CLEAN_CART", null, { root: true });
          }
          localStorage.removeItem('checkout_completed');
          localStorage.removeItem('pending_checkout_cart_id');
        } catch (e) {
          console.log("Error processing checkout result", e);
        }
      }
      
      if (token) {
        commit("SET_TOKEN", token);
        dispatch("cart/GET_CURRENT_CART", {}, { root: true });
        dispatch("AUTH_USER");
        const request = {
          page: 1,
          per_page: 1,
          paginate: false
        };
        dispatch("products/GET_FAVORITES_PRODUCTS", request, { root: true });
        return;
      } else {
        // Load guest cart if available
        dispatch("cart/LOAD_GUEST_CART", {}, { root: true });
        return false;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_ADDRESS() {
    try {
      const response = await users.get("api/addresses");
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async REGISTER_ADDRESS(_, payload) {
    try {
      const response = await users.post("api/addresses", payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async UPDATE_ADDRESS(_, payload) {
    try {
      const response = await users.put(
        `api/addresses/${payload.id}`,
        payload.data
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async DELETE_ADDRESS(_, payload) {
    try {
      const response = await users.delete(`api/addresses/${payload.id}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export const auth = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
