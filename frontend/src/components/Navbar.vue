<template>
	<div>
		<b-navbar class="header">
			<b-nav pills class="nav-items p-2">
				<b-nav-item class="home" to="/">Trang chủ</b-nav-item>
				<b-nav-item>Các kỹ năng</b-nav-item>
				<b-nav-item to="faqs">FAQ</b-nav-item>
				<b-nav-item to="admin" v-if="isLogin">Admin</b-nav-item>
				<b-nav-item class="auth-btn" v-on:click="login" to="auth">{{ text }}</b-nav-item>
			</b-nav>
		</b-navbar>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		data: function() {
			return {
				isLogin: false,
				text: 'Đăng nhập'
			};
		},
		methods: {
			login: function() {
				this.isLogin = !this.isLogin;
				this.text = this.isLogin ? 'Đăng xuất' : 'Đăng nhập';
			}
		}
	};
</script>

<style scoped>
	.navbar {
		background-color: #049dd9;
	}

	.nav-item a {
		color: white;
	}

	.nav-item a:hover {
		color: #04d9b2;
	}

	.home {
		border-radius: 20px;
		background-color: #f272d0;
	}

	.home a:hover {
		color: #f2bc57;
	}

	.auth-btn {
		border-radius: 20px;
		background-color: #4ABFD9;
	}

	.auth-btn a:hover {
		color: #f2bc57;
	}
</style>