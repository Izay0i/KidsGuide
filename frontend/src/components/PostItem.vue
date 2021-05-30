<template>
	<div>
		<b-img-lazy 
			fluid-grow 
			alt="Thumbnail" 
			v-bind:src="post.thumbnail"
		></b-img-lazy>

		<div class="body">
			<h1>{{ post.title }}</h1>

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
		padding: 20px;
	}

	.tags {
		margin-right: 5px;
	}
</style>