<template>
	<div class="">
		<el-drawer
			:visible.sync="newDrawerFormVisible"
			:title="
				newFormEditType === 'edit' ? '编辑' : newFormEditType === 'add' ? '新增' : '设置'
			"
			direction="rtl"
			@close="handleFormModalCancel"
			custom-class="demo-drawer"
			ref="drawer"
		>
			<div class="demo-drawer__content">
				<el-form
					:size="size"
					inline
					:label-width="labelWidth"
					:model="searchData"
					ref="searchData"
					:rules="rules"
					class="formClass"
				>
					<template v-for="item in formLabel">
						<el-form-item
							v-if="item.isFormItemShow"
							:label="item.label"
							:key="item.prop"
							:prop="item.prop"
							:label-width="item.width"
						>
							<!-- input -->
							<el-input
								v-if="item.type === 'Input'"
								v-model="searchData[item.prop]"
								:size="size"
								:placeholder="item.placeholder"
								:disabled="item.disabled"
							></el-input>
							<!-- select -->
							<el-select
								v-if="item.type === 'Select'"
								v-model="searchData[item.prop]"
								:placeholder="item.placeholder"
								:size="size"
								@change="item.change(searchData[item.prop])"
							>
								<el-option
									v-for="i in item.props"
									:label="i.label"
									:value="i.value"
									:key="i.value"
								></el-option>
							</el-select>
							<el-radio-group
								v-if="item.type === 'Radio'"
								v-model="searchData[item.prop]"
							>
								<el-radio v-for="r in item.props" :label="r.value" :key="r.value">
									{{ r.label }}
								</el-radio>
							</el-radio-group>
							<!-- textarea-->
							<el-input
								v-if="item.type === 'TextArea'"
								v-model="searchData[item.prop]"
								type="textarea"
								:size="size"
								:placeholder="item.placeholder"
								:disabled="item.disabled"
							></el-input>
							<!--tree-->
							<!-- <el-tree
                v-if="item.type==='Tree'"
                ref="tree"
                :data="item.props"
                show-checkbox
                default-expand-all
                node-key="id"
                highlight-current
                :props="defaultProps"
                :default-checked-keys="checkedDedault"
                @check-change="getCheckedKeys"
              /> -->
						</el-form-item>
					</template>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button :size="size" @click="handleFormModalCancel('searchData')">
						取 消
					</el-button>
					<el-button :size="size" type="primary" @click="handleFormModalOk('searchData')">
						确 定
					</el-button>
				</div>
			</div>
		</el-drawer>
	</div>
</template>
<script>
export default {
	name: 'name',
	props: {
		rules: {
			type: Object,
			default: () => {
				return Object
			}
		},
		labelWidth: {
			type: String,
			default: '80px'
		},
		formEditType: {
			type: String,
			default: 'add'
		},
		drawerFormVisible: {
			type: Boolean,
			default: false
		},
		size: {
			type: String,
			default: 'medium'
		},
		formLabel: {
			type: Array,
			default: () => {
				return Array
			}
		},
		searchData: {
			type: Object,
			default: () => {
				return Object
			}
		},
		checkedDedault: {
			type: Array
		}
	},
	components: {},
	data() {
		return {
			newFormEditType: '',
			newDrawerFormVisible: false,
			table: false,
			dialog: false,
			loading: false,
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			formLabelWidth: '80px',
			timer: null
		}
	},
	created() {},
	mounted() {},
	computed: {},
	watch: {
		formEditType: {
			handler(newVal) {
				this.newFormEditType = newVal
			}
		},
		drawerFormVisible: {
			handler(newVal) {
				console.log('111', newVal)
				this.newDrawerFormVisible = newVal
			}
		}
	},
	methods: {
		handleFormModalOk(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.$emit('validateTrue', this.searchData) // this.$refs.searchData.resetFields();
				} else {
					this.$emit('validateFalse', this.searchData)
				}
			})
		},
		handleFormModalCancel() {
			this.newDrawerFormVisible = false
			this.$refs.searchData.resetFields()
			this.$emit('closeDrawerFunc', this.newDrawerFormVisible)
		},
		handleClose(done) {
			if (this.loading) {
				return
			}
			this.$confirm('确定要提交表单吗？')
				.then(() => {
					this.loading = true
					this.timer = setTimeout(() => {
						done() // 动画关闭需要一定的时间
						setTimeout(() => {
							this.loading = false
						}, 400)
					}, 2000)
				})
				.catch(() => {})
		},
		cancelForm() {
			this.loading = false
			this.dialog = false
			clearTimeout(this.timer)
		}
	},

	activated() {}
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
::v-deep .el-form-item__content {
	width: 200px;
}
::v-deep .el-select {
	width: 200px;
}
.dialog-footer {
	text-align: center;
}
</style>
