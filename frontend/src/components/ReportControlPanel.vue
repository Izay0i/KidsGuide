<template>
	<div>
		<b-card 
			class="mb-2" 
			v-for="report in reports" 
			v-bind:key="report.report_id"
		>
			<b-card-header>
				Báo cáo ngày: {{ report.report_time }}
			</b-card-header>
			<b-card-body>
				<b-card-text>
					ID người báo cáo: {{ report.uid }}
				</b-card-text>
				<b-card-text>
					ID bài viết: {{ report.post_id }}
				</b-card-text>
				<b-card-text>
					Lý do: {{ report.reason }}
				</b-card-text>
			</b-card-body>

			<b-button variant="info" v-on:click="toReportedPost(report.post_id)">Link bài viết</b-button>
		</b-card>
	</div>
</template>

<script>
	import moment from 'moment';
	import router from '@/router';

	import ReportService from '@/services/ReportService.js';

	export default {
		name: 'ReportControlPanel',
		data: function() {
			return {
				reports: []
			};
		},
		mounted: function() {
			this.getReports();
		},
		methods: {
			getReports: async function() {
				ReportService.getReports()
				.then(response => {
					this.formatPostTime(response);
					this.reports = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			toReportedPost: function(id) {
				router.push({
					name: 'Post',
					params: { id }
				})
			},
			formatPostTime: function(arr) {
				arr.forEach(
					(item) => item.report_time = moment(item.report_time).format('DD/MM/YYYY hh:mm A')
				);
			}
		}
	}
</script>

<style scoped>

</style>