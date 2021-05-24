<template>
	<div>
		<b-card no-body>
			<b-tabs justified pills card>
				<b-tab
					v-for="tab in tabs"
					v-bind:key="tab.title"
					v-bind:title="tab.title"
				>
					<component v-bind:is="tab.component"></component>					
				</b-tab>

				<b-tab title="Đăng xuất" v-on:click="logOut"></b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import router from '@/router';

	import UserInfo from '@/components/UserInfo.vue';

	export default {
		namer: 'UserProfile',
		data: function() {
			return {
				tabs: [
					{ component: UserInfo, title: 'Thông tin' },
					{ component: '', title: 'Bài viết' },
					{ component: '', title: 'Bài kiểm tra' }
				]
			};
		},
		methods: {			
			logOut: function() {
				localStorage.removeItem('user');
				this.$store.dispatch('setAuth', false);
				this.$store.dispatch('setAdmin', false);
				router.push('/auth');
			}
		}
	}
</script>

<style scoped>

</style>