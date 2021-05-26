<template>
	<div class="settings shadow-lg">
		<b-form class=" form w-100 m-5">
			<b-form-group label="Mật khẩu mới:">
				<b-form-input type="password" v-model="user.password"></b-form-input>
			</b-form-group>

			<b-form-group label="Mật khẩu mới:">
				<b-form-input type="password" v-model="user.repass"></b-form-input>
			</b-form-group>

			<div class="buttons">
				<b-button variant="primary" v-on:click="updateUserPassword">Cập nhật mật khẩu</b-button>
				<b-button variant="danger" v-on:click="logOut">Đăng xuất</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
	import router from '@/router';

	import UserService from '@/services/UserService.js';

	export default {
		name: 'UserSettings',
		data: function() {
			return {
				user: {
					password: '',
					repass: ''
				}
			};
		},
		methods: {
			updateUserPassword: function() {
				if (!this.user.password.length ||
					!this.user.repass.length || 
					!this.verifyPassword) 
				{
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				const payload = JSON.stringify({
					uid: user.uid,
					password: this.user.password
				});

				UserService.updateUserPassword(payload)
				.then(response => {
					console.log(response);
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				});
			},
			logOut: function() {
				localStorage.removeItem('user');
				this.$store.dispatch('setAuth', false);
				this.$store.dispatch('setAdmin', false);
				router.push('/auth');
			}
		},
		computed: {
			verifyPassword: function() {
				return this.user.password.localeCompare(this.user.repass) === 0 ? true : false;
			}
		}
	}
</script>

<style scoped>
	input, input:focus, select, textarea {
		background-color: beige;
		color: gray;
	}	

	.settings {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: #cfb997;
	}

	.form {
		font-style: italic;
	}

	.buttons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
	}

	.buttons > :nth-last-child(1) {
		margin-top: 20%;
	}
</style>