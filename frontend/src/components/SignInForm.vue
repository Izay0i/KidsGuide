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

			<b-form-checkbox>Nhớ tài khoản</b-form-checkbox>
			<b-button type="submit" variant="primary" class="mt-2">Đăng nhập</b-button>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'SignInForm',
		data: function() {
			return {
				signin: {
					email: '',
					password: ''
				}
			};
		}
	}
</script>

<style scoped>
	
</style>