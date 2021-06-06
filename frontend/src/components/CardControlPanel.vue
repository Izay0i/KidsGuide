<template>
	<div class="post-group shadow-lg">
		<b-form v-if="isParamUserID">
			<b-form-group label="Hình ảnh:">
				<div class="thumbnail">
					<b-img 
						v-bind="img_props" 
						v-bind:src="card_content.thumbnail"
					></b-img>

					<b-form-file 
						accept=".jpg, .png, .gif" 
						v-model="form_file" 
						v-bind:state="isPostImageValid" 
						v-on:change="onFormFileChange"
					></b-form-file>
				</div>

				<div class="my-5">
					<b-form-input 
						placeholder="Đường dẫn video (Nếu có)" 
						v-model="card_content.vid_url"
					></b-form-input>

					<link-prevue 
						cardWidth="100%" 
						v-bind:url="card_content.vid_url"
					></link-prevue>
				</div>

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

			<b-form-group label="Trắc nghiệm (tùy chọn):">
				<QuizInputSection v-on:add-question="addQuestion" />
			</b-form-group>

			<b-card>
				<pre> "quizzes": {{ quizzes }} </pre>

				<b-button 
					variant="danger" 
					v-if="editEnabled" 
					v-on:click="confimQuizDeletion"
				>
					Xóa tất cả các câu hỏi
				</b-button>
			</b-card>

			<b-button-group class="my-3">
				<b-button 
					class="mr-3 bg-success border-0 rounded" 
					v-on:click="addPost" 
					v-show="!editEnabled"
				>
					Thêm
				</b-button>

				<div class="extra-btns" v-show="editEnabled">
					<b-button variant="warning" v-on:click="updatePost">Sửa</b-button>
					<b-button variant="danger" v-on:click="clearInputs">Hủy</b-button>
				</div>
			</b-button-group>
		</b-form>

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
				v-on:update-card="toggleEditButtons"
				v-on:delete-card="confirmDeletion"
			/>			
		</b-card-group>

		<!--Pop up to confirm deletion-->
		<div>
			<b-modal 
				id="del-pop-up" 
				title="Bạn có chắc chắn muốn xóa bài viết?" 
				ok-title="Có" 
				ok-variant="danger" 
				cancel-title="Không" 
				v-on:ok="deleteQuiz"
			></b-modal> <!--quiz is a child of post-->
		</div>

		<div>
			<b-modal 
				id="del-quiz-pop-up" 
				title="Bạn có chắc chắn muốn xóa xóa tất cả các câu hỏi?" 
				ok-title="Có" 
				ok-variant="danger" 
				cancel-title="Không" 
				v-on:ok="clearQuizzes"
			></b-modal>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	import LinkPrevue from 'link-prevue';
	import { mapGetters } from 'vuex';

	import QuizInputSection from '@/components/QuizInputSection.vue';
	import CardItem from '@/components/CardItem.vue';

	import PostService from '@/services/PostService.js';
	import QuizService from '@/services/QuizService.js';

	//what have I done

	export default {
		name: 'CardControlPanel',
		components: {
			LinkPrevue,
			QuizInputSection,
			CardItem
		},
		data: function() {
			const tagsLimit = 5;
			return {
				tagsLimit,
				img_props: { width: '300px' }, //bind to b-img
				search_post: '',
				form_file: null,
				vid_url_content: {
					title: '',
					description: '',
					images: []
				},
				card_content: {
					post_id: -1,
					title: '',
					thumbnail: '',
					vid_url: '',
					content: '',
					tags: []
				},
				cards: [],
				editEnabled: false,
				quizzes: []
			};
		},
		mounted: function() {
			this.getPostsByUserID();
		},
		methods: {
			getPostByID: async function() {
				PostService.getPostByID(this.card_content.post_id)
				.then(response => {
					console.log(response.thumbnail);
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
			addPost: async function() {
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
					const payload = {
						post_id: response.post_id,
						content: JSON.stringify(this.quizzes)
					};

					this.addQuiz(payload);

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
				formData.append('post_id', this.card_content.post_id);
				formData.append('thumbnail', this.form_file);
				formData.append('title', this.card_content.title);
				formData.append('content', this.card_content.content);
				formData.append('vid_url', this.card_content.vid_url);
				formData.append('tags', JSON.stringify(this.card_content.tags));

				PostService.updatePost(formData)
				.then(response => {
					const payload = {
						post_id: response.post_id,
						content: JSON.stringify(this.quizzes)
					};

					this.updateQuiz(payload);

					this.clearInputs();
					this.getPostsByUserID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			deletePost: async function() {
				PostService.deletePost(this.card_content.post_id)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getPostsByUserID();
				})
				.catch(error => {
					console.log(error);
				});
			},
			addQuestion: function(obj) {
				this.quizzes.push(JSON.parse(obj)); //obj is passed by ref so stringify and parse to pass by value
			},
			getQuizByPostID: async function() {
				QuizService.getQuizByPostID(this.card_content.post_id)
				.then(response => {
					this.quizzes = response.content;
				})
				.catch(error => {
					console.log(error);
				});
			},
			addQuiz: async function(payload) {
				QuizService.addQuiz(payload)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateQuiz: async function(payload) {
				QuizService.updateQuiz(payload)
				.then(response => {
					console.log(response);
				})
				.catch(error => {
					console.log(error);
				});
			},
			deleteQuiz: async function() {
				QuizService.deleteQuiz(this.card_content.post_id)
				.then(response => {
					console.log(response);
					this.deletePost();
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
			onFormFileChange: function(event) {
				const file = event.target.files[0];
				if (typeof file !== 'undefined') {
					this.card_content.thumbnail = URL.createObjectURL(file);
				}
				else {
					URL.revokeObjectURL(this.card_content.thumbnail);
					this.card_content.thumbnail = '';
				}
			},
			toggleEditButtons: function(id) {
				this.editEnabled = true;
				this.card_content.post_id = id;
				this.getPostByID();
				this.getQuizByPostID();
			},
			confirmDeletion: function(id) {
				this.card_content.post_id = id;
				this.$bvModal.show('del-pop-up');
			},
			confimQuizDeletion: function() {
				this.$bvModal.show('del-quiz-pop-up');
			},
			clearInputs: function() {
				this.editEnabled = false;
				this.card_content.thumbnail = '';
				this.card_content.vid_url = '';
				this.card_content.title = '';
				this.card_content.content = '';
				this.card_content.tags = [];
				
				this.clearQuizzes();

				URL.revokeObjectURL(this.form_file);
				this.form_file = null;
			},
			clearQuizzes: function() {
				this.quizzes = [];
			}
		},
		computed: {
			isSearchItemPostValid: function() {
				return this.search_post.length > 0;
			},
			isPostImageValid: function() {
				return this.card_content.thumbnail.length > 0;
			},
			isPostTitleValid: function() {
				return this.card_content.title.length > 0;
			},
			isPostContentValid: function() {
				return this.card_content.content.length > 0;
			},
			...mapGetters({
				isParamUserID: 'isParamUserID'
			})
		}
	}
</script>

<style scoped>
	/* input, input:focus, 
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
	} */

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

	.thumbnail > :first-child {
		margin-bottom: 15px;
		border-radius: 5px;
	}

	.search-post {
		display: flex;
		justify-content: space-between;
	}

	.extra-btns > * {
		margin-right: 10px;
	}
</style>