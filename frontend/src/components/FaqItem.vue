<template>
	<div>
		<b-card class="m-1" v-bind:title="faq_content.question">
			<b-card-text>{{ faq_content.answer }}</b-card-text>

			<div class="footer">
				<b-button
					class="mr-3 bg-warning border-0 rounded"
				>
					Sửa
				</b-button>
				
				<b-button
					class="mr-3 bg-danger border-0 rounded" 
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
			deleteFaq: function() {
				this.$emit('delete-faq', this.id);
			}
		}
	}
</script>

<style scoped>
	.card {
		max-width: 100vw;
		width: 800px;
	}
</style>