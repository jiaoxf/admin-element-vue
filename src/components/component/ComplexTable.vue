<template>
	<div class="table">
		<el-table id="iTable" v-loading="mTable.loading" :data.sync="data" :stripe="mTable.stripe">
			<el-table-column v-if="mTable.mutiSelect" type="selection" width="55"></el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
	props: {
		data: Array,
		column: Array,
		option: {
			type: Object,
			default: () => {
				return {
					loading: false,
					stripe: false,
					mutiSelect: true,
					width: '' //表格单个column表头配置
				}
			}
		}
	},
	data() {
		return {}
	},
	methods: {
		// 按钮组 点击事件
		buttonClick(params) {
			if (params == '新增') {
				this.$parent.add()
			} else {
				this.$parent.edit()
			}
		},
		// 状态operation 点击事件（删除/编辑）
		operationClick(params) {
			switch (params.operation) {
				case '0':
					this.$message.error('删除成功')
					break
				case '1':
					return this.$message.warning('编辑成功')
			}
		},
		// select change事件
		selectChange(params) {
			this.$parent.selectChange(params)
		}
	},
	computed: {
		mTable() {
			return Object.assign(
				{
					loading: false,
					stripe: false,
					mutiSelect: false,
					width: ''
				},
				this.option
			)
		}
	},
	mounted() {}
}
</script>
<style></style>
