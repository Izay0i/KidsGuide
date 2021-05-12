<template>
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
				v-model="search_faq"
				v-on:keyup="getFaqByQuestion"
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
					question: '',
					answer: ''
				},
				faqs: []
			};
		},
		created: function() {
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
	p {
		display: inline-block;
		width: auto;
		background-color: goldenrod;
		color: white;
		font-size: 30px;
		border-radius: 8px;
		padding: 8px;
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