<template>
	<div class="el-icon">
		<i :class="iconName" :style="[{ color: iconColor, fontSize: iconSize }, iconStyle]"></i>
	</div>
</template>
<script>
export default {
	name: 'name',
	props: {
		iconName: {
			type: String,
			default: ''
		},
		iconSize: {
			type: String,
			default: '1rem'
		},
		iconColor: {
			type: String,
			default: '#000000'
		},
		iconStyle: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	components: {},
	data() {
		return {}
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	methods: {},
	created() {},
	mounted() {},
	activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.el-icon {
	display: inline-block;
	padding: 20px;
}
</style>
