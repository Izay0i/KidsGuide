<template>
<div>
<template>
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
</template>
</div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		prop_img: String,
		prop_title: String,
		prop_content: String
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