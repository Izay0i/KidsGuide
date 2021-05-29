<template>
	<div class="post-group shadow-lg">
		<b-form-group class="shadow-sm">
			<b-form-input 
				placeholder="Ảnh bìa" 
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

			<b-form-tags 
				separator=" " 
				remove-on-delete 
				v-model="card_content.tags"
			></b-form-tags>
		</b-form-group>

		<b-button-group class="mb-3">
			<b-button 
				class="mr-3 bg-success border-0 rounded" 
				v-on:click="addPost" 
				v-show="!toggled"
			>
				Thêm
			</b-button>

			<div class="extra-btns" v-show="toggled">
				<b-button variant="warning" v-on:click="updatePost">Sửa</b-button>
				<b-button variant="danger" v-on:click="clearInputs">Hủy</b-button>
			</div>
		</b-button-group>

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

		<b-card-group v-if="cards.length">
			<CardItem 
				v-for="card in cards" 
				v-bind:key="card.post_id"
				v-bind:prop_id="card.post_id" 
				v-bind:prop_banner="card.thumbnail" 
				v-bind:prop_title="card.title" 
				v-bind:prop_content="card.content" 
				v-bind:prop_date="card.post_time" 
				v-bind:prop_tags="card.tags" 
				v-on:update-card="toggledEditButtons"
				v-on:delete-card="deletePost"
			/>			
		</b-card-group>
	</div>
</template>

<script>
	import moment from 'moment';

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
				id: '',
				card_content: {
					title: '',
					thumbnail: '',	
					content: '',
					tags: []
				},
				cards: [],
				toggled: false
			};
		},
		mounted: function() {
			this.getPostsByUserID();
		},
		methods: {
			getPostByID: async function() {
				PostService.getPostByID(this.id)
				.then(response => {
					this.card_content = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getPostsByUserID: async function() {
				PostService.getPostsByUserID(this.$route.params.id)
				.then(response => {
					this.formatPostTime(response);
					this.cards = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getPostByTitle: async function() {
				if (!this.isSearchItemPostValid) {
					this.getPostsByUserID();
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
				
				const user = JSON.parse(localStorage.getItem('user'));
				const payload = {
					uid: user.uid,
					title: this.card_content.title,
					content: this.card_content.content,
					thumbnail: this.card_content.thumbnail,
					tags: this.card_content.tags
				};

				PostService.createPost(payload)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getPostsByUserID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			updatePost: async function() {
				if (!this.isPostImageValid || 
					!this.isPostTitleValid || 
					!this.isPostContentValid) 
				{
					return;
				}
				
				const payload = {
					id: this.id,
					title: this.card_content.title,
					content: this.card_content.content,
					thumbnail: this.card_content.thumbnail,
					tags: this.card_content.tags
				};

				PostService.updatePost(payload)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getPostsByUserID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			deletePost: function(id) {
				PostService.deletePost(id)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getPostsByUserID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			formatPostTime: function(arr) {
				arr.forEach(
					(item) => item.post_time = moment(item.post_time).format('DD/MM/YYYY')
				);
			},
			toggledEditButtons: function(id) {
				this.toggled = true;
				this.id = id;
				this.getPostByID();
			},
			clearInputs: function() {
				this.toggled = false;
				this.card_content.thumbnail = '';
				this.card_content.title = '';
				this.card_content.content = '';
				this.card_content.tags = [];
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
	input, textarea {
		margin-bottom: 5px;
	}

	.post-group {
		border: 2px solid white;
		border-radius: 5px;
		padding: 15px;
		margin: auto;
		background-color: white;
	}

	.post-group .search-post {
		display: flex;
		justify-content: space-between;
	}

	.post-group .extra-btns > * {
		margin-right: 10px;
	}
</style>