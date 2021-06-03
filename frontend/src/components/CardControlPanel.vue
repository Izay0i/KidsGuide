<template>
	<div class="post-group shadow-lg">
		<div v-if="isParamUserID">
			<b-form-group>
				<div class="thumbnail">
					<b-img 
						v-bind="img_props" 
						v-bind:src="img_preview"
					></b-img>

					<b-form-file 
						accept=".jpg, .png, .gif" 
						v-model="form_file" 
						v-bind:state="isPostImageValid" 
						v-on:change="onFormFileChange"
					></b-form-file>
				</div>

				<b-form-input 
					placeholder="Đường dẫn video (Nếu có)" 
					v-model="card_content.vid_url"
				></b-form-input>

				<b-form-input 
					placeholder="Tiêu đề" 
					v-model="card_content.title"
					v-bind:state="isPostTitleValid"
				></b-form-input>
					
				<b-form-textarea 
					placeholder="Nội dung" 
					rows="16" 
					v-model="card_content.content" 
					v-bind:state="isPostContentValid"
				></b-form-textarea>

				<b-form-tags 
					separator=" " 
					remove-on-delete 
					class="tags"
					v-model="card_content.tags" 
					v-bind:limit="tagsLimit"
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
		</div>

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
				v-bind:key="card.post_id + card.post_time" 
				v-bind:prop_id="card.post_id" 
				v-bind:prop_banner="card.thumbnail" 
				v-bind:prop_vid="card.vid_url" 
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
	import { mapGetters } from 'vuex';

	import CardItem from '@/components/CardItem.vue';

	import PostService from '@/services/PostService.js';

	export default {
		name: 'CardControlPanel',
		components: {
			CardItem
		},
		data: function() {
			const tagsLimit = 5;

			return {
				tagsLimit,
				img_props: { width: 200 }, //bind to b-img
				img_preview: '',
				search_post: '',
				id: '', //post_id
				form_file: null,
				card_content: {
					title: '',
					vid_url: '',
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

				let formData = new FormData();
				formData.append('type', 'posts');
				formData.append('id', user.uid);
				formData.append('thumbnail', this.form_file);
				formData.append('title', this.card_content.title);
				formData.append('content', this.card_content.content);
				formData.append('vid_url', this.card_content.vid_url);
				formData.append('tags', JSON.stringify(this.card_content.tags)); //array needs to be parse as string

				PostService.createPost(formData)
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

				const user = JSON.parse(localStorage.getItem('user'));

				let formData = new FormData();
				formData.append('type', 'posts');
				formData.append('id', user.uid);
				formData.append('post_id', this.id);
				formData.append('thumbnail', this.form_file);
				formData.append('title', this.card_content.title);
				formData.append('content', this.card_content.content);
				formData.append('vid_url', this.card_content.vid_url);
				formData.append('tags', JSON.stringify(this.card_content.tags));

				PostService.updatePost(formData)
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
					(item) => item.post_time = moment(item.post_time).format('DD/MM/YYYY hh:mm A')
				);
			},
			onFormFileChange: function(e) {
				const file = e.target.files[0];
				if (typeof file !== 'undefined') {
					this.img_preview = URL.createObjectURL(file);
				}
				else {
					URL.revokeObjectURL(this.img_preview);
					this.img_preview = '';
				}
			},
			toggledEditButtons: function(id) {
				this.toggled = true;
				this.id = id;
				this.getPostByID();
			},
			clearInputs: function() {
				this.toggled = false;
				this.card_content.thumbnail = '';
				this.card_content.vid_url = '';
				this.card_content.title = '';
				this.card_content.content = '';
				this.card_content.tags = [];

				URL.revokeObjectURL(this.form_file);
				this.form_file = null;
				this.img_preview = '';
			}
		},
		computed: {
			isSearchItemPostValid: function() {
				return this.search_post.length ? true : false;
			},
			isPostImageValid: function() {
				return this.form_file != null;
			},
			isPostTitleValid: function() {
				return this.card_content.title.length ? true : false;
			},
			isPostContentValid: function() {
				return this.card_content.content.length ? true : false;
			},
			...mapGetters({
				isParamUserID: 'isParamUserID'
			})
		}
	}
</script>

<style scoped>
	input, input:focus, 
	select, select:focus, 
	textarea, textarea:focus, 
	.tags, .tags:focus-within
	{
		background-color: transparent;
		color: #36454f;
		border: 0;
		border-radius: 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.5);
		box-shadow: none;
		margin-bottom: 5px;
	}
	
	.post-group {
		border-radius: 20px;
		padding: 15px;
		margin: auto;
		background-color: #cfb997;
	}

	.thumbnail {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.search-post {
		display: flex;
		justify-content: space-between;
	}

	.extra-btns > * {
		margin-right: 10px;
	}
</style>