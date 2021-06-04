<template>
	<div class="quiz-group shadow">
		<b-form-group>
			<b-form-input placeholder="Câu hỏi"></b-form-input>
			
			<div 
				class="response" 
				v-for="index in 4" 
				v-bind:key="index"
			>
				<b-form-input 
					placeholder="Đáp án"					
				></b-form-input>

				<b-form-checkbox>Là đáp án đúng</b-form-checkbox>
			</div>
		</b-form-group>
	</div>
</template>

<script>
	export default {
		name: 'QuizInputSection'
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

	.quiz-group {
		border-radius: 10px;
		padding: 15px;
		margin: auto;
		background-color: #cfb997;
	}
	
	.quiz-group * {
		margin-bottom: 5px;
	}

	.response {
		display: flex;
	}

	.response > * {
		flex: 1;
		margin-right: 10px;
	}

	.response > :nth-last-child(1) {
		color: #9c6644;
	}
</style>