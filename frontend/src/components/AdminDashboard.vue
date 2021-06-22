<template>
	<div>
		<b-navbar variant="primary" class="shadow-lg">
			<p class="dashboard-text">Bảng điều khiển</p>
		</b-navbar>

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
	import ReportControlPanel from '@/components/ReportControlPanel.vue';
	import FaqControlPanel from '@/components/FaqControlPanel.vue';

	export default {
		name: 'AdminDashboard',
		components: {
			FaqControlPanel
		},
		data: function() {
			return {
				tabs: [
					{ component: ReportControlPanel, title: 'Báo cáo' },
					{ component: FaqControlPanel, title: 'FAQ' }
				]
			};
		}
	};
</script>

<style scoped>
	.dashboard-text {
		color: white;
		font-size: 26px;
		margin: auto;
	}
</style>