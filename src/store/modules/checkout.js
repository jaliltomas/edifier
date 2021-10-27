import { store } from '../../services'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async CHECKOUT_TRANSFER(_, payload) {
        try {
            const response = await store.post(
                `api/payments/bank_transfer`,
                payload
            );
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async UPLOAD_TRANSFER(_, payload) {
        try {
            const response = await store.post(
                `api/transfer/buyers`,
                payload
            );
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },
}

export const checkout = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
