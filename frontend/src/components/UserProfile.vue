<template>
	<div class="profile mx-auto">
		<b-avatar rounded size="5rem"></b-avatar>
		<b-form class="ml-5">
			<b-form-group label="Họ tên:">
				<b-form-input v-model="user.name"></b-form-input>
			</b-form-group>

			<b-form-group label="Địa chỉ:">
				<b-form-input v-model="user.address"></b-form-input>
			</b-form-group>

			<b-form-group label="Email:">
				<b-form-input v-model="user.email"></b-form-input>
			</b-form-group>

			<b-form-group label="SĐT:">
				<b-form-input v-model="user.phone"></b-form-input>
			</b-form-group>
		</b-form>
	</div>
</template>

<script>
	export default {
		namer: 'UserProfile',
		data: function() {
			return {
				user: {
					name: '',
					address: '',
					email: '',
					phone: '',
					avatar: ''
				}
			};
		},
		mounted: function() {
			this.user.name = this.$route.params.id; 
		}
	}
</script>

<style scoped>
	.profile {
		display: flex;
		justify-content: left;
		width: 80%;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: white;
	}
</style>