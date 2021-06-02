import http from '@/http-common';

export default {
	async updateImage(payload) {
		let response = await http.put('images', payload);
		return response.data;
	}
};