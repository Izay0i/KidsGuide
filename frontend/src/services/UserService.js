import http from '@/http-common';

export default {
	async getUserByID(id) {
		let response = await http.get(`users/user/${id}`);
		return response.data;
	},
	async updateUserEmail(payload) {
		let response = await http.put('users/user/email', payload);
		return response.data;
	},
	async updateUserPassword(payload) {
		let response = await http.put('users/user/password', payload);
		return response.data;
	},
	async updateUserDetails(payload) {
		let response = await http.put('users/user/details', payload);
		return response.data;
	},
	async updateUserInfo(payload) {
		let response = await http.put('users/user/info', payload);
		return response.data;
	}
};