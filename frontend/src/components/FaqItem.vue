<template>
	<div>
		<b-card 
			class="mb-2" 
			v-bind:title="faq_content.question"
		>
			<span class="answer">
				<b-card-text>{{ faq_content.answer }}</b-card-text>
			</span>

			<div class="footer">
				<b-button
					class="mr-3 bg-warning border-0"
					v-on:click="updateFaq"
				>
					Sửa
				</b-button>
				
				<b-button
					class="mr-3 bg-danger border-0" 
					v-on:click="deleteFaq"
				>
					Xóa
				</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
	export default {
		name: 'FaqItem',
		props: {
			prop_id: {
				type: Number,
				required: true
			},
			prop_question: {
				type: String,
				required: true
			},
			prop_answer: {
				type: String,
				required: true
			}
		},
		data: function() {
			return {
				id: this.prop_id,
				faq_content: {
					question: this.prop_question,
					answer: this.prop_answer
				}
			};
		},
		methods: {
			updateFaq: function() {
				this.$emit('update-faq', this.id);
			},
			deleteFaq: function() {
				this.$emit('delete-faq', this.id);
			}
		}
	}
</script>

<style scoped>
	body {
		display: flex;
	}

	div {
		flex: 0 0 100%;
	}

	.answer {
		white-space: pre-wrap;
	}
</style>