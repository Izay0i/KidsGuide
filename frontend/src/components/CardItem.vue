<template>
	<div>
		<b-card class="cards mx-auto shadow-lg">
			<b-dropdown 
				variant="light" 
				size="sm" 
				right 
				class="dropdown" 
				v-if="isParamUserID"
			>
				<b-dropdown-item v-on:click="updatePost(card_content.post_id)">
					<b-icon variant="warning" icon="pencil"></b-icon> &nbsp; Sửa
				</b-dropdown-item>
				<b-dropdown-item v-on:click="deletePost(card_content.post_id)">
					<b-icon variant="danger" icon="x-circle"></b-icon> &nbsp; Xóa
				</b-dropdown-item>
			</b-dropdown>

			<b-card-text class="title">
				{{ card_content.title }}
			</b-card-text>

			<router-link 
				class="link" 
				v-bind:to="{ name: 'Post', params: { id: card_content.post_id } }"
			>
				<b-icon 
					icon="play-btn-fill" 
					class="icon" 
					v-if="card_content.vid"
				></b-icon>
				
				<b-img v-bind:src="card_content.thumbnail" fluid-grow></b-img>
			</router-link>

			<!-- <b-card-text class="content">
				{{ card_content.content }}
			</b-card-text> -->
			
			<b-card-text class="date">
				Ngày đăng: {{ card_content.post_time }}
			</b-card-text>

			<b-badge 
				class="tags"
				v-for="tag in card_content.tags" 
				v-bind:key="tag"
			>
				{{ tag }}
			</b-badge>
		</b-card>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'CardItem',
		props: {
			prop_obj: {
				type: Object,
				required: true
			}
		},
		data: function() {
			return {
				card_content: this.prop_obj,
				reason: ''
			};
		},
		methods: {
			updatePost: function(id) {
				this.$emit('update-card', id);
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: 'smooth'
				});
			},
			deletePost: function(id) {
				//calling delete-card event from AdminDashboard.vue with a value of id
				this.$emit('delete-card', id);
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
		border-radius: 10px 10px 0 0;
	}

	.link {
		position: relative;
	}

	.link .icon {
		position: absolute;
		transform: scale(1.5) translate(50%, 50%);
	}

	.link > * {
		text-decoration: none;
		color: white;
	}

	.cards {
		background-color: #e0c9a6;
		border: 0;
		border-radius: 7px;
		margin-bottom: 35px;
		max-width: 38vw;
	}

	.dropdown {
		float: right;
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
		border-radius: 0 0 10px 10px;
		padding: 7px;
		background-color: #ddb892;
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