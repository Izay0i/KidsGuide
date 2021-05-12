import http from '@/http-common';

export default {
	async getBlogPosts() {
		let response = await http.get('posts');
		return response.data;
	},
	async getBlogPostByTitle(payload) {
		let response = await http.get('posts/post', {
			params: {
				title: payload
			}
		});
		return response.data;
	},
	async createBlogPost(body) {
		let response = await http.post('posts', body);
		return response.data;
	},
	async deleteBlogPost(id) {
		let response = await http.delete(`posts/post/${id}`);
		return response.data;
	}
};