<template>
	<div v-if="prop_quizzes.length > 0">
		<b-form class="quizz">
			<p> Trắc nghiệm </p>

			<div v-show="!isEndOfQuiz">
				<b-form-group  
					v-for="(quizz, index) in prop_quizzes.slice(from, to)" 
					v-bind:key="index"
				>
					<p> {{ quizz.question }} </p>
					<div class="response-btns">
						<b-button 
							variant="info" 
							v-for="(response, index) in quizz.responses" 
							v-bind:key="index" 
							v-on:click="checkResponse(response)"
						>
							{{ response.response }}
						</b-button>
					</div>
				</b-form-group>

				<div class="btns">
					<b-button 
						variant="warning" 
						v-bind:disabled="isEndOfQuiz" 
						v-on:click="nextQuestion" 
					>
						Bỏ qua
					</b-button>
					
					<b-button 
						variant="success" 
						v-bind:disabled="!choseResponse" 
						v-if="!isEndOfQuiz" 
						v-on:click="nextQuestion"
					>
						Tiếp theo
					</b-button>
				</div>
			</div>

			<div v-show="isEndOfQuiz">
				<p> Bạn đúng {{ score }} / {{ prop_quizzes.length }} câu. </p>
			</div>
		</b-form>
	</div>
</template>

<script>
	export default {
		name: 'QuizDisplay',
		props: {
			prop_quizzes: {
				type: Array,
				required: true
			}
		},
		data: function() {
			return {
				from: 0,
				to: 1,
				score: 0,
				choseResponse: false,
			}
		},
		methods: {
			checkResponse: function(response) {
				if (!this.choseResponse) {
					if (response.correct) {
						++this.score;
					}
				}

				this.choseResponse = true;
			},
			nextQuestion: function() {
				if (!this.isEndOfQuiz) {
					++this.from;
					++this.to;
					
					this.choseResponse = false;
				}
			}
		},
		computed: {
			isEndOfQuiz: function() {
				return this.to > this.prop_quizzes.length;
			}
		}
	}
</script>

<style scoped>
	p {
		color: #36454f;
	}

	.quizz {
		padding: 20px;
		margin-bottom: 15px;
		border-radius: 10px;
		border: 2px dashed rgba(0, 0, 0, 0.5);
	}

	.response-btns {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;
	}

	.response-btns * {
		margin: 5px;
		flex: 1 0 calc(50% - 10px);
	}

	.btns {
		display: flex;
		justify-content: space-between;
	}
</style>