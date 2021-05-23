import http from '@/http-common';
export default {
	async signUp(payload) {
		let response = await http.post('auth/signup', payload);
		return response.data;
	},
	async signIn(payload) {
		let response = await http.post('auth/signin', payload);
		return response.data;
	}
};