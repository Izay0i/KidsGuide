import http from '@/http-common';

export default {
	async getReports() {
		let reponse = await http.get('reports');
		return reponse.data;
	},
	async createReport(payload) {
		let response = await http.post('reports', payload);
		return response.data;
	}
};