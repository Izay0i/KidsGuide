<template>
	<div>
		<b-form>
			<b-form-group label="Tên tài khoản:">
				<b-form-input 
					v-model="signup.name"
					required
				></b-form-input>
			</b-form-group>

			<b-form-group label="Địa chỉ:">
				<b-form-input
					required
					v-model="signup.address"
				></b-form-input>
			</b-form-group>

			<b-form-group label="SĐT:">
				<b-form-input
					type="tel" 
					placeholder="0123456789" 
					required
					v-model="signup.phone"
				></b-form-input>
			</b-form-group>

			<b-form-group label="Email:">
				<b-form-input
					type="email" 
					placeholder="example@mail.com" 
					required
					v-model="signup.email"
				></b-form-input>
			</b-form-group>

			<b-form-group label="Mật khẩu:">
				<b-form-input
					type="password" 
					required
					v-model="signup.password"
				></b-form-input>
			</b-form-group>

			<b-form-group label="Nhập lại mật khẩu:">
				<b-form-input
					type="password" 
					required
					v-model="signup.repass"
				></b-form-input>
			</b-form-group>

			<b-button 
				variant="success"
				v-on:click="signUp"
			>
				Tạo tài khoản
			</b-button>
		</b-form>
	</div>
</template>

<script>
	import router from '@/router';

	import AuthService from '@/services/AuthService';

	export default {
		name: 'SignUpForm',
		data: function() {
			return {
				signup: {
					name: '',
					address: '',
					phone: '',
					email: '',
					password: '',
					repass: ''
				}
			};
		},
		methods: {
			signUp: async function() {
				const payload = JSON.stringify({
					name: this.signup.name,
					address: this.signup.address,
					phone: this.signup.phone,
					email: this.signup.email,
					password: this.signup.password,
				});

				AuthService.signUp(payload)
				.then(response => {
					console.log(response);
					router.push('/home');
				})
				.catch(error => {
					console.log(error, 'No bueno.');
				})
			}
		}
	}
</script>

<style scoped>

</style>