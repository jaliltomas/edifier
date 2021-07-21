import { decentralized } from '../../services'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    async GET_STATES() {
        try {
            const request = { "country_id": 1 };
            const response = await decentralized.post(
                "api/country/state",
                request
            );
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async GET_LOCALITIES(_, payload) {
        try {
            const response = await decentralized.post(
                "api/country/location",
                payload
            );
            return response;
        } catch (error) {
            return Promise.reject(error);
        }
    },

}

export const country = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
