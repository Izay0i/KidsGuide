<template>
    <div>
        <div class="auth-form">
			<div class="body">
				<img src="@/assets/kids_banner.jpg" class="banner"/>
				
				<b-card no-body class="shadow-lg">
					<b-tabs card class="tabs">
						<b-tab
							v-for="tab in tabs"
							v-bind:key="tab.title"
							v-bind:title="tab.title"
						>
							<component v-bind:is="tab.component"></component>
						</b-tab>
					</b-tabs>
				</b-card>
			</div>
		</div>
    </div>
</template>

<script>
	import SignInForm from '@/components/SignInForm';
	import SignUpForm from '@/components/SignUpForm';

    export default {
        name: 'AuthForm',
		components: {
			SignInForm,
			SignUpForm
		},
		data: function() {
			return {
				tabs: [
					{ component: SignInForm, title: 'Đăng nhập' }, 
					{ component: SignUpForm, title: 'Đăng ký' }
				]
			};
		}
    }
</script>

<style scoped>
	.auth-form {
		display: flex;
		justify-content: center;
		width: 100%;
		height: auto;
		padding: 20px;
		border-radius: 20px;
		background-color: white;
	}

	.body {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.body .banner {
		width: auto;
		max-width: 40vw;
	}

	.body .tabs {
		width: 50vw;
	}
</style>