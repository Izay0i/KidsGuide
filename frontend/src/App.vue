<template>
	<div id="app">
		<Navbar />
		<Banner />
		<router-view />
		<router-view name="carousel" />
		<Footer />
	</div>
</template>

<script>
	import Navbar from '@/components/Navbar.vue';
	import Banner from '@/components/Banner.vue';
	//import Card from '@/components/Card.vue';
	import Footer from '@/components/Footer.vue';

	export default {
		name: 'App',
		components: {
			Navbar,
			Banner,
			//Card,
			Footer
		},
		mounted: function() {
			const user = JSON.parse(localStorage.getItem('user'));

			if (user == null) {
				this.$store.dispatch('setAuth', false);
			}
			else {
				this.$store.dispatch('setAuth', true);
				this.$store.dispatch('setAvatar', user.avatar);

				if (user.role.localeCompare('superuser') == 0) {
					this.$store.dispatch('setAdmin', true);
				}
			}
		}
	};
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Avenir, Helvetica, Arial, sans-serif;
	}

	body {
		background-color: #6a92f2 !important;
	}
</style>
