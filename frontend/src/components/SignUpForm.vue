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
					v-bind:state="verifyPassword"
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
				//required is not working so... validation checking is mandatory
				if (!this.signup.name.length ||
					!this.signup.address.length ||
					!this.signup.address.length ||
					!this.signup.phone.length ||
					!this.signup.email.length ||
					!this.signup.password.length ||
					!this.signup.repass.length || 
					!this.verifyPassword) 
				{
					return
				}

				const payload = {
					name: this.signup.name,
					address: this.signup.address,
					phone: this.signup.phone,
					email: this.signup.email,
					password: this.signup.password,
				};

				AuthService.signUp(payload)
				.then(response => {
					this.$store.dispatch('setAuth', true);
					localStorage.setItem('user', JSON.stringify(response));
					router.push('/home');
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				})
			}
		},
		computed: {
			verifyPassword: function() {
				if (this.signup.repass.length === 0) {
					return false;
				}

				return this.signup.password.localeCompare(this.signup.repass) === 0 ? true : false;
			}
		}
	}
</script>

<style scoped>

</style>