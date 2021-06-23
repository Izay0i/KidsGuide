<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<template v-if="!app_loaded">
				<LoadingScreen />
			</template>
		</transition>
		
		<template v-if="app_loaded">
			<GenericNavbar v-if="!['HomeItem'].includes($route.name)" />

			<router-view v-bind:key="$route.fullPath" />
		</template>
	</div>
</template>

<script>
	import LoadingScreen from '@/components/LoadingScreen.vue';
	import GenericNavbar from '@/components/GenericNavbar.vue';

	export default {
		name: 'App',
		components: {
			LoadingScreen,
			GenericNavbar
		},
		data: function() {
			return {
				app_loaded: false
			};
		},
		mounted: function() {
			setTimeout(() => {
				this.app_loaded = true;
			}, 3000);

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
		background-image: url('assets/empty_blackboard.jpg');
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-size: 100% 100%;
	}

	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>