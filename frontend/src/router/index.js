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
		name: 'Home',
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
		component: AdminDashboard,
		meta: {
			requiresAuth: true,
			adminPermission: true
		}
	},
	{
		path: '/user/:id',
		name: 'UserProfile',
		component: UserProfile,
		meta: {
			requiresAuth: true
		}
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

//https://www.digitalocean.com/community/tutorials/how-to-set-up-vue-js-authentication-and-route-handling-using-vue-router

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (localStorage.getItem('user') == null) {
			next({ name: 'Home' });
		}
		else {
			const user = JSON.parse(localStorage.getItem('user'));
			if (to.matched.some(record => record.meta.adminPermission)) {
				if (user.role.localeCompare('superuser') == 0) {
					next();
				}
				else {
					next({ name: 'Home' });
				}
			}
			else {
				next();
			}
		}
	}
	else {
		next();
	}
});

export default router;