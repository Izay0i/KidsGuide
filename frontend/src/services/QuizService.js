import http from '@/http-common';

export default {
	async getQuizByPostID(id) {
		let response = await http.get(`quizzes/post/${id}`);
		return response.data;
	},
	async addQuiz(payload) {
		let response = await http.post('quizzes', payload);
		return response.data;
	},
	async updateQuiz(payload) {
		let response = await http.put('quizzes', payload);
		return response.data;
	},
	async deleteQuiz(id) {
		let response = await http.delete(`quizzes/post/${id}`);
		return response.data;
	}
};