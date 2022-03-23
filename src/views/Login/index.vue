<template>
	<div class="panda-login">
		<div class="login-container">
			<div class="flex" style="height: 100%">
				<div class="login-left">
					<div class="login-title">
						<div class="login-title-text truncate">
							<!-- <img src="../../assets/login-logo.png" alt=""> -->
						</div>
					</div>
					<div class="margin-auto login-bg">
						<img alt src="../../assets/svg/login-box-bg.svg" />
						<div class="login-slogan">
							<span>LOMON-LAND MES System</span>
						</div>
					</div>
				</div>
				<div class="login-right">
					<LoginForm />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LoginForm from './LoginForm.vue'
export default {
	name: 'name',
	props: {},
	components: {
		LoginForm
	},
	data() {
		return {}
	},
	created() { },
	mounted() {
	},
	computed: {},
	watch: {},
	methods: {}
}
</script>
<style lang="scss" scoped>
@import "index.scss";
</style>
