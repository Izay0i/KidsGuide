<template>
	<div>
		<b-form>
			<b-form-group label="Tên tài khoản:">
				<b-form-input 
					v-model="signup.name"
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

			<b-button type="submit" variant="primary">Tạo tài khoản</b-button>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'SignUpForm',
		data: function() {
			return {
				signup: {
					name: '',
					email: '',
					password: '',
					repass: ''
				}
			};
		}
	}
</script>

<style scoped>

</style>