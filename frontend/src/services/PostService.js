import http from '@/http-common';

export default {
	async getPosts() {
		let response = await http.get('posts');
		return response.data;
	},
	async getPostsByUserID(id) {
		let response = await http.get(`/${id}`);
		return response.data;
	},
	async getPostByTitle(payload) {
		let response = await http.get('posts/post', {
			params: {
				title: payload
			}
		});
		return response.data;
	},
	async createPost(payload) {
		let response = await http.post('posts', payload);
		return response.data;
	},
	async deletePost(id) {
		let response = await http.delete(`posts/post/${id}`);
		return response.data;
	}
};