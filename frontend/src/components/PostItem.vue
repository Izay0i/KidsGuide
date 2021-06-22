<template>
	<div>
		<div class="body shadow-lg">
			<b-dropdown 
				variant="light"
				size="sm" 
				right 
				class="dropdown"
			>
				<b-dropdown-item v-on:click="addFavorite">
					<b-icon variant="warning" icon="bookmark"></b-icon> &nbsp; Lưu bài viết
				</b-dropdown-item>
				<b-dropdown-item v-on:click="confimReport">
					<b-icon variant="danger" icon="exclamation-triangle"></b-icon> &nbsp; Báo cáo bài viết
				</b-dropdown-item>
			</b-dropdown>

			<h1>{{ post.title }}</h1>

			<b-img-lazy 
				fluid-grow 
				alt="Thumbnail" 
				v-bind:src="post.thumbnail"
			></b-img-lazy>

			<b-embed 
				type="iframe" 
				aspect="16by9" 
				allowfullscreen 
				v-if="post.vid_url"
				v-bind:src="post.vid_url"
			></b-embed>

			<p>Ngày đăng: {{ post.post_time }}</p>
			<p>{{ post.content }}</p>

			<QuizDisplay v-bind:prop_quizzes="quizzes" />

			<b-badge 
				class="tags"
				v-for="tag in post.tags" 
				v-bind:key="tag"
			>
				{{ tag }}
			</b-badge>
		</div>

		<b-modal 
			id="report-pop-up" 
			title="Báo cáo bài viết" 
			ok-title="Gửi" 
			ok-variant="danger" 
			cancel-title="Hủy" 
			v-on:ok="handleOk" 
			v-on:hidden="resetReportForm"
		>
			<b-form v-on:submit.stop.prevent="addReport">
				<b-form-group label="Lý do:">
					<b-form-input required v-model="reason"></b-form-input>
				</b-form-group>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import moment from 'moment';

	import QuizDisplay from '@/components/QuizDisplay.vue';

	import PostService from '@/services/PostService.js';
	import QuizService from '@/services/QuizService.js';
	import ReportService from '@/services/ReportService.js';
	import FavService from '@/services/FavService.js';

	export default {
		name: 'PostItem',
		components: {
			QuizDisplay
		},
		data: function() {
			return {
				post: {
					title: '',
					content: '',
					thumbnail: '',
					vid_url: '',
					post_time: '',
					tags: []
				},
				quizzes: [],
				reason: ''
			};
		},
		created: function() {
			this.getPostByID();
			this.getQuizByPostID();
		},
		methods: {
			getPostByID: async function() {
				PostService.getPostByID(this.$route.params.id)
				.then(response => {
					response.post_time = moment(response.post_time).format('DD/MM/YYYY hh:mm A');
					this.post = response;
				})
				.catch(error => {
					console.log(error);
				})
			},
			getQuizByPostID: async function() {
				QuizService.getQuizByPostID(this.$route.params.id)
				.then(response => {
					this.quizzes = response.content;
				})
				.catch(error => {
					console.log(error);
				});
			},
			addReport: async function() {
				if (!this.isReasonValid) {
					return;
				}

				const user = JSON.parse(localStorage.getItem('user'));
				let payload = {
					uid: user.uid,
					post_id: this.post.post_id,
					reason: this.reason
				};

				ReportService.createReport(payload)
				.then(response => {
					console.log(response);
					this.$bvModal.hide('report-pop-up');

					this.createToast('Đã báo cáo bài viết');
				})
				.catch(error => {
					console.log(error);
				})
			},
			addFavorite: async function() {
				const user = JSON.parse(localStorage.getItem('user'));
				let payload = {
					uid: user.uid,
					post_id: this.post.post_id
				};

				FavService.createFavorite(payload)
				.then(response => {
					console.log(response);

					this.createToast('Đã lưu bài viết');
				})
				.catch(error => {
					console.log(error);
				})
			},
			confimReport: function() {
				this.$bvModal.show('report-pop-up');
			},
			handleOk: function(event) {
				event.preventDefault();
				this.addReport();
			},
			resetReportForm: function() {
				this.reason = '';
			},
			createToast: function(text, title = 'Thông báo') {
				this.$bvToast.toast(text, {
					title: title,
					autoHideDelay: 3000,
					append: true,
					variant: 'info'
				});
			}
		},
		computed: {
			isReasonValid: function() {
				return this.reason.length;
			}
		}
	}
</script>

<style scoped>
	body {
		display: flex;
	}

	h1 {
		text-align: center;
		font-style: italic;
	}

	h1, p {
		color: #36454f;
	}

	p {
		border-bottom: 2px solid rgba(0, 0, 0, 0.5);
		white-space: pre-wrap;
	}

	.body {
		background-color: #e0c9a6;
		margin-left: 25%;
		margin-right: 25%;
		margin-top: 1%;
		padding: 20px;
		border-radius: 20px;
	}

	.dropdown {
		float: right;
	}

	.tags {
		margin-right: 5px;
	}

	@media screen and (max-width: 1024px) {
		.body {
			margin: 0;
			border-radius: 0;
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
		}
	}
</style>