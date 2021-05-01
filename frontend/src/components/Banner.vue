<template>
	<div>
		<b-img-lazy 
			v-bind:src="require(`@/assets/${prop_img}`)" 
			height="100"
			fluid-grow 
			alt="Banner image"
		>	
		</b-img-lazy>
	</div>	
</template>

<script>
	export default {
		name: 'Banner',
		props: {
			prop_img: {
				type: String,
				default: 'banner.jpg'
			}
		}
	};
</script>

<style scoped>

</style>