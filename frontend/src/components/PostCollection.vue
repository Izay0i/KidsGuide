<template>
	<div>
		<div class="search-post mb-4">
			<b-button>
				<b-icon icon="search" v-on:click="getPostByTitle"></b-icon>
			</b-button>
			<b-form-input 
				placeholder="Tìm bài viết" 
				v-model="search_post" 
				v-on:keyup="getPostByTitle"
			></b-form-input>
		</div>

		<b-card-group columns class="cards">
			<b-card 
				v-for="post in posts" 
				v-bind:key="post.post_id + post.post_time"
			>
				<b-dropdown variant="dark" size="sm">
					<b-dropdown-item><b-icon variant="warning" icon="bookmark"></b-icon> &nbsp; Lưu bài viết</b-dropdown-item>
					<b-dropdown-item v-on:click="confimReport(post.post_id)">
						<b-icon variant="danger" icon="exclamation-triangle-fill"></b-icon> &nbsp; Báo cáo bài viết
					</b-dropdown-item>
				</b-dropdown>

				<b-card-text class="title">
					{{ post.title }}
				</b-card-text>

				<router-link class="link" v-bind:to="{ name: 'Post', params: { id: post.post_id } }">
					<b-icon 
						icon="play-btn-fill" 
						class="icon" 
						v-if="post.vid_url"
					></b-icon>
					
					<b-img v-bind:src="post.thumbnail" fluid-grow></b-img>
				</router-link>
				
				<b-card-text class="date">
					Ngày đăng: {{ post.post_time }}
				</b-card-text>

				<b-badge 
					class="tags"
					v-for="tag in post.tags" 
					v-bind:key="tag"
				>
					{{ tag }}
				</b-badge>
			</b-card>
		</b-card-group>

		<b-modal 
			id="report" 
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

	import PostService from '@/services/PostService.js';
	import ReportService from '@/services/ReportService.js';

	export default {
		name: 'PostCollection',
		data: function() {
			return {
				timer: '',
				search_post: '',
				posts: [],
				post_id: -1,
				reason: ''
			};
		},
		created: function() {
			this.getPosts();
			//this.timer = setInterval(this.getPosts, 10000);
		},
		beforeDestroy: function() {
			//this.cancelAutoUpdate();
		},
		methods: {
			getPosts: async function() {
				PostService.getPosts()
				.then(response => {
					this.formatPostTime(response);
					this.posts = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getPostByTitle: async function() {
				if (!this.isSearchItemPostValid) {
					this.getPosts();
					return;
				}

				PostService.getPostByTitle(this.search_post)
				.then(response => {
					this.posts = response;
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
					post_id: this.post_id,
					reason: this.reason
				};

				ReportService.createReport(payload)
				.then(response => {
					console.log(response);

					this.$bvModal.hide('report');
				})
				.catch(error => {
					console.log(error);
				})
			},
			confimReport: function(id) {
				this.$bvModal.show('report');

				this.post_id = id;
			},
			handleOk: function(event) {
				event.preventDefault();

				this.addReport();
			},
			resetReportForm: function() {
				this.post_id = -1;
				this.reason = '';
			},
			cancelAutoUpdate: function() {
				clearInterval(this.timer);
			},
			formatPostTime: function(arr) {
				arr.forEach(
					(item) => item.post_time = moment(item.post_time).format('DD/MM/YYYY hh:mm A')
				);
			}
		},
		computed: {
			isSearchItemPostValid: function() {
				return this.search_post.length ? true : false;
			},
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

	div {
		flex: 0 0 100%;
	}

	img {
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.cards > * {
		border-radius: 20px;
	}

	.link {
		position: relative;
	}

	.link .icon {
		position: absolute;
		transform: scale(1.5) translate(50%, 50%);
	}

	.link > * {
		text-decoration: none;
		color: white;
	}

	.search-post {
		display: flex;
		justify-content: space-between;
	}

	.title {
		text-align: center;
		font-size: 2.5rem;
	}

	.content {
		overflow: auto;
		max-height: 20vh;
		white-space: pre-wrap;
	}

	.tags {
		margin-right: 5px;
	}
</style>