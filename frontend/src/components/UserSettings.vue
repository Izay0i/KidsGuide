<template>
	<div class="settings shadow-lg">
		<b-form class="form w-100 m-5">
			<b-form-group label="Email:">
				<b-form-input v-model="user.email"></b-form-input>
			</b-form-group>

			<b-button 
				variant="success" 
				class="mb-5" 
				v-on:click="updateUserEmail"
			>
				Cập nhật email
			</b-button>


			<b-form-group
				v-for="form in form_groups" 
				v-bind:key="form.label" 
				v-bind:label="form.label"
			>
				<b-form-input v-model="user[form.model]" type="password"></b-form-input>
			</b-form-group>

			<div class="buttons">
				<b-button 
					variant="warning" 
					v-on:click="updateUserPassword"
				>
					Cập nhật mật khẩu
				</b-button>
				
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
					email: '',
					password: '',
					repass: ''
				},
				form_groups: [
					{ label: 'Mật khẩu mới:', model: 'password' },
					{ label: 'Nhập lại mật khẩu:', model: 'repass' }
				]
			};
		},
		created: function() {
			this.getUserEmail();
		},
		methods: {
			getUserEmail: async function() {
				UserService.getUserByID(this.$route.params.id)
				.then(response => {
					this.user.email = response.email;
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateUserEmail: async function() {
				if (!this.user.email.length) {
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				const payload = {
					uid: user.uid,
					email: this.user.email
				};

				UserService.updateUserEmail(payload)
				.then(response => {
					console.log(response);
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateUserPassword: async function() {
				if (!this.user.password.length ||
					!this.user.repass.length || 
					!this.verifyPassword) 
				{
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				const payload = {
					uid: user.uid,
					password: this.user.password
				};

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
	input, input:focus, 
	select, select:focus, 
	textarea, textarea:focus 
	{
		background-color: transparent;
		color: #36454f;
		border: 0;
		border-radius: 0;
		border: 2px dashed rgba(0, 0, 0, 0.5);
		box-shadow: none;
	}	

	.settings {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 10px;
		background-color: #e0c9a6;
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
		margin-top: 10vh;
	}
</style>