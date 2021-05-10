<template>
	<div>
		<b-navbar variant="dark" class="mb-3 shadow-lg">
			<p class="dashboard-text">Dashboard</p>
		</b-navbar>

		<CardControlPanel />

		<hr/>

		<FaqControlPanel />
	</div>
</template>

<script>
	import CardControlPanel from '@/components/CardControlPanel.vue';
	import FaqControlPanel from '@/components/FaqControlPanel.vue';

	export default {
		name: 'AdminDashboard',
		components: {
			CardControlPanel,
			FaqControlPanel
		},
		data: function() {
			return {
				comps: [
					CardControlPanel,
					FaqControlPanel
				]
			};
		}
	};
</script>

<style scoped>
	.dashboard-text {
		color: white;
		font-size: 46px;
		font-weight: bold;
		margin: auto;
	}
</style>