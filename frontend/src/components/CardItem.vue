<template>
	<div>
		<b-card class="cards mx-auto shadow-lg">
			<b-card-text class="title">
				{{ card_content.title }}
			</b-card-text>

			<router-link v-bind:to="{ name: 'Post', params: { id } }">
				<b-img v-bind:src="card_content.banner" fluid-grow></b-img>
			</router-link>

			<b-card-text class="content">
				{{ card_content.content }}
			</b-card-text>
			
			<b-card-text class="date">
				Ngày đăng: {{ card_content.date }}
			</b-card-text>

			<b-badge 
				class="tags"
				v-for="tag in card_content.tags" 
				v-bind:key="tag"
			>{{ tag }}</b-badge>

			<div class="footer mt-5" v-if="isParamUserID">
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
			</div>
		</b-card>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

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
		},
		computed: {
			...mapGetters({
				isParamUserID: 'isParamUserID'
			})
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

	img {
		border-radius: 10px;
		margin-bottom: 10px;
	}

	.cards {
		background-color: #ddb892;
		border: 0;
		border-radius: 20px;
		margin-bottom: 35px;
		max-width: 50vw;
	}

	.title {
		color: #9c6644;
		text-align: center;
		font-size: 2.5rem;
	}

	.content {
		color: #7f5539;
		overflow: auto;
		max-height: 20vh;
		white-space: pre-wrap;
	}

	.date {
		text-align: center;
		border-radius: 20px;
		padding: 7px;
		background-color: #7f5539;
		color: white;
	}

	.tags {
		margin-right: 5px;
	}

	.footer {
		display: flex;
	}

	@media screen and (max-width: 768px) {
		.card {
			max-width: 100vw;
		}
	}
</style>