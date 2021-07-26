import { product, store, decentralized } from '../../services';

const state = {
  productFavorite: [],
  product: [],
  paginate: {},
  categories: [],
  paginateCategories: {}
}

const getters = {
  GET_PRODUCT_FAVORITES: (state) => state.productFavorite,
  GET_PRODUCTS: (state) => state.product,
  GET_PAGINATE_PRODUCT: (state) => state.paginate,
  // CATEGORIAS
  GET_CATGORIES: (state) => state.categories,
  GET_PAGINATE_CATEGORIES: (state) => state.paginateCategories,
}

const mutations = {
  SET_PRODUCT_FAVORITES: (state, payload) => state.productFavorite = payload == null ? [] : [payload],
  SET_PRODUCT: (state, payload) => {
    state.product = payload.data;
    state.paginate = {
      lastPage: payload.lastPage,
      page: payload.page,
      perPage: payload.perPage,
      total: payload.total,
    }
  },
  SET_CATEGORIES: (state, payload) => {
    state.categories = payload.data;
    state.paginateCategories = {
      lastPage: payload.lastPage,
      page: payload.page,
      perPage: payload.perPage,
      total: payload.total,
    }
  },
}

const actions = {
  async GET_PRODUCTS({ commit }, payload) {
    try {
      const response = await store.get(`api/publication/products_store_data?store=${payload.store}&page=${payload.page}&per_page=${payload.per_page}&paginate=${payload.paginate}&product_id=${payload.product_id == undefined ? '' : payload.product_id}&warehouse_id=${payload.warehouse_id}&keywords=${payload.keywords}&brand_ids=${payload.brand_ids}&category_id=${payload.category_id}`);
      commit("SET_PRODUCT", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_AUTH_PRODUCTS({ commit }, payload) {
    try {
      const response = await store.get(
        `/api/publication/products_store_data_auth?page=${payload.page}&per_page=${payload.per_page}&paginate=${payload.paginate}&product_id=${payload.product_id == undefined ? '' : payload.product_id}&keywords=${payload.keywords}&brand_ids=${payload.brand_ids}&category_id=${payload.category_id}`
      );
      commit("SET_PRODUCT", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_CATEGORIES({ commit }, payload) {
    try {
      const response = await store.get(`api/publication/products_store_category?store=${payload.store}&page=${payload.page}&per_page=${payload.per_page}&paginate=${payload.paginate}&warehouse_id=${payload.warehouse_id}`);
      commit("SET_CATEGORIES", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async SHOW_IMAGES(_, payload) {
    try {
      const response = await product.get(
        `api/product/image_product?url=${payload.image}`,
        { responseType: 'blob' }
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async ADD_FAVORITES({ dispatch }, payload) {
    try {
      const response = await store.post(
        `api/buyers/product_favorite`,
        payload
      );
      dispatch('GET_FAVORITES_PRODUCTS', payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_FAVORITES_PRODUCTS({ commit }, payload) {
    try {
      const response = await store.get(
        `api/buyers/product_favorite?page=${payload.page}&per_page=${payload.per_page}&paginate=${payload.paginate}`
      );
      commit('SET_PRODUCT_FAVORITES', response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_STATE(_, payload) {
    try {
      const response = await decentralized.post(`api/country/state`, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CHECKOUT_DO(_, payload) {
    try {
      const response = await store.post(`api/auth_mercado_pago/preference`, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_ANSWER(_, payload) {
    try {
      const response = await store.post(`api/auth_mercado_pago/answer`, payload);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async FEATURED_PRODUCTS(_, payload) {
    try {
      const response = await store.get(`api/publication/index_featured?store_id=${payload.store_id}&warehouse_id=${payload.warehouse_id}&limit=${payload.limit}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async SEARCH_PRODUCTS({ commit }, payload) {
    try {
      const response = await store.get(`api/publication/product_search?page=${payload.page}&per_page=${payload.per_page}&keywords=${payload.keywords}`);
      commit("SET_PRODUCT", response.data.data);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async GET_ORDERS_USER(_, payload) {
    try {
      const response = await store.get(`api/orders/buyer?page=${payload.page}&per_page=${payload.per_page}&date_from=${payload.date_from}&date_to=${payload.date_to}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async LIST_PROMOTIONS(_, payload) {
    try {
      const response = await store.get(
        `api/promotions/?store_id=${payload.store_id}&type=${payload.type}&page=${payload.page}&per_page=${payload.per_page}&paginate=${payload.paginate}`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async CHAZKI_VALIDATE() {
    try {
      const response = await store.get(
        `api/chazki/validate`
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async VALIDATE_PRODUCT_WAREHOUSE(_, payload) {
    try {
      const response = await store.post(
        `api/available/product_in_store`,
        payload
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async ODERS_DETAILS(_, payload) {
    try {
      const response = await store.get(`api/orders/buyer/${payload.id}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async PRODUCTS_BRAND(_, payload) {
    try {
      const response = await product.get(`api/brand/brand?has_publications=${payload.has_publications}&store_id=${payload.store_id}`);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async SUSCRIBE_EMAIL(_, paylaod) {
    try {
      const response = await store.post(`api/subscriptions/email`, paylaod);
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  async PRODUCT_NOTIFICATION_USER(_, paylaod) {
    try {
      const response = await store.post(
        `api/user_product_notification/public`,
        paylaod
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
}

export const products = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
