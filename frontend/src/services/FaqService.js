import http from '@/http-common';

export default {
	async getFaqs() {
		let response = await http.get('faqs');
		return response.data;
	},
	async getFaqByID(id) {
		let response = await http.get(`faq/${id}`);
		return response.data;
	},
	async getFaqByQuestion(payload) {
		let response = await http.get('faq', { 
			params: { 
				question: payload 
			} 
		});
		return response.data;
	},
	async createFaq(payload) {
		let response = await http.post('faqs', payload);
		return response.data;
	},
	async deleteFaq(id) {
		let response = await http.delete(`faq/${id}`);
		return response.data;
	}
};