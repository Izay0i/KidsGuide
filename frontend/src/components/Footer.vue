<template>
	<div>
		<b-navbar class="footer shadow-lg">
			<a href="https://github.com/Izay0i" target="_blank"><i class="far fa-copyright"></i> &nbsp; Designed by Izay0i | github.com/Izay0i </a>
			<a href="/faqs">Các câu hỏi thường gặp</a>
			<a href="">Điều khoản sử dụng dịch vụ</a>
		</b-navbar>
	</div>
</template>

<script>
	export default {
		name: 'Footer'
	};
</script>

<style scoped>
	.footer {
		flex-direction: column;
		justify-content: center;
		background-color: #6A92F2;
		position: fixed;
		width: 100%;
		bottom: 0;
	}

	.footer > * {
		padding: 10px;
		color: white;
		text-decoration: none;
	}
</style>