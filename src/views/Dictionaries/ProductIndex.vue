<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品指标</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-table">
                <avue-crud
                    ref="crud"
                    :option="option"
                    :data="data"
                    :span-method="spanMethod"
                    v-model="form"
                    @row-save="handleSave"
                    @row-update="handleUpdate"
                    @row-del="handleDel"
                    @search-change="searchChange"
                    @current-change="currentChange"
                    :page.sync="page1"
                    @search-reset="resetData"
                    :before-open="beforeOpen"
                    :before-close="beforeClose"
					:table-loading="loading"
                >
                    <template slot-scope="{}" slot="productNameForm">
                        <el-select
                            v-model="form.productName"
                            placeholder="请选择产品名称"
                            value-key="productId"
                            @change="selectProduct"
                        >
                            <el-option
                                v-for="item in productList"
                                :key="item.productCode"
                                :label="item.productName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </avue-crud>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
			loading:true,
            flag: false,
            data: [],
            option: {
                size: 'mini',
                border: true,
                columnBtn: false,
                refreshBtn: false,
                // viewBtn: true,
                searchShowBtn: false,
                row: true,
                span: 24,
                searchMenuSpan: 5,
                dialogWidth: '40%',
                index: true,
				menuPosition: 'left',
                labelWidth: 150,
                indexLabel: '序号',
                // menuWidth:400,
                // addBtn: false,
                column: [
                    {
                        label: '产品名称',
                        prop: 'productName',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: 'blur'
                            }
                        ],
                        search: true
                    },
                    {
                        label: '产品规格',
                        prop: 'productSize',
                        search: true
                    },
                    {
                        label: '产品编号',
                        prop: 'productId',
                        search: true,
						display: false
                    },
                    {
                        label: '指标名称',
                        prop: 'targetName',
                        rules: [
                            {
                                required: true,
                                message: '请输入指标名称',
                                trigger: 'blur'
                            }
                        ],
                        search: true
                    }
                ],
                productList: []
            },
            spanArr: [],
            // 合并单元格的
            key: 'productName',
            /* key1: 'productSize',
			key2: 'productId', */
            form: {
                productId: '',
                productName: '',
                targetName: '',
                productSize: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            type: ''
        }
    },
    created() {
        this.getData()
        this.getProduct()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        beforeOpen(done, type) {
            this.type = type
            done()
        },
        beforeClose(done) {
            this.flag = false
            done()
        },
        getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        },
        selectProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
        },
        rowspan() {
            this.spanArr = []
            this.position = 0
            this.data.forEach((item, index) => {
                if (index === 0) {
                    this.spanArr.push(1)
                    this.position = 0
                } else {
                    if (this.data[index][this.key] === this.data[index - 1][this.key]) {
                        this.spanArr[this.position] += 1
                        this.spanArr.push(0)
                    } else {
                        this.spanArr.push(1)
                        this.position = index
                    }
                }
            })
        },
        spanMethod({ row, column, rowIndex, columnIndex }) {
            // console.log(rowIndex)
            if (column.property == [this.key]) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        getData(status) {
			this.loading = true
			let params = {}
			if(status){
				params = {
					productId: '',
                    productName: '',
                    targetName: '',
                    productSize: '',
                    currPage: this.page1.currentPage,
                    pageSize: 20
				}
			}else{
				params = {
					productId: this.form.productId,
                    productName: this.form.productName,
                    targetName: this.form.targetName,
                    productSize: this.form.productSize,
                    currPage: this.page1.currentPage,
                    pageSize: 20
				}
			}
            this.$api
                .productIndexList(params)
                .then(res => {
                    this.data = res.rows
					this.loading = false
                    this.page1.total = res.total
                    this.rowspan()
                })
        },
        resetData() {
            this.form.productId = ''
            this.form.productName = ''
            this.form.targetName = ''
            this.form.productSize = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            this.$api
                .productIndexAdd({
                    productId: form.productId,
                    productName: form.productName,
                    targetName: form.targetName,
                    productSize: form.productSize
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.$message.success(res.message)
                        this.page1.currentPage = 1
                        this.getData('add')
                        this.$confirm('是否继续添加?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                        })
                            .then(() => {
                                this.flag = true
                                // this.$refs.crud.rowSave()
                                if (this.flag) {
                                    this.flag = false
                                    loading()
                                    this.form.targetName = ''
                                }
                            })
                            .catch(() => {
                                done()
                            })
                    } else {
                        this.$message.error(res.message)
                    }
                })
            /*  this.$confirm('是否继续添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.flag = true
                    this.$refs.crud.rowSave()
                    if (this.flag) {
                        this.flag = false
                        loading()
                        this.form.targetName = ''
                        // this.form.sex = ''
                        this.$api
                            .productIndexAdd({
                                productId: form.productId,
                                productName: form.productName,
                                targetName: form.targetName,
                                productSize: form.productSize
                            })
                            .then(res => {
                                if (res.code == 'SUCCESS') {
                                    this.$message.success(res.message)
                                    this.page1.currentPage = 1
                                    this.getData()
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        return
                    }
                })
                .catch(() => {
                    this.$api
                        .productIndexAdd({
                            productId: form.productId,
                            productName: form.productName,
                            targetName: form.targetName,
                            productSize: form.productSize
                        })
                        .then(res => {
                            if (res.code == 'SUCCESS') {
                                this.$message.success(res.message)
                                this.page1.currentPage = 1
                                this.getData()
                                done()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                }) */

            /* if (this.flag) {
                this.flag = false
                loading()
                this.form.targetName = ''
                // this.form.sex = ''
				this.$api
                .productIndexAdd({
                    productId: form.productId,
                    productName: form.productName,
                    targetName: form.targetName,
                    productSize: form.productSize
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.$message.success(res.message)
                        this.page1.currentPage = 1
                        this.getData()
                    } else {
                        this.$message.error(res.message)
                    }
                })
				return
            }else{
				this.$api
                .productIndexAdd({
                    productId: form.productId,
                    productName: form.productName,
                    targetName: form.targetName,
                    productSize: form.productSize
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.$message.success(res.message)
                        this.page1.currentPage = 1
                        this.getData()
						done()
                    } else {
                        this.$message.error(res.message)
                    }
                })
			} */
        },
        handleUpdate(form, index, done, loading) {
            this.$api
                .productIndexEdit({
                    id: form.id,
                    productId: form.productId,
                    productName: form.productName,
                    targetName: form.targetName,
                    productSize: form.productSize
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.$message.success(res.message)
                        this.page1.currentPage = 1
                        this.getData()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            done()
        },
        handleDel(form, row, index) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api
                    .productIndexDel({
                        ids: form.id
                    })
                    .then(res => {
                        if (res.code == 'SUCCESS') {
                            this.$message.success(res.message)
                            this.page1.currentPage = 1
                            this.getData()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            })
        },
        handleNext() {
            this.flag = true
            this.$refs.crud.rowSave()
        },
        searchChange(params, done) {
            this.page1.currentPage = 1
            this.form = params
            this.getData()
            done()
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
