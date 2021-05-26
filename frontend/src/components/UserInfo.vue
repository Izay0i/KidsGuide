<template>
	<div class="profile shadow-lg">
		<div class="avatar-frame">
			<b-avatar 
				rounded 
				size="20.2rem" 
				class="avatar shadow-lg"
				v-bind:src="user.avatar"
			></b-avatar>
			<b-img class="tape" src="../assets/tape.png"></b-img>
		</div>
		
		<b-form class="form w-100 m-5">
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

			<b-button variant="primary" v-on:click="updateUserInfo">Cập nhật thông tin</b-button>
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
			this.getUserInfo();
		},
		methods: {
			getUserInfo: async function() {
				UserService.getUserByID(this.$route.params.id)
				.then(response => {
					this.user = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateUserInfo: async function() {
				if (!this.user.name.length || 
					!this.user.address.length || 
					!this.user.email.length || 
					!this.user.phone_numb.length)
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
	input, input:focus, select, textarea {
		background-color: beige;
		color: gray;
	}	

	.profile {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: #cfb997;
	}

	@media screen and (max-width: 768px) { /*iPad screen size*/
		.profile {
			flex-direction: column;
			align-items: center;
		}
	}

	.avatar-frame {
		position: relative;
	}

	.avatar {
		border: 20px solid white;
		transform: rotate(358deg);
	}

	.tape {
		transform: scale(0.2) rotate(340deg);
		position: absolute;
		top: -25%;
		left: -85%;
	}

	.form {
		font-style: italic;
	}
</style>