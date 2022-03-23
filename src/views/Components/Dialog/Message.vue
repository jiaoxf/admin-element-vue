<template>
	<div class="">
		<el-button :plain="true" @click="open2">成功</el-button>
		<el-button :plain="true" @click="open3">警告</el-button>
		<el-button :plain="true" @click="open1">消息</el-button>
		<el-button :plain="true" @click="open4">错误</el-button>
		<el-button :plain="true" @click="open5">可关闭消息</el-button>
		<el-button :plain="true" @click="open6">文字居中</el-button>
		<el-button :plain="true" @click="open7">更换图标</el-button>
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
	methods: {
		open1() {
			this.$message('这是一条消息提示')
		},
		open2() {
			this.$message({
				message: '恭喜你，这是一条成功消息',
				type: 'success'
			})
		},

		open3() {
			this.$message({
				message: '警告哦，这是一条警告消息',
				type: 'warning'
			})
		},

		open4() {
			this.$message.error('错了哦，这是一条错误消息')
		},
		open5() {
			this.$message({
				showClose: true,
				message: '这是一条消息提示'
			})
		},
		open6() {
			this.$message({
				showClose: true,
				message: '这是一条消息提示',
				center: true
			})
		},
		open7() {
			this.$message({
				showClose: true,
				message: '这是一条消息提示',
				center: true,
				iconClass: 'el-icon-s-promotion'
			})
		}
	},
	activated() {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
