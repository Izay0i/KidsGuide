<template>
    <div>
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
							variant="danger" 
							icon="play-btn-fill" 
							class="icon" 
							v-if="post.vid_url"
						></b-icon>

						<img 
							class="thumbnail img-fluid"
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
			const adminID = 1;

			return {
				adminID,
				posts: []
			};
		},
		created: function() {
			this.getPostsByUserID();
		},
		methods: {
			getPostsByUserID: async function() {
				PostService.getPostsByUserID(this.adminID)
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
	img {
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
	}

	.carousel {
		width: 50%;
		padding-left: 5%;
		padding-right: 5%;
		text-shadow: 1px 1px 2px #333;
	}

	.link {
		position: relative;
	}

	.icon {
		z-index: 10000;
		position: absolute;
		transform: scale(1.5) translate(50%, 50%);
	}

	.thumbnail {
		display: block;
		object-fit: contain;
		background-color: black;
		width: 100vw;
		height: 50vh;
	}

	.link * {
		text-decoration: none;
		color: white;
	}

	.caption {
		margin: 0 auto;
		text-align: center;
		text-shadow: none;
		font-size: 1.5rem;
		background-color: rgba(255, 255, 255, 0.7);
		color: #36454f;
		border-radius: 6px 6px 0 0;
	}

	@media screen and (max-width: 1024px) {
		.carousel {
			width: 100%;
			padding: 0;
		}
	}
</style>