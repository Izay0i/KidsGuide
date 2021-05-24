import http from '@/http-common';

export default {
	async getUserByID(id) {
		let response = await http.get(`users/user/${id}`);
		return response.data;
	},
	async updateUserInfo(payload) {
		let response = await http.put('users/user/info', payload);
		return response.data;
	}
};