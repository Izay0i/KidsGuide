<template>
	<div>
		<div class="body shadow-lg">
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

			<b-badge 
				class="tags"
				v-for="tag in post.tags" 
				v-bind:key="tag"
			>{{ tag }}</b-badge>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';

	import PostService from '@/services/PostService.js';

	export default {
		name: 'PostItem',
		data: function() {
			return {
				post: {
					title: '',
					content: '',
					thumbnail: '',
					vid_url: '',
					post_time: '',
					tags: []
				}
			};
		},
		created: function() {
			this.getPostByID();
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
		background-color: #cfb997;
		margin-left: 25%;
		margin-right: 25%;
		margin-top: 1%;
		padding: 20px;
		border-radius: 20px;
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