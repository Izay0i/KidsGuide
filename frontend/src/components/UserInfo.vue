<template>
	<div class="profile shadow-lg">
		<b-avatar 
			rounded 
			size="20.2rem" 
			class="shadow-lg"
			v-bind:src="user.avatar"
		></b-avatar>
		
		<b-form class="form w-100 my-5">
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
				<b-form-input v-model="user.phone_numb"></b-form-input>
			</b-form-group>

			<b-form-group label="Ảnh đại diện:">
				<b-form-input v-model="user.avatar"></b-form-input>
			</b-form-group>

			<b-button variant="warning" v-on:click="updateUserDetails">Cập nhật thông tin</b-button>
		</b-form>
	</div>
</template>

<script>
	import router from '@/router';

	import UserService from '@/services/UserService.js';

	export default {
		name: 'UserInfo',
		data: function() {
			return {
				user: {
					name: '',
					address: '',
					email: '',
					phone_numb: '',
					avatar: ''
				}
			};
		},
		created: function() {
			this.getUserDetails();
		},
		methods: {
			getUserDetails: async function() {
				UserService.getUserByID(this.$route.params.id)
				.then(response => {
					this.user = response[0];
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateUserDetails: async function() {
				if (!this.user.name.length || 
					!this.user.address.length || 
					!this.user.email.length || 
					!this.user.phone_numb.length || 
					!this.user.avatar.length)
				{
					return;
				}
				
				const user = JSON.parse(localStorage.getItem('user'));
				const payload = JSON.stringify({ uid: user.uid, ...this.user});

				UserService.updateUserInfo(payload)
				.then(response => {
					this.user = response;
					//reset local storage and reload
					localStorage.setItem('user', JSON.stringify({ 
						uid: user.uid, 
						role: user.role, 
						email: response.email,
						avatar: response.avatar,
						accessToken: user.accessToken
					}));
					
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
	.form {
		color: #f2bc57;
	}

	.profile {
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		align-items: center;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: #049dd9;
	}
</style>