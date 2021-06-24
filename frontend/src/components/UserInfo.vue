<template>
	<div class="profile shadow-lg">
		<div class="avatar-frame">
			<b-img class="tape" src="../assets/duct_tape.png"></b-img>
			
			<b-avatar 
				rounded 
				size="20.2rem" 
				class="avatar shadow-lg" 
				v-bind:src="user.avatar"
			></b-avatar>
		</div>
		
		<b-form class="form w-100 m-5">
			<div class="avatar-input">
				<b-form-group label="Ảnh đại diện:" v-if="isParamUserID">
					<b-form-file 
						accept=".jpg, .png, .gif" 
						v-model="form_file"
					></b-form-file>
				</b-form-group>
				
				<b-button 
					variant="info" 
					v-on:click="updateUserAvatar" 
					v-if="isParamUserID"
				>
					Cập nhật ảnh đại diện
				</b-button>
			</div>

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
	import ImageService from '@/services/ImageService.js';

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
				form_file: null,
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
			updateUserAvatar: async function() {
				if (!this.isFileImageValid) {
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				let formData = new FormData();
				formData.append('type', 'users');
				formData.append('id', user.uid);
				formData.append('avatar', this.form_file);

				ImageService.updateImage(formData)
				.then(response => {
					this.user.avatar = response.path;

					localStorage.setItem('user', JSON.stringify({ 
						...user,
						avatar: response.path
					}));
					
					router.go(0);
				})
				.catch(error => {
					console.log(error);
				})
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
					
					this.getUserDetails();
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		computed: {
			isFileImageValid: function() {
				if (this.form_file == null) {
					return false;
				}

				return true;
			},
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
		border: 2px dashed rgba(0, 0, 0, 0.5);
		box-shadow: none;
	}	

	.profile {
		display: flex;
		justify-content: space-evenly;
		height: auto;
		padding: 20px;
		border-radius: 10px;
		background-color: #e0c9a6;
	}

	.avatar-frame {
		position: relative;
	}

	.tape {
		position: absolute;
		right: 0;
		transform: scale(0.2) rotate(340deg) translate(40%, -200%);
		z-index: 10000;
	}

	.avatar {
		border: 20px solid white;
		transform: rotate(358deg);
	}

	.form {
		font-style: italic;
	}

	.avatar-input {
		display: flex;
		align-items: center;
	}

	.avatar-input > * {
		margin-right: 20px;
	}

	.avatar-input > :nth-last-child(1) {
		margin-top: 14px;
	}

	@media screen and (max-width: 768px) { /*iPad screen size*/
		.profile {
			flex-direction: column;
			align-items: center;
		}
	}
</style>