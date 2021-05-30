<template>
    <div>
        <h2><span>Các kỹ năng</span></h2>

        <b-carousel
            class="carousel" 
            controls 
            indicators 
            v-bind:interval="5000"
        >
            <b-carousel-slide 
				v-for="post in posts" 
				v-bind:key="post.title" 
                v-bind:caption="post.title"
            >
				<template #img>
					<router-link
						v-bind:to="{ name: 'Post', params: { id: post.post_id } }"
					>
						<img 
							class="d-block img-fluid w-100"
							v-bind:src="post.thumbnail"
						/>
					</router-link>					
				</template>				
			</b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
	import PostService from '@/services/PostService.js';

    export default {
        name: 'CardCarousel',
		data: function() {
			return {
				posts: []
			};
		},
		created: function() {
			this.getPostsByUserID();
		},
		methods: {
			getPostsByUserID: async function() {
				const adminID = 41;
				PostService.getPostsByUserID(adminID)
				.then(response => {
					this.posts = response;
				})
				.catch(error => {
					console.log(error);
				});
			}
		}
    }
</script>

<style scoped>
    h2 {
        width: 100%; 
        text-align: center;
        border-bottom: 1px solid white; 
        line-height: 0.1em;
        margin: 10px 0px 40px;
    } 

    h2 span { 
        background:#6a92f2;
        color: white;
        padding: 0px 10px; 
    }

	.carousel {
		text-shadow: 1px 1px 2px #333;
	}
</style>