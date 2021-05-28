<template>
	<div>
		<b-card no-body>
			<b-tabs card>
				<b-tab
					v-for="tab in tabs"
					v-bind:key="tab.title"
					v-bind:title="tab.title"
				>
					<component 
						v-bind:is="tab.component" 
						v-bind:prop_user_id="userID"
					></component>					
				</b-tab>

				<b-tab title="Tùy chỉnh" v-if="isParamUserID">
					<UserSettings v-bind:prop_user_id="userID" />
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import UserInfo from '@/components/UserInfo.vue';
	import CardControlPanel from '@/components/CardControlPanel.vue';
	import UserSettings from '@/components/UserSettings.vue';

	export default {
		namer: 'UserProfile',
		components: {
			UserSettings
		},
		data: function() {
			return {
				tabs: [
					{ component: UserInfo, title: 'Thông tin' },
					{ component: CardControlPanel, title: 'Bài viết' },
					{ component: '', title: 'Bài kiểm tra' }
				],
				userID: -1
			};
		},
		created: function() {
			this.getUserID();
		},
		methods: {
			getUserID: function() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (user != null) {
					this.userID = user.uid;
				}
			}
		},
		computed: {
			isParamUserID: function() {
				return this.userID === parseInt(this.$route.params.id);
			}
		}
	}
</script>

<style scoped>
	.tabs {
		flex-direction: column;
	}
</style>