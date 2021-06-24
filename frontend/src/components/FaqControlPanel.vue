<template>
	<div class="faq-group m-auto shadow-lg">
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
			<b-button 
				class="mr-3 bg-success border-0 rounded" 
				v-on:click="addFaq"
				v-show="!toggled"
			>
				Thêm
			</b-button>

			<div class="extra-btns" v-show="toggled">
				<b-button variant="warning" v-on:click="updateFaq">Sửa</b-button>
				<b-button variant="danger" v-on:click="clearInputs">Hủy</b-button>
			</div>
		</b-button-group>

		<div class="search-faq mb-4">
			<b-button>
				<b-icon icon="search" v-on:click="getFaqByQuestion"></b-icon>
			</b-button>
			<b-form-input 
				placeholder="Tìm câu hỏi"
				v-model="search_faq"
				v-on:keyup.enter="getFaqByQuestion"
			></b-form-input>
		</div>

		<b-card-group v-if="faqs.length">
			<FaqItem
				v-for="faq in faqs"
				v-bind:key="faq.faq_id + faq.content.question + faq.content.answer"
				v-bind:prop_id="faq.faq_id"
				v-bind:prop_question="faq.content.question"
				v-bind:prop_answer="faq.content.answer"
				v-on:update-faq="toggleEditButtons"
				v-on:delete-faq="deleteFaq"
			/>
		</b-card-group>
	</div>
</template>

<script>
	import FaqItem from '@/components/FaqItem.vue';

	import FaqService from '@/services/FaqService.js';

	export default {
		name: 'FaqControlPanel',
		components: {
			FaqItem
		},
		data: function() {
			return {
				search_faq: '',
				faq_content: {
					id: '',
					question: '',
					answer: ''
				},
				faqs: [],
				toggled: false
			};
		},
		mounted: function() {
			this.getFaqs();
		},
		methods: {
			getFaqs: async function() {
				FaqService.getFaqs()
				.then(response => {
					this.faqs = response;
				})
				.catch(error => {
					console.log(error);
				});
			},
			getFaqByID: async function() {
				FaqService.getFaqByID(this.faq_content.id)
				.then(response => {
					console.log(response);
					this.faq_content.id = response.faq_id;
					this.faq_content.question = response.content.question;
					this.faq_content.answer = response.content.answer;
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

				FaqService.getFaqByQuestion(this.search_faq)
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

				const user = JSON.parse(localStorage.getItem('user'));
				const payload = {
					uid: user.uid,
					content: {
						question: this.faq_content.question,
						answer: this.faq_content.answer
					}
				};

				FaqService.createFaq(payload)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getFaqs();
				})
				.catch(error => {
					console.log(error);
				});
			},
			updateFaq: async function() {
				if (!this.isFaqQuestionValid || !this.isFaqAnswerValid) {
					return;
				}

				const payload = {
					id: this.faq_content.id,
					content: {
						question: this.faq_content.question,
						answer: this.faq_content.answer
					}
				};

				FaqService.updateFaq(payload)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getFaqs();
				})
				.catch(error => {
					console.log(error);
				});
			},
			deleteFaq: async function(id) {
				FaqService.deleteFaq(id)
				.then(response => {
					console.log(response);
					this.clearInputs();
					this.getFaqs();
				})
				.catch(error => {
					console.log(error);
				});
			},
			toggleEditButtons: function(id) {
				this.toggled = true;
				this.faq_content.id = id;
				this.getFaqByID();
			},
			clearInputs: function() {
				this.toggled = false;
				this.faq_content.question = '';
				this.faq_content.answer = '';
			}
		},
		computed: {
			isSearchItemFaqValid: function() {
				return this.search_faq.length ? true : false;
			},
			isFaqQuestionValid: function() {
				return this.faq_content.question.length ? true : false;
			},
			isFaqAnswerValid: function() {
				return this.faq_content.answer.length ? true : false;
			}
		}
	}
</script>

<style scoped>
	input {
		margin-bottom: 5px;
	}

	.faq-group {		
		border: 2px solid white;
		border-radius: 5px;
		padding: 15px;
		background-color: white;
	}

	.faq-group .search-faq {
		display: flex;
		justify-content: space-between;
	}

	.faq-group .extra-btns > * {
		margin-right: 10px;
	}
</style>