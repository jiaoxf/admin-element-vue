<template>
	<div>
		<div class="form">
			<h2>Panda Admin</h2>
			<div class="form-item">
				<div class="ipt user">
					<input type="text" placeholder="请输入用户名" v-model="data.username" />
					<img src="@/assets/img/login-1.png" alt="" />
				</div>
				<div class="ipt pass">
					<input type="password" placeholder="请输入密码" v-model="data.password" />
					<img src="@/assets/img/login-2.png" alt="" />
				</div>
				<img src="@/assets/img/login-0.png" alt="" />
				<button @click="login" @keyup.enter="login">登录</button>
				<span @click="isCreate" class="add">注册</span>
			</div>
		</div>
		<ul class="bg-bubbles">
			<li v-for="i in 10" :key="i"></li>
		</ul>
		<div class="hint"></div>

		<transition name="fade">
			<section class="create" v-if="isShow">
				<div class="create-form">
					<h3>创建账号</h3>
					<input type="text" placeholder="用户名" v-model="create.username" />
					<input type="password" placeholder="密码" v-model="create.password" />
					<input type="password" placeholder="重复密码" v-model="create.passwords" />
					<button @click="createSubmit">sign in</button>
					<p>
						<span class="el-icon-warning"></span>
						管理员账号只能创建一次, 请牢记账号和密码！
					</p>
					<span @click="isCreate" class="el-icon-circle-close"></span>
				</div>
			</section>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'name',
	props: {},
	components: {},
	data() {
		return {}
	},
	created() {},
	mounted() {},
	computed: {},
	watch: {},
	methods: {},
	activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
@import 'index.scss';
</style>
