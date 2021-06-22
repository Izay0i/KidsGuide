<template>
	<div>
		<b-card no-body class="cards">
			<b-tabs card>
				<b-tab
					v-for="tab in tabs"
					v-bind:key="tab.title"
					v-bind:title="tab.title"
				>
					<component v-bind:is="tab.component"></component>
				</b-tab>

				<b-tab title="Tùy chỉnh" v-if="isParamUserID">
					<UserSettings />
				</b-tab>
			</b-tabs>
		</b-card>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

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
					{ component: CardControlPanel, title: 'Bài viết' },
					{ component: UserInfo, title: 'Thông tin' }
				],
				userID: -1
			};
		},
		created: function() {
			this.getUserID();
			this.$store.dispatch('setParamUserID', {
				uid: this.userID,
				paramID: this.$route.params.id
			});
		},
		methods: {
			getUserID: function() {
				const user = JSON.parse(localStorage.getItem('user'));
				if (user != null) {
					this.userID = user.uid;
				}
			},
		},
		computed: {
			...mapGetters({
				isParamUserID: 'isParamUserID'
			})
		}
	}
</script>

<style scoped>
	/* .cards {
		margin: 15%;
	}

	@media screen and (max-width: 1024px) {
		.cards {
			margin: 0;
		}
	} */
</style>