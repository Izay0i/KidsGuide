<template>
	<div>
		<b-card no-body>
			<b-tabs card>
				<b-tab
					v-for="tab in tabs"
					v-bind:key="tab.title"
					v-bind:title="tab.title"
				>
					<component v-bind:is="tab.component"></component>					
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
		data: function() {
			return {
				tabs: [
					{ component: UserInfo, title: 'Thông tin' },
					{ component: CardControlPanel, title: 'Bài viết' },
					{ component: '', title: 'Bài kiểm tra' },
					{ component: UserSettings, title: 'Tùy chỉnh' }
				]
			};
		}
	}
</script>

<style scoped>

</style>