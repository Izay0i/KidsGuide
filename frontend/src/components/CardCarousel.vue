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
            >
				<template #img>
					<p class="caption">{{ post.title }}</p>

					<router-link 
						class="link" 
						v-bind:to="{ name: 'Post', params: { id: post.post_id } }"
					>
						<b-icon 
							icon="play-btn-fill" 
							class="icon" 
							v-if="post.vid_url"
						></b-icon>

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

	img {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.carousel {
		padding: 5%;
		text-shadow: 1px 1px 2px #333;
	}

	.link {
		position: relative;
	}

	.link .icon {
		z-index: 10000;
		position: absolute;
		transform: scale(1.5) translate(50%, 50%);
	}

	.link > * {
		text-decoration: none;
		color: white;
	}

	.caption {
		margin: 0;
		text-align: center;
		text-shadow: none;
		font-size: 1.5rem;
		background-color: #cfb997;
		color: #9c6644;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}

	@media screen and (max-width: 1024px) {
		.carousel {
			margin: 0;
			padding: 0;
		}
	}
</style>