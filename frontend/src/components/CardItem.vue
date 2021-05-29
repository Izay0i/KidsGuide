<template>
	<div>
		<b-card 
			class="mb-5" 
			v-bind:title="card_content.title" 
			v-bind:img-src="card_content.banner" 
			img-alt="Thumbnail" 
			img-top
		>
			<b-card-text>
				{{ card_content.content }}
			</b-card-text>
			
			<b-card-text>
				Ngày đăng: {{ card_content.date }}
			</b-card-text>

			<b-card-text>
				{{ card_content.tags }}
			</b-card-text>

			<div class="footer">
				<b-button 
					class="mr-3 bg-warning border-0 rounded" 
					v-on:click="updatePost"
				>
					Sửa
				</b-button>

				<b-button 
					class="mr-3 bg-danger border-0 rounded" 
					v-on:click="deletePost"
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

	.footer {
		display: flex;
	}

	.footer > :nth-last-child(1) {
		flex: 1;
		margin-left: auto;
	}
</style>