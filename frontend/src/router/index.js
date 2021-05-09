import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminDashboard from '@/components/AdminDashboard.vue';
import LoginForm from '@/components/LoginForm.vue';
import CardCarousel from '@/components/CardCarousel.vue';
import Faq from '@/components/Faq.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/'
	},
	{
		path: '/',
		components: {
			carousel: CardCarousel
		}
	},
	{
		path: '/faqs',
		name: 'Faq',
		component: Faq
	},
	{
		path: '/admin',
		name: 'AdminDashboard',
		component: AdminDashboard
	},
	{
		path: '/login',
		name: 'LoginForm',
		component: LoginForm
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;