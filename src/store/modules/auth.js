import { users, store, product } from "../../services";

const state = {
  token: null,           // Token del usuario real (afecta UI)
  guestToken: null,      // Token del usuario guest (solo para APIs, no afecta UI)
  user: {},
  isGuestUser: false     // Indica si estamos usando el token guest
};

const getters = {
  AUTHENTICATED: state => (state.token == null ? false : true),  // Solo true con usuario real
  GET_PROFILE: state => state.user,
  IS_GUEST: state => state.isGuestUser,
  // Indica si hay algún token disponible para APIs (guest o real)
  HAS_API_TOKEN: state => state.token != null || state.guestToken != null
};

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload;
    localStorage.setItem("token", payload);
    users.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    store.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
    product.defaults.headers.common["Authorization"] = `Bearer ${payload}`;
  },

  // Token guest: configura headers pero NO cambia state.token (no afecta UI)
  SET_GUEST_TOKEN: (state, payload) => {
    state.guestToken = payload;
    localStorage.setItem("guest_token", payload);
    // Configurar headers de axios con el token guest
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
    state.guestToken = null;
    state.user = {};
    state.isGuestUser = false;
    localStorage.clear();
    // Limpiar headers
    delete users.defaults.headers.common["Authorization"];
    delete store.defaults.headers.common["Authorization"];
    delete product.defaults.headers.common["Authorization"];
  },

  SET_GUEST_USER: (state, isGuest) => {
    state.isGuestUser = isGuest;
    localStorage.setItem('is_guest_user', isGuest ? 'true' : 'false');
  },

  CLEAR_DATA_LOGOUT: state => {
    state.token = null;
    // Mantener el guest token si existe para que las APIs sigan funcionando
    localStorage.removeItem('token');
  }
};

const actions = {
  async LOGIN({ commit, dispatch }, payload) {
    try {
      const response = await users.post("api/auth/login/buyers", payload);
      commit("SET_TOKEN", response.data.data.access_token.token);
      commit("SET_USER", response.data.data.user);
      commit("SET_GUEST_USER", false);  // Login real, no es guest
      
      // Sync guest cart items if any
      await dispatch("cart/SYNC_GUEST_CART", {}, { root: true });
      
      await dispatch("cart/GET_CURRENT_CART", {}, { root: true });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // Login con usuario genérico para APIs - NO afecta el estado de login en UI
  async GUEST_LOGIN({ commit, dispatch }) {
    try {
      // Credenciales del usuario genérico (configurar en backend)
      const guestCredentials = {
        email: 'guest@edifier.com.ar',
        password: 'GuestEdifier2024!',
        store: 3
      };
      
      const response = await users.post("api/auth/login/buyers", guestCredentials);
      // Usar SET_GUEST_TOKEN en lugar de SET_TOKEN (no afecta UI)
      commit("SET_GUEST_TOKEN", response.data.data.access_token.token);
      commit("SET_GUEST_USER", true);  // Marcar como guest
      
      await dispatch("cart/GET_CURRENT_CART", {}, { root: true });
      return response;
    } catch (error) {
      console.log("Error en GUEST_LOGIN:", error);
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
