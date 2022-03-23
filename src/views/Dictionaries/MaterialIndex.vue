<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>原料指标</el-breadcrumb-item>
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
					:table-loading="loading"
                >
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
                searchMenuSpan: 6,
                dialogWidth: '40%',
                index: true,
                labelWidth: 200,
                indexLabel: '序号',
                // menuWidth:400,
                // addBtn: false,
                column: [
                    {
                        label: '原料名称',
                        prop: 'materialName',
                        rules: [
                            {
                                required: true,
                                message: '请输入原料名称',
                                trigger: 'blur'
                            }
                        ],
                        search: true
                    },
                    {
                        label: '指标名称',
                        labelWidth: 200,
                        prop: 'targetName',
                        rules: [
                            {
                                required: true,
                                message: '请输入指标名称',
                                trigger: 'blur'
                            }
                        ],
                        search: true,
                        searchLabelWidth: 100
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'materialName',
            // key1: 'materialSize',
            // key2: 'materialId',
            form: {
                materialId: '',
                materialName: '',
                targetName: '',
                materialSize: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            }
        }
    },
    created() {
        this.getData()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
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
            if (
                column.property == [this.key] ||
                column.property == [this.key1] ||
                column.property == [this.key2]
            ) {
                const _row = this.spanArr[rowIndex]
                const _col = _row > 0 ? 1 : 0
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        getData() {
			this.loading = true
            this.$api
                .materialsIndexList({
                    materialName: this.form.materialName,
                    targetName: this.form.targetName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
					this.loading = false
                    this.rowspan()
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.form.materialName = ''
            this.form.targetName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            this.$api
                .materialsIndexAdd({
                    materialName: form.materialName,
                    targetName: form.targetName
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
        handleUpdate(form, index, done, loading) {
            this.$api
                .materialsIndexEdit({
                    id: form.id,
                    materialName: form.materialName,
                    targetName: form.targetName
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
            })
                .then(() => {
                    this.$api
                        .materialsIndexDel({
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
