import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminDashboard from '@/components/AdminDashboard.vue';
import AuthForm from '@/components/AuthForm.vue';
import CardCarousel from '@/components/CardCarousel.vue';
import Faq from '@/components/Faq.vue';
import UserProfile from '@/components/UserProfile.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '*',
		redirect: '/home'
	},
	{
		path: '/home',
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
		path: '/user/:id',
		name: 'UserProfile',
		component: UserProfile
	},
	{
		path: '/auth',
		name: 'AuthForm',
		component: AuthForm
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

router.beforeEach((to, from, next) => {
	const publicPages = ['/home'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/home');
	}

	next();
});

export default router;