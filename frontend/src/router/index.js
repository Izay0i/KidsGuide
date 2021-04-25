import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminDashboard from '@/components/AdminDashboard.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/'
	},
	{
		path: '/'
	},
	{
		path: '/admin',
		name: 'AdminDashboard',
		component: AdminDashboard
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;