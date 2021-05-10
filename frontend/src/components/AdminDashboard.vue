<template>
	<div>
		<b-navbar variant="dark" class="mb-3 shadow-lg">
			<p class="dashboard-text">Dashboard</p>
		</b-navbar>

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
					class="blog-content"
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

		<hr/>

		<div class="faq-group w-75 m-auto shadow-lg">
			<p>Câu hỏi thường gặp</p>

			<b-form-group class="shadow-sm">
				<b-form-input
					placeholder="Câu hỏi"
					v-model="faq_content.question"
					v-bind:state="isFaqQuestionValid"
				></b-form-input>
				
				<b-form-textarea
					placeholder="Trả lời"
					v-model="faq_content.answer"
					v-bind:state="isFaqAnswerValid"
				></b-form-textarea>
			</b-form-group>

			<b-button-group class="mb-3">
				<b-button class="mr-3 bg-success border-0 rounded" v-on:click="addFaq">Thêm</b-button>
			</b-button-group>

			<div class="search-faq">
				<b-button>
					<b-icon icon="search" v-on:click="getFaqByQuestion"></b-icon>
				</b-button>
				<b-form-input 
					placeholder="Tìm câu hỏi"
					v-model="search_item.faq"
					v-on:keyup.enter="getFaqByQuestion"
				></b-form-input>
			</div>

			<b-card-group class="m-5" v-if="faqs.length">
				<FaqItem
					v-for="faq in faqs"
					v-bind:key="faq.id"
					v-bind:prop_id="faq.id"
					v-bind:prop_question="faq.body.question"
					v-bind:prop_answer="faq.body.answer"
					v-on:update-faq="updateFaq"
					v-on:delete-faq="deleteFaq"
				/>
			</b-card-group>
		</div>
	</div>
</template>

<script>
	import CardItem from '@/components/CardItem.vue';
	import FaqItem from '@/components/FaqItem.vue';

	import PostService from '@/services/PostService.js';
	import FaqService from '@/services/FaqService.js';

	export default {
		name: 'AdminDashboard',
		components: {
			CardItem,
			FaqItem
		},
		data: function() {
			return {
				search_item: {
					blog: '',
					faq: ''
				},

				card_content: {
					banner: '',
					title: '',
					content: ''
				},
				cards: [],
				
				faq_content: {
					question: '',
					answer: ''
				},
				faqs: []
			};
		},
		created: function() {
			this.getFaqs();
			this.getBlogPosts();
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

				PostService.getBlogPostByTitle(this.search_item.blog)
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
			},

			getFaqs: async function() {
				FaqService.getFaqs()
				.then(response => {
					this.faqs = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getFaqByQuestion: async function() {
				if (!this.isSearchItemFaqValid) {
					this.getFaqs();
					return;
				}

				FaqService.getFaqByQuestion(this.search_item.faq)
				.then(response => {
					this.faqs = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			addFaq: async function() {
				if (!this.isFaqQuestionValid || !this.isFaqAnswerValid) {
					return;
				}

				const payload = JSON.stringify({
					"question": this.faq_content.question,
					"answer": this.faq_content.answer
				});

				FaqService.createFaq(payload)
				.then(response => {
					console.log(response);
					this.getFaqs();
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateFaq: async function(id) {
				console.log(id);
			},
			deleteFaq: async function(id) {
				FaqService.deleteFaq(id)
				.then(response => {
					console.log(response);
					this.getFaqs();
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		computed: {
			isSearchItemBlogValid: function() {
				return this.search_item.blog.length ? true : false;
			},
			isSearchItemFaqValid: function() {
				return this.search_item.faq.length ? true : false;
			},

			isPostImageValid: function() {
				return this.card_content.banner.length ? true : false;
			},
			isPostTitleValid: function() {
				return this.card_content.title.length ? true : false;
			},
			isPostContentValid: function() {
				return this.card_content.content.length ? true : false;
			},

			isFaqQuestionValid: function() {
				return this.faq_content.question.length ? true : false;
			},
			isFaqAnswerValid: function() {
				return this.faq_content.answer.length ? true : false;
			}
		}
	};
</script>

<style scoped>
	p {
		color: goldenrod;
		font-size: 30px;
	}

	.dashboard-text {
		color: white;
		font-size: 46px;
		font-weight: bold;
		margin: auto;
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

	.faq-group {
		overflow-y: auto;
		height: 50rem;
		border: 2px solid white;
		border-radius: 5px;
		padding: 15px;
		background-color: white;
	}

	.faq-group .search-faq {
		display: flex;
		justify-content: space-between;
	}
</style>