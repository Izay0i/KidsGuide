<template>
	<div>
		<b-navbar class="footer shadow-lg">
			<a href="/faqs">Các câu hỏi thường gặp</a>
			<a href="https://github.com/Izay0i" target="_blank"><i class="far fa-copyright"></i> &nbsp; Designed by Izay0i | github.com/Izay0i </a>
			<a href="/terms">Điều khoản sử dụng dịch vụ</a>
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
		flex-direction: row;
		justify-content: space-between;
		background-color: #6a92f2;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: -1;
	}

	.footer > * {
		padding: 10px;
		color: white;
		text-decoration: none;
	}
</style>