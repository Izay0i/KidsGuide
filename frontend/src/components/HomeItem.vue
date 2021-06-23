<template>
	<div>
		<Navbar />
		<CardCarousel />
	</div>
</template>

<script>
	import Navbar from '@/components/Navbar.vue';
	import CardCarousel from '@/components/CardCarousel.vue';

	export default {
		name: 'HomeItem',
		components: {
			Navbar,
			CardCarousel
		}
	}
</script>

<style scoped>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 30px;
	}

	div * {
		margin-bottom: 30px;
	}

	@media screen and (max-width: 540px) {
		div {
			margin-top: 0;
		}
	}
</style>