<template>
	<div>
		<b-img src="../assets/school_bell.png"></b-img>
	</div>
</template>

<script>
	export default {
		name: 'LoadingScreen',
		created: function() {
			const BELL_SFX = new Audio(require('../assets/sfx/bell_sfx.ogg'));
			BELL_SFX.play();
		}
	}
</script>

<style scoped>
	* {
		min-height: 100vh;
		z-index: 999999;
		background-color: white;
	}

	div {
		display: flex;
		justify-content: center;
	}

	img {
		z-index: inherit;
		position: absolute;
		transform: scale(0.1);
	}
</style>