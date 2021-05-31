import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		authenticated: false,
		isAdmin: false,
		isParamUserID: false, //verify if uid === this.$route.params.id
		avatar: ''
	},
	mutations: {
		setAuth(state, flag) {
			state.authenticated = flag;
		},
		setAdmin(state, flag) {
			state.isAdmin = flag;
		},
		setParamUserID(state, flag) {
			state.isParamUserID = flag;
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
		setParamUserID(state, payload) {
			let { uid, paramID } = payload;
			
			try {
				uid = parseInt(uid);
				paramID = parseInt(paramID);
			}
			catch (error) {
				console.log(`Vuex can't parse state var: `, error);
			}

			state.commit('setParamUserID', uid === paramID);
		},
		setAvatar(state, payload) {
			state.commit('setAvatar', payload);
		}
	},
	getters: {
		isAuthenticated: state => state.authenticated,
		isAdmin: state => state.isAdmin,
		isParamUserID: state => state.isParamUserID,
		getAvatar: state => state.avatar
	}
});