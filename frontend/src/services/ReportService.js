import http from '@/http-common';

export default {
	async getReports(payload) {
		let response = await http.get('reports', {
			params: {
				open: payload
			}
		});
		return response.data;
	},
	async createReport(payload) {
		let response = await http.post('reports', payload);
		return response.data;
	},
	async closeReport(id) {
		let response = await http.put(`reports/report/${id}`);
		return response.data;
	}
};