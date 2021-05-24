import axios from 'axios';
import { authHeader } from '@/services/AuthHeader';

export default axios.create({
	baseURL: 'http://localhost:3000/',
	timeout: 1000,
	headers: {
		'Authorization': 'Bearer ' + authHeader(),
		'Content-type': 'application/json'
	},
	withCredentials: true
});