<template>
	<div class="blog-group w-75 m-auto shadow-lg">
		<p>Bài viết</p>

		<b-form-group class="shadow-sm">
			<b-form-input 
				placeholder="https://picsum.photos/300/300/?image=41" 
				v-model="card_content.banner"
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
			<b-button class="mr-3 bg-success border-0 rounded" v-on:click="addBlogPost">Thêm</b-button>
		</b-button-group>

		<div class="search-post">
			<b-button>
				<b-icon icon="search"></b-icon>
			</b-button>
			<b-form-input placeholder="Tìm bài viết"></b-form-input>
		</div>

		<b-card-group columns class="m-5" v-if="cards.length">
			<CardItem 
				v-for="card in cards" 
				v-bind:key="card.id"
				v-bind:prop_id="card.id" 
				v-bind:prop_banner="card.banner" 
				v-bind:prop_title="card.title" 
				v-bind:prop_content="card.content"
				v-on:delete-card="deleteBlogPost"
			/>			
		</b-card-group>
	</div>
</template>

<script>
	import CardItem from '@/components/CardItem.vue';

	import PostService from '@/services/PostService.js';

	export default {
		name: 'CarcControlPanel',
		components: {
			CardItem
		},
		data: function() {
			return {
				search_blog: '',
				card_content: {
					banner: '',
					title: '',
					content: ''
				},
				cards: []
			};
		},
		created: function() {
			//this.getBlogPosts();
		},
		methods: {
			getBlogPosts: async function() {
				PostService.getBlogPosts()
				.then(response => {
					this.cards = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getBlogPostByTitle: async function() {
				if (!this.isSearchItemBlogValid) {
					this.getBlogPosts();
					return;
				}

				PostService.getBlogPostByTitle(this.search_blog)
				.then(response => {
					this.cards = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			addBlogPost: function() {
				if (!this.isPostImageValid || 
					!this.isPostTitleValid || 
					!this.isPostContentValid) 
				{
					return;
				}
				
				const payload = JSON.stringify({
					"title": this.card_content.title,
					"content": this.card_content.content,
					"banner": this.card_content.banner
				});

				PostService.createBlogPost(payload)
				.then(response => {
					console.log(response);
					this.getBlogPosts();
				})
				.catch(error => {
					console.log(error);
				});
			},
			deleteBlogPost: function(id) {
				PostService.deleteBlogPost(id)
				.then(response => {
					console.log(response);
					this.getBlogPosts();
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		computed: {
			isSearchItemBlogValid: function() {
				return this.search_blog.length ? true : false;
			},
			isPostImageValid: function() {
				return this.card_content.banner.length ? true : false;
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
	p {
		display: inline-block;
		width: auto;
		background-color: goldenrod;
		color: white;
		font-size: 30px;
		border-radius: 8px;
		padding: 8px;
	}

	.blog-group {
		overflow-y: auto;
		height: 30rem;
		border: 2px solid white;
		border-radius: 5px;
		padding: 15px;
		background-color: white;
	}

	.blog-group .search-post {
		display: flex;
		justify-content: space-between;
	}
</style>