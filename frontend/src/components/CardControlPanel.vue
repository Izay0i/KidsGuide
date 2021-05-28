<template>
	<div class="blog-group shadow-lg">
		<b-form-group class="shadow-sm">
			<b-form-input 
				placeholder="Ảnh nền" 
				v-model="card_content.thumbnail"
				v-bind:state="isPostImageValid"
			></b-form-input>

			<b-form-input 
				placeholder="Tiêu đề" 
				v-model="card_content.title"
				v-bind:state="isPostTitleValid"
			></b-form-input>
				
			<b-form-textarea 
				placeholder="Nội dung" 
				size="lg" 
				v-model="card_content.content" 
				v-bind:state="isPostContentValid"
			></b-form-textarea>
		</b-form-group>

		<b-button-group class="mb-3">
			<b-button class="mr-3 bg-success border-0" v-on:click="addPost">Thêm</b-button>
		</b-button-group>

		<div class="search-post">
			<b-button>
				<b-icon icon="search" v-on:click="getPostByTitle"></b-icon>
			</b-button>
			<b-form-input 
				placeholder="Tìm bài viết"
				v-model="search_post"
				v-on:keyup="getPostByTitle"
			></b-form-input>
		</div>

		<b-card-group columns class="m-5" v-if="cards.length">
			<CardItem 
				v-for="card in cards" 
				v-bind:key="card.post_id"
				v-bind:prop_id="card.post_id" 
				v-bind:prop_banner="card.thumbnail" 
				v-bind:prop_title="card.title" 
				v-bind:prop_content="card.content"
				v-on:update-card="updatePost"
				v-on:delete-card="deletePost"
			/>			
		</b-card-group>
	</div>
</template>

<script>
	import CardItem from '@/components/CardItem.vue';

	import PostService from '@/services/PostService.js';

	export default {
		name: 'CardControlPanel',
		components: {
			CardItem
		},
		data: function() {
			return {
				search_post: '',
				card_content: {
					thumbnail: '',
					title: '',
					content: ''
				},
				cards: []
			};
		},
		created: function() {
			this.getPosts();
		},
		methods: {
			getPosts: async function() {
				PostService.getPosts()
				.then(response => {
					this.cards = response;
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
					this.cards = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			addPost: function() {
				if (!this.isPostImageValid || 
					!this.isPostTitleValid || 
					!this.isPostContentValid) 
				{
					return;
				}
				
				const payload = {
					title: this.card_content.title,
					content: this.card_content.content,
					thumbnail: this.card_content.thumbnail
				};

				PostService.createPost(payload)
				.then(response => {
					console.log(response);
					this.getPosts();
				})
				.catch(error => {
					console.log(error);
				});
			},
			updatePost: function(id) {
				console.log(id);	
			},
			deletePost: function(id) {
				PostService.deletePost(id)
				.then(response => {
					console.log(response);
					this.getPosts();
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		computed: {
			isSearchItemPostValid: function() {
				return this.search_post.length ? true : false;
			},
			isPostImageValid: function() {
				return this.card_content.thumbnail.length ? true : false;
			},
			isPostTitleValid: function() {
				return this.card_content.title.length ? true : false;
			},
			isPostContentValid: function() {
				return this.card_content.content.length ? true : false;
			}
		}
	}
</script>

<style scoped>
	input {
		margin-bottom: 5px;
	}

	.blog-group {
		overflow-y: auto;
		height: 50rem;
		border: 2px solid white;
		border-radius: 5px;
		padding: 15px;
		margin: auto;
		background-color: white;
	}

	.blog-group .search-post {
		display: flex;
		justify-content: space-between;
	}
</style>