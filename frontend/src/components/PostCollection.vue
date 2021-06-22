<template>
	<div class="body">
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
			<CardItem 
				v-for="post in posts" 
				v-bind:key="post.post_id + post.post_time" 
				v-bind:prop_obj="post"
			/>
		</b-card-group>
	</div>
</template>

<script>
	import moment from 'moment';

	import CardItem from '@/components/CardItem.vue';

	import PostService from '@/services/PostService.js';

	export default {
		name: 'PostCollection',
		components: {
			CardItem
		},
		data: function() {
			return {
				timer: '',
				search_post: '',
				posts: []
			};
		},
		created: function() {
			this.getPosts();
			//this.timer = setInterval(this.getPosts, 10000);
			this.$store.dispatch('setParamUserID', {
				uid: this.userID,
				paramID: -1
			});
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

	.body {
		padding: 50px;
		background-image: url('../assets/blackboard.jpg');
		background-repeat: no-repeat;
		background-attachment: local;
		background-size: 100% 100%;
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

	@media screen and (max-width: 540px) {
		.body {
			padding-top: 80px;
			padding-bottom: 80px;
		}
	}
</style>