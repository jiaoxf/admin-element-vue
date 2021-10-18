<template>
	<div class="element-container">
		<el-row :gutter="20">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="component-content">
				<el-divider content-position="left">
					常用表格
					<a target="_blank" href="https://element.eleme.cn/#/zh-CN/component/table">
						文档
					</a>
				</el-divider>
				<!-- 常用表格 -->
				<common-table
					:isLoading="isLoading"
					:table-data="tableData"
					:table-label="tableLabel"
					:table-option="tableOption"
					:pagination="pagination"
					@edit="edit"
					@deleteBtn="deleteBtn"
				></common-table>
				<el-divider content-position="left">
					复杂表格
					<a target="_blank" href="https://element.eleme.cn/#/zh-CN/component/table">
						文档
					</a>
				</el-divider>
				<complex-table :data="data" :option="option" ref="table"></complex-table>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import CommonTable from '@/components/component/CommonTable'
import { clearTimeout } from 'timers'
import ComplexTable from '@/components/component/ComplexTable'
export default {
	name: 'name',
	props: {},
	components: {
		CommonTable,
		ComplexTable
	},
	data() {
		return {
			input: '',
			count: 0,
			isLoading: true,
			tableData: [
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 0,
					operation: 1
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 1
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},

				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				},
				{
					id: '1',
					name: '焦学峰',
					sex: '男',
					time: '2020-08-31 22:10:22',
					status: 2
				}
			],
			tableLabel: [
				{
					label: '序号',
					num: '1',
					width: '80',
					align: 'center'
				},
				{
					label: '名字',
					param: 'name',
					align: 'center'
				},
				{
					label: '性别',
					param: 'sex',
					align: 'center'
				},
				{
					label: '时间',
					param: 'time',
					align: 'center',
					width: '400',
					sortable: true
				},
				{
					label: '审核状态',
					param: 'status',
					align: 'center',
					render: row => {
						if (row.status === 0) {
							return '未审核'
						} else if (row.status === 1) {
							return '审核通过'
						} else if (row.status === 2) {
							return '审核不通过'
						} else {
							return '禁用'
						}
					}
				}
			],
			tableOption: {
				label: '操作',
				width: '200',
				options: [
					{ label: '编辑', type: 'primary', icon: 'el-icon-view', methods: 'edit' },
					{ label: '删除', type: 'danger', icon: 'el-icon-delete', methods: 'deleteBtn' }
				]
			},
			pagination: {
				total: 430,
				pageIndex: 1,
				pageSize: 10,
				pageSizes: [5, 10, 20]
			},
			// 表格数据
			data: [
				{
					name: '张三',
					sex: '男',
					status: '1',
					family: '北京市',
					operation: '0',
					select: '0'
				},
				{
					name: '李四',
					sex: '女',
					status: '0',
					family: '天津市',
					operation: '1',
					select: '1'
				},
				{
					name: '李333',
					sex: '女',
					status: '2',
					family: '上海市',
					operation: '1',
					select: '2'
				},
				{
					name: '李333',
					sex: '女',
					status: '2',
					family: '上海市',
					operation: '1',
					select: '2'
				},
				{
					name: '李333',
					sex: '女',
					status: '2',
					family: '上海市',
					operation: '1',
					select: '2'
				},
				{
					name: '李333',
					sex: '女',
					status: '2',
					family: '上海市',
					operation: '1',
					select: '2'
				},
				{
					name: '李333',
					sex: '女',
					status: '2',
					family: '上海市',
					operation: '1',
					select: '2'
				}
			],
			// 表格简单配置 loading stripe斑马纹等等
			option: {
				mutiSelect: true,
				stripe: true
			}
		}
	},
	created() {
		this.init()
	},
	//监听属性 类似于data概念
	computed: {},
	//监控data中的数据变化
	watch: {},
	methods: {
		init() {
			let timer = setTimeout(() => {
				this.isLoading = false
			}, 2000)
			if (this.isLoading === false) {
				clearTimeout(timer)
			}
		},
		aaa() {
			if (this.count === '') {
				alert(1)
			}
			console.log(this.count)
		},
		add() {
			this.$message.success('新增成功')
		},
		edit(row) {
			this.$message({
				message: '这是table组件的数据' + JSON.stringify(row),
				type: 'success'
			})
		},
		deleteBtn(row) {
			this.$message({
				message: '这是table组件的数据' + JSON.stringify(row),
				type: 'success'
			})
		},
		selectChange(params) {
			console.log(params)
		}
	},

	mounted() {},
	activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
/deep/ .el-input__inner {
	width: 100%;
}
</style>
