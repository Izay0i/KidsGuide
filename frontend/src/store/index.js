import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		authenticated: false,
		isAdmin: false,
		avatar: ''
	},
	mutations: {
		setAuth(state, flag) {
			state.authenticated = flag;
		},
		setAdmin(state, flag) {
			state.isAdmin = flag;
		},
		setAvatar(state, payload) {
			state.avatar = payload;
		}
	},
	actions: {
		setAuth(state, flag) {
			state.commit('setAuth', flag);
		},
		setAdmin(state, flag) {
			state.commit('setAdmin', flag);
		},
		setAvatar(state, payload) {
			state.commit('setAvatar', payload);
		}
	},
	modules: {},
	getters: {
		isAuthenticated: state => state.authenticated,
		isAdmin: state => state.isAdmin,
		getAvatar: state => state.avatar
	}
});