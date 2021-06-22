<template>
    <div>
        <b-jumbotron header="Các câu hỏi thường gặp" class="w-75 m-auto">
            <b-img thumbnail fluid src="@/assets/book.png" alt="Logo"></b-img>
            
            <hr/>

            <p v-for="faq in faqs" v-bind:key="faq.faq_id">
                <span class="question">{{ faq.content.question }}</span> 
				<br/> 
				<span class="answer">{{ faq.content.answer }}</span>
            </p>
        </b-jumbotron>
    </div>
</template>

<script>
	import FaqService from '@/services/FaqService.js';

    export default {
        name: 'Faq',
        data: function() {
            return {
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
					console.log(error.response.data.error);
				});
			}
		}
    }
</script>

<style scoped>
	.question {
		font-weight: bold;
		color: blueviolet;
	}

	.answer {
		white-space: pre-wrap;
	}
</style>