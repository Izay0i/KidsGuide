<template>
	<div>
		<b-card 
			:title="card_content.title"
			:img-src="card_content.img"
			img-alt="Thumbnail" 
			img-top
		>
			<b-card-text>
				{{ card_content.content }}
			</b-card-text>
			<template #footer>
				<b-link to="/blog-posts">Xem thêm</b-link>
			</template>
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
		}
	};
</script>

<style>

</style>