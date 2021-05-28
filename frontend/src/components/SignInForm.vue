<template>
	<div>
		<b-form>
			<b-form-group label="Email:">
				<b-form-input 
					type="email" 
					placeholder="example@mail.com" 
					required
					v-model="signin.email"
				></b-form-input>
			</b-form-group>

			<b-form-group label="Mật khẩu:">
				<b-form-input 
					type="password" 
					required
					v-model="signin.password"
				></b-form-input>
			</b-form-group>
			
			<b-button 
				variant="success" 
				class="mt-2"
				v-on:click="signIn"
			>
				Đăng nhập
			</b-button>
		</b-form>
	</div>
</template>

<script>
	import router from '@/router';

	import AuthService from '@/services/AuthService';

	export default {
		name: 'SignInForm',
		data: function() {
			return {
				signin: {
					email: '',
					password: ''
				}
			};
		},
		methods: {
			signIn: async function() {
				const payload = {
					email: this.signin.email,
					password: this.signin.password
				};

				AuthService.signIn(payload)
				.then(response => {
					//success
					this.$store.dispatch('setAuth', true);
					localStorage.setItem('user', JSON.stringify(response));
					router.push('/home');
					router.go(0); //reload components hack
				})
				.catch(error => {
					console.log(error);
					router.push('/home');
				});
			}
		}
	}
</script>

<style scoped>
	
</style>