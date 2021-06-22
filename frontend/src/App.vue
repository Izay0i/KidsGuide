<template>
	<div id="app">
		<GeneralNavbar v-if="!['HomeItem'].includes($route.name)" />

		<router-view v-bind:key="$route.fullPath" />
	</div>
</template>

<script>
	import GeneralNavbar from '@/components/GeneralNavbar.vue';

	export default {
		name: 'App',
		components: {
			GeneralNavbar
		},
		mounted: function() {
			this.getUserToken();
		},
		methods: {
			getUserToken: function() {
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
		background-image: url('assets/empty-blackboard.jpg');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: 100% 100%;
	}
</style>