<template>
	<div class="table">
		<el-table id="iTable" v-loading="mTable.loading" :data.sync="data" :stripe="mTable.stripe">
			<el-table-column v-if="mTable.mutiSelect" type="selection" width="55"></el-table-column>
			<el-table-column
				v-for="(item, index) in tableLabel"
				:width="item.width ? item.width : ''"
				:key="index"
				:align="item.align"
				:label="item.label"
				:prop="item.param"
				:sortable="item.sortable ? 'custom' : false"
			>
				<template slot-scope="scope">
					<span v-if="item.render">{{ item.render(scope.row, scope.column) }}</span>
					<span v-else-if="item.num">{{ ++scope.$index }}</span>
					<span v-else-if="item.param == 'roleName'">{{ scope.row.roleName || '无' }}</span>
					<span v-else-if="item.options">
						<el-button
							v-for="(item, index) in scope.row.btnOption.options"
							v-show="item.showBtn"
							:key="index"
							:type="item.type"
							:disabled="item.disabled"
							:icon="item.icon"
							:style="item.style"
							@click="handleButton(item.methods, scope.row)"
							size="mini"
						>{{ item.label }}</el-button>
					</span>
					<span v-else>{{ scope.row[item.param] }}</span>
				</template>
			</el-table-column>
			<el-table-column
				v-if="tableOption.label"
				:width="tableOption.width"
				:label="tableOption.label"
				align="center"
				class-name="small-padding fixed-width"
			>
				<template slot-scope="scope">
					<el-button
						v-for="(item, index) in tableOption.options"
						:key="index"
						:type="item.type"
						:icon="item.icon"
						@click="handleButton(item.methods, scope.row)"
						size="mini"
					>
						{{ item.label }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-if="pagination"
			background
			:total="pagination.total"
			:page-size="pagination.pageSize"
			:page-sizes="pagination.pageSizes"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="handleSizeChange"
			@current-change="handleIndexChange"
			style="padding: 20px;"
		></el-pagination>
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
		},
		tableLabel: {
			type: Array,
			default: () => {
				return []
			}
		},
		tableOption: {
			type: Object,
			default: () => {
				return {}
			}
		},
		pagination: Object
	},
	data() {
		return {
			formInline: {
				user: '',
				region: ''
			}
		}
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
		},
		handleSizeChange() {
			console.log(2)
		},
		handleIndexChange() {
			console.log(1)
		},
		handleButton(methodName, row) {
			console.log(methodName, row)
			// this.$emit(methodName)
			this.$emit(methodName, row)
		},
		onSubmit() {
			console.log('submit!')
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
