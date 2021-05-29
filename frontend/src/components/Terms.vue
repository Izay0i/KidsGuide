<template>
	<div>
		<Banner />

		<div class="body">
			<h1>Lorem Ipsum</h1>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
			Vestibulum molestie magna in augue viverra tempus. 
			Suspendisse eget pharetra dui. Morbi auctor ac sapien sit amet tincidunt. 
			Praesent interdum urna quis sem facilisis feugiat. 
			Aenean ornare eget sapien nec consequat. 
			Cras in porta arcu. 
			Pellentesque sed pretium augue. 
			Mauris dictum egestas ultricies.
		</p>
		</div>
	</div>
</template>

<script>
	import Banner from '@/components/Banner.vue';

	export default {
		name: 'Terms',
		components: {
			Banner
		}
	}
</script>

<style scoped>
	body {
		display: flex;
	}

	h1 {
		text-align: center;
		font-style: italic;
	}

	h1, p {
		color: #36454f;
	}

	.body {
		background-color: #cfb997;
		border-radius: 20px;
		padding: 20px;
		margin: 20px;
	}
</style>