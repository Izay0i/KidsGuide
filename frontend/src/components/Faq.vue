<template>
    <div>
        <b-jumbotron header="Các câu hỏi thường gặp" class="body">
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
	.body {
		margin-top: 1%;
		margin-left: auto;
		margin-right: auto;
		width: 75%;
	}

	.question {
		font-weight: bold;
		color: blueviolet;
	}

	.answer {
		white-space: pre-wrap;
	}

	@media screen and (max-width: 414px) {
		.body {
			width: 100%;
		}
	}
</style>