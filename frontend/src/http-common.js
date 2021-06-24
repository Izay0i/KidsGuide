import axios from 'axios';
import { authHeader } from '@/services/AuthHeader';

export default axios.create({
	baseURL: '/',
	timeout: 30000,
	headers: {
		'Authorization': 'Bearer ' + authHeader(),
		'Content-type': 'application/json'
	},
	withCredentials: true
});