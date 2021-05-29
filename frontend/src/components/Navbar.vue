<template>
	<div>
		<b-navbar class="header">
			<b-nav pills class="nav-items">
				<b-nav-item 
					class="home" 
					v-bind:to="{ name: 'Home' }"
				>
					Trang chủ
				</b-nav-item>
				
				<b-nav-item>
					Các kỹ năng khác
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
		name: 'Navbar',
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
	};
</script>

<style scoped>
	.header {		
		background-color: #049dd9;
	}

	.nav-items {
		width: 100%;
		padding: 10px;
	}

	.nav-items a {
		color: white;
	}

	.nav-items a:hover {
		color: #04d9b2;
	}

	.home {
		border-radius: 20px;
		background-color: #f272d0;
	}

	.home a:hover {
		color: #f2bc57;
	}

	.auth-btn {
		margin-left: auto;
		border-radius: 20px;
		background-color: #4abfd9;
	}

	.auth-btn a:hover {
		color: #f2bc57;
	}

	.profile-btn {
		margin-left: auto;
	}

	@media screen and (max-width: 414px) { /*iPhone 6/7/8 Plus*/
		.nav-items {
			flex-direction: column;
		}

		.profile-btn {
			margin-right: auto;
		}
	}
</style>