<template>
	<div>
		<b-form-select 
			class="select" 
			value-field="value" 
			text-field="name" 
			v-model="selected" 
			v-bind:options="options" 
			v-on:change="getReports"
		></b-form-select>

		<b-card 
			class="mb-2" 
			v-for="report in reports" 
			v-bind:key="report.report_id"
		>
			<b-card-header>
				Báo cáo lúc: {{ report.report_time }}
			</b-card-header>
			<b-card-body>
				<b-card-text class="status">
					Trạng thái: {{ report.open ? 'MỞ' : 'ĐÓNG' }}
				</b-card-text>

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

			<div class="buttons">
				<b-button variant="info" v-on:click="toReportedPost(report.post_id)">Xem bài viết</b-button>
				<b-button 
					variant="danger" 
					v-bind:disabled="!report.open" 
					v-on:click="confirmDeletion(report.post_id)"
				>
					Xóa bài viết
				</b-button>
				<b-button 
					variant="warning" 
					v-bind:disabled="!report.open" 
					v-on:click="confirmClosing(report.report_id)"
				>
					Đóng báo cáo
				</b-button>
			</div>
		</b-card>

		<b-modal 
			id="delete-post-pop-up" 
			title="Xóa bài viết?" 
			ok-title="Có" 
			ok-variant="danger" 
			cancel-title="Hủy" 
			v-on:ok="deleteQuiz"
		></b-modal>

		<b-modal 
			id="close-report-pop-up" 
			title="Đóng báo cáo?" 
			ok-title="Có" 
			ok-variant="danger" 
			cancel-title="Hủy" 
			v-on:ok="closeReport"
		></b-modal>
	</div>
</template>

<script>
	import moment from 'moment';
	import router from '@/router';

	import ReportService from '@/services/ReportService.js';
	import PostService from '@/services/PostService.js';
	import QuizService from '@/services/QuizService.js';

	export default {
		name: 'ReportControlPanel',
		data: function() {
			return {
				selected: true,
				options: [
					{ value: true, name: 'MỞ' },
					{ value: false, name: 'ĐÓNG' }
				],
				reports: [],
				post_id: -1,
				report_id: -1
			};
		},
		mounted: function() {
			this.getReports();
		},
		methods: {
			getReports: async function() {
				ReportService.getReports(this.selected)
				.then(response => {
					this.formatPostTime(response);
					this.reports = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			closeReport: async function() {
				ReportService.closeReport(this.report_id)
				.then(response => {
					console.log(response);
					this.getReports();
				})
				.catch(error => {
					console.log(error);
				});
			},
			deletePost: async function() {
				PostService.deletePost(this.post_id)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
			},
			deleteQuiz: async function() {
				QuizService.deleteQuiz(this.post_id)
				.then(response => {
					console.log(response);
					this.deletePost();
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
			confirmDeletion: function(id) {
				this.post_id = id;
				this.$bvModal.show('delete-post-pop-up');
			},
			confirmClosing: function(id) {
				this.report_id = id;
				this.$bvModal.show('close-report-pop-up');
			},
			formatPostTime: function(arr) {
				arr.forEach(
					(item) => item.report_time = moment(item.report_time).format('DD/MM/YYYY hh:mm:ss A')
				);
			}
		}
	}
</script>

<style scoped>
	.select {
		width: 30%;
		margin-bottom: 10px;
	}

	.status {
		color: darkorange;
		font-weight: bold;
	}

	.buttons * {
		margin-right: 3%;
	}
</style>