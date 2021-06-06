<template>
	<div class="quiz-group shadow">
		<b-form>
			<b-form-input 
				placeholder="Câu hỏi" 
				v-bind:state="isQuestionValid" 
				v-model="question"
			></b-form-input>

			<div class="response">
				<b-form-input 
					placeholder="Đáp án" 
					v-bind:state="isResponseValid" 
					v-model="response"
				></b-form-input>

				<b-form-checkbox v-model="correct">
					Là đáp án đúng
				</b-form-checkbox>

				<b-button variant="info" v-on:click="addReponse">Thêm đáp án</b-button>
			</div>

			<b-card v-bind:state="areAllAnswersFalse">
				<pre> "question": {{  question }} </pre>
				<pre> "responses": {{ responses }} </pre>
			</b-card>

			<div class="extra-btns">
				<b-button variant="info" v-on:click="addQuestion">Thêm câu hỏi</b-button>
				<b-button variant="danger" v-on:click="deleteQuestion">Xóa câu hỏi</b-button>
			</div>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'QuizInputSection',
		data: function() {
			return {
				question: '',
				response: '',
				correct: false,
				responses: []
			}
		},
		methods: {
			addQuestion: function() {
				if (!this.isQuestionValid || 
					this.areAllAnswersFalse || 
					!this.areResponsesValid) 
				{
					return;
				}

				this.$emit('add-question', JSON.stringify({
					question: this.question,
					responses: this.responses
				}));

				this.clearQuestionInput();
			},
			addReponse: function() {
				if (!this.isResponseValid) {
					return;
				}

				this.responses.push({ 
					response: this.response, 
					correct: this.correct 
				});

				this.clearResponseInputs();
			},
			deleteQuestion: function() {
				this.clearQuestionInput();
				this.clearResponseInputs();
			},
			clearQuestionInput: function() {
				this.responses.length = 0;
				this.question = '';
			},
			clearResponseInputs: function() {
				this.response = '';
				this.correct = false;
			}
		},
		computed: {
			isQuestionValid: function() {
				return this.question.length > 0;
			},
			isResponseValid: function() {
				return this.response.length > 0;
			},
			areAllAnswersFalse: function() {
				let result = this.responses.every((element) => {
					return element.correct === false;
				});

				return result;
			},
			areResponsesValid: function() {
				return this.responses.length > 1;
			}
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

	.quiz-group {
		border-radius: 10px;
		padding: 15px;
		margin: auto;
		background-color: #ddb892;
	}
	
	.quiz-group * {
		margin-bottom: 5px;
	}

	.options {
		display: flex;
		margin-top: 20px;
	}

	.response {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.response * {
		flex: 0.3;
	}

	.response :first-child {
		color: #9c6644;
	}

	.extra-btns {
		display: flex;
		justify-content: space-between;
	}
</style>