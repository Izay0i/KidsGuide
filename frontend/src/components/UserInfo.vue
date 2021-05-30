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
			<b-form-group label="Ảnh đại diện:" v-if="isParamUserID">
				<b-form-file accept=".jpg, .png, .gif"></b-form-file>
			</b-form-group>
			
			<b-form-group
				v-for="form in form_groups" 
				v-bind:key="form.label" 
				v-bind:label="form.label" 
				v-bind:disabled="!isParamUserID"
			>
				<b-form-input v-model="user[form.model]"></b-form-input>
			</b-form-group>

			<b-button 
				variant="primary" 
				v-on:click="updateUserDetails" 
				v-if="isParamUserID"
			>
				Cập nhật thông tin
			</b-button>
		</b-form>
	</div>
</template>

<script>
	import router from '@/router';
	import { mapGetters } from 'vuex';

	import UserService from '@/services/UserService.js';

	export default {
		name: 'UserInfo',
		data: function() {
			return {
				user: {
					name: '',
					address: '',
					phone_numb: '',
					avatar: ''
				},
				form_groups: [
					{ label: 'Họ tên:', model: 'name' },
					{ label: 'Địa chỉ:', model: 'address' },
					{ label: 'SĐT:', model: 'phone_numb' }
				]
			};
		},
		created: function() {
			this.getUserDetails();
		},
		methods: {
			getUserDetails: async function() {
				UserService.getUserByID(this.$route.params.id)
				.then(response => {
					this.user = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateUserDetails: async function() {
				if (!this.user.name.length || 
					!this.user.address.length || 
					!this.user.phone_numb.length)
				{
					return;
				}
				
				const user = JSON.parse(localStorage.getItem('user'));
				const payload = { uid: user.uid, ...this.user };

				UserService.updateUserDetails(payload)
				.then(response => {
					this.user = response;
					//reset local storage and reload
					localStorage.setItem('user', JSON.stringify({ 
						...user,
						avatar: response.avatar
					}));
					
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		computed: {
			...mapGetters({
				isParamUserID: 'isParamUserID'
			})
		}
	}
</script>

<style scoped>
	input[type="text"], input:focus, 
	select, select:focus, 
	textarea, textarea:focus
	{
		background-color: transparent;
		color: #36454f;
		border: 0;
		border-radius: 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.5);
		box-shadow: none;
	}	

	.profile {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: #cfb997;
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
		top: -30%;
		left: -85%;
	}

	.form {
		font-style: italic;
	}

	@media screen and (max-width: 768px) { /*iPad screen size*/
		.profile {
			flex-direction: column;
			align-items: center;
		}
	}
</style>