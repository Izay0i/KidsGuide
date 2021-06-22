import http from '@/http-common';

export default {
	async getAllFavorites() {
		let response = await http.get('favorites');
		return response.data;
	},
	async getAllFavByUID(id) {
		let response = await http.get(`favorites/user/${id}`);
		return response.data;
	},
	async getFavCountByPostID(id) {
		let response = await http.get(`favorites/post/${id}`);
		return response.data;
	},
	async createFavorite(payload) {
		let response = await http.post('favorites', payload);
		return response.data;
	},
	async deleteFavorite(id) {
		let response = await http.delete(`favorites/fav/${id}`);
		return response.data;
	}
};