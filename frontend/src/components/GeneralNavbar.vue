<template>
	<div>
		<b-navbar>
			<b-nav class="nav-items">
				<b-nav-item v-bind:to="{ name: 'HomeItem' }">
					Trang chủ
				</b-nav-item>

				<b-nav-item v-bind:to="{ name: 'PostCollection' }">
					Các kỹ năng
				</b-nav-item>

				<b-nav-item 
					v-bind:to="{ name: 'AdminDashboard' }" 
					v-if="isAdmin"
				>
					Admin
				</b-nav-item>

				<b-nav-item 
					class="auth-btn" 
					v-bind:to="{ name: 'AuthForm' }" 
					v-if="!authenticated"
				>
					Đăng nhập
				</b-nav-item>

				<b-avatar 
					class="profile-btn" 
					v-bind:to="{ name: 'UserProfile', params: { id: userID } }" 
					v-bind:src="avatar" 
					v-if="authenticated"
				></b-avatar>
			</b-nav>
		</b-navbar>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'GeneralNavbar',
		data: function() {
			return {
				userID: -1
			};
		},
		mounted: function() {
			this.getUserID();
		},
		methods: {
			getUserID: function() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (user != null) {
					this.userID = user.uid;
				}
			}
		},
		computed: {
			...mapGetters({
				authenticated: 'isAuthenticated',
				isAdmin: 'isAdmin',
				avatar: 'getAvatar'
			})
		}
	}
</script>

<style scoped>
	.nav-items {
		margin-left: auto;
		margin-right: auto;
		padding: 1%;
	}

	.nav-items a {
		color: white;
	}

	@media screen and (max-width: 414px) { /*iPhone 6/7/8 Plus*/
		.nav-items {
			flex-direction: column;
		}

		.profile-btn {
			margin: 0 auto;
		}
	}
</style>