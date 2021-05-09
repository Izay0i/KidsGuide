<template>
	<div>
		<b-card 
			v-bind:title="card_content.title"
			v-bind:img-src="card_content.img"
			img-alt="Thumbnail" 
			img-top
		>
			<b-card-text>
				{{ card_content.content }}
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
			</div>
		</b-card>
	</div>
</template>

<script>
	export default {
		name: 'CardItem',
		props: {
			prop_img: {
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
			}
		},
		data: function() {
			return {
				card_content: {
					img: this.prop_img,
					title: this.prop_title,
					content: this.prop_content
				}
			};
		},
		methods: {
			updatePost: function() {
				return null;
			},
			deletePost: function() {
				//calling delete-card event from AdminDashboard.vue with a value of this.prop_title
				this.$emit('delete-card', this.prop_title);
			}
		}
	};
</script>

<style scoped>

</style>