import http from '@/http-common';

export default {
	async getBlogPosts() {
		let response = await http.get('blogs');
		return response.data;
	},
	async getBlogPostByTitle(payload) {
		let response = await http.get('blog', {
			params: {
				title: payload
			}
		});
		return response.data;
	},
	async createBlogPost(body) {
		let response = await http.post('blogs', body);
		return response.data;
	},
	async deleteBlogPost(id) {
		let response = await http.delete(`blog/${id}`);
		return response.data;
	}
};