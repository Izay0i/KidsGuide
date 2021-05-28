<template>
    <div>
        <b-jumbotron header="Các câu hỏi thường gặp" class="w-75 m-auto">
            <b-img thumbnail fluid src="@/assets/book.png" alt="Logo"></b-img>
            
            <hr/>

            <p v-for="faq in faqs" v-bind:key="faq.faq_id">
                <span>{{ faq.content.question }}</span> <br/> {{ faq.content.answer }}
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
			console.log(this.faqs);
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
	p span {
		font-weight: bold;
		color: blueviolet;
	}
</style>