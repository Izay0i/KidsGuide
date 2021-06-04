<template>
	<div>
		<Banner />

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

	import Banner from '@/components/Banner.vue';
	import UserInfo from '@/components/UserInfo.vue';
	import CardControlPanel from '@/components/CardControlPanel.vue';
	import UserSettings from '@/components/UserSettings.vue';

	export default {
		namer: 'UserProfile',
		components: {
			Banner,
			UserSettings
		},
		data: function() {
			return {
				tabs: [
					{ component: UserInfo, title: 'Thông tin' },
					{ component: CardControlPanel, title: 'Bài viết' }
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