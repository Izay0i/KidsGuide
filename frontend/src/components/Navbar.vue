<template>
	<div>
		<b-navbar class="header">
			<b-nav vertical class="nav-items">
				<b-nav-item v-bind:to="{ name: 'PostCollection' }">
					&nbsp; Các kỹ năng

					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
						<path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
					</svg>
				</b-nav-item>
				
				<b-nav-item v-bind:to="{ name: 'Faq' }">
					&nbsp; FAQ

					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
						<path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
					</svg>
				</b-nav-item>

				<b-nav-item v-bind:to="{ name: 'Terms' }">
					&nbsp; Điều khoản

					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
						<path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
					</svg>
				</b-nav-item>

				<b-nav-item 
					v-bind:to="{ name: 'AdminDashboard' }" 
					v-if="isAdmin"
				>
					&nbsp; Admin

					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
						<path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
					</svg>
				</b-nav-item>
				
				<b-nav-item 
					class="auth-btn" 
					v-bind:to="{ name: 'AuthForm' }" 
					v-if="!authenticated"
				>
					&nbsp; Đăng nhập

					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 152.9 43.4" style="enable-background:new 0 0 152.9 43.4;" xml:space="preserve">
						<path d="M151.9,13.6c0,0,3.3-9.5-85-8.3c-97,1.3-58.3,29-58.3,29s9.7,8.1,69.7,8.1c68.3,0,69.3-23.1,69.3-23.1 s1.7-10.5-14.7-18.4"/>
					</svg>
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
	.nav-items {
		padding: 8px;
	}

	.nav-items * {
		margin-bottom: 3px;
	}

	.nav-items a {
		color: white;
	}

	/* https://codemyui.com/hand-drawn-pencil-circle-hover/ */
	.nav-items svg {
		fill: none;
		stroke: whitesmoke;
		stroke-width: 3;
		stroke-miterlimit: 10;
		stroke-dasharray: 338;
		stroke-dashoffset: 338;
		stroke-linecap: round;
		position: absolute;
		width: calc(100% + 60px);
		opacity: 0;
		transform: translate(-60%, -40%);
		transition: stroke-dashoffset 0s 0.2s, opacity 0.2s;
		z-index: -1;
	}

	.nav-items a:hover svg {
		stroke-dashoffset: 0;
		opacity: 1;
		transition: opacity 0s, stroke-dashoffset 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}
	
	.profile-btn {
		margin-top: 12px;
		margin-left: auto;
		margin-right: auto;
	}
</style>