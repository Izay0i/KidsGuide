<template>
	<div>
		<b-card 
			class="cards mx-auto" 
			v-bind:title="card_content.title" 
			v-bind:img-src="card_content.banner" 
			img-alt="Thumbnail"
		>
			<b-card-text class="content">
				{{ card_content.content }}
			</b-card-text>
			
			<b-card-text>
				Ngày đăng: {{ card_content.date }}
			</b-card-text>

			<b-badge 
				class="tags"
				v-for="tag in card_content.tags" 
				v-bind:key="tag"
			>{{ tag }}</b-badge>

			<div class="footer mt-5">
				<b-button 
					class="mr-3 bg-warning border-0 rounded" 
					v-on:click="updatePost" 
					v-if="isParamUserID"
				>
					Sửa
				</b-button>

				<b-button 
					class="mr-3 bg-danger border-0 rounded" 
					v-on:click="deletePost" 
					v-if="isParamUserID"
				>
					Xóa
				</b-button>

				<b-button 
					variant="info" 
					v-bind:to="{ name: 'Post', params: { id } }"
				>
					Xem bài viết
				</b-button>
			</div>
		</b-card>
	</div>
</template>

<script>
	export default {
		name: 'CardItem',
		props: {
			prop_user_id: {
				type: Number,
				required: true
			},
			prop_id: {
				type: Number,
				required: true
			},
			prop_banner: {
				type: String,
				required: true
			},
			prop_title: {
				type: String,
				required: true
			},
			prop_content: {
				type: String,
				required: true
			},
			prop_date: {
				type: String,
				required: true
			},
			prop_tags: {
				type: Array,
			}
		},
		data: function() {
			return {
				id: this.prop_id,
				card_content: {
					banner: this.prop_banner,
					title: this.prop_title,
					content: this.prop_content,
					date: this.prop_date,
					tags: this.prop_tags
				}
			};
		},
		methods: {
			updatePost: function() {
				this.$emit('update-card', this.id);
			},
			deletePost: function() {
				//calling delete-card event from AdminDashboard.vue with a value of this.id
				this.$emit('delete-card', this.id);
			}
		},
		computed: {
			isParamUserID: function() {
				return this.prop_user_id === parseInt(this.$route.params.id);
			}
		}
	};
</script>

<style scoped>
	body {
		display: flex;
	}

	div {
		flex: 0 0 100%;
	}

	.cards {
		border: 0;
		border-radius: 20px;
		margin-bottom: 35px;
		max-width: 50vw;
	}

	.content {
		overflow: auto;
		max-height: 30vh;
		white-space: pre-wrap;
	}

	.tags {
		margin-right: 5px;
	}

	.footer {
		display: flex;
	}

	.footer > :nth-last-child(1) {
		flex: 1;
		margin-left: auto;
	}

	@media screen and (max-width: 768px) {
		.card {
			max-width: 100vw;
		}
	}
</style>