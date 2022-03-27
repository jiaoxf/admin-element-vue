<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>辅料指标</el-breadcrumb-item>
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
					<template slot-scope="{}" slot="menuRight">
                        <div style="display: flex; justify-content: end">
                            <el-button
                                v-if="myExportBtn"
                                size="small"
                                icon="el-icon-download"
                                type="primary"
                                style="margin-right: 10px"
                                >导出</el-button
                            >
                            <el-upload
                                v-if="myImportBtn"
                                :auto-upload="false"
                                :show-file-list="false"
                                action="action"
                                :on-change="importTing"
                            >
                                <el-button icon="el-icon-upload2" size="small" type="primary"
                                    >导入</el-button
                                >
                            </el-upload>
                        </div>
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
			loading: true,
            flag: false,
            data: [],
            option: {
				addBtn: false,
                editBtn: false,
                viewBtn: false,
                delBtn: false,
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
                        label: '辅料名称',
                        prop: 'accessoryName',
                        rules: [
                            {
                                required: true,
                                message: '请输入辅料名称',
                                trigger: 'blur'
                            }
                        ],
                        search: true
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
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'accessoryName',
            // key1: 'materialSize',
            // key2: 'materialId',
            form: {
                accessoryName: '',
                targetName: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            myExportBtn: false,
            myImportBtn: false
        }
    },
    created() {
		   this.setOperate()
        this.getData()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
		setOperate() {
            let result = this.$utils.getOperate(this.$route.meta.id)
            result.then(res => {
                let resultList = res.data
                let btnList = []
                resultList.forEach(element => {
                    btnList.push(element.operCode)
                })
                btnList.indexOf('add') > -1
                    ? (this.option.addBtn = true)
                    : (this.option.addBtn = false) // 新增按钮
                btnList.indexOf('edit') > -1
                    ? (this.option.editBtn = true)
                    : (this.option.editBtn = false) // 编辑按钮
                btnList.indexOf('delete') > -1
                    ? (this.option.delBtn = true)
                    : (this.option.delBtn = false) // 删除按钮
                btnList.indexOf('view') > -1
                    ? (this.option.viewBtn = true)
                    : (this.option.viewBtn = false) // 查看按钮
                btnList.indexOf('import') > -1
                    ? (this.myImportBtn = true)
                    : (this.myImportBtn = false) // 导出
                btnList.indexOf('export') > -1
                    ? (this.myExportBtn = true)
                    : (this.myExportBtn = false) // 导入
                // 如果都没有权限
                if (
                    this.myEditBtn == false &&
                    this.myViewBtn == false &&
                    this.myDeleteBtn == false
                ) {
                    this.permission = {
                        menu: false
                    }
                }
            })
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
                .supplementaryIndexList({
                    accessoryName: this.form.accessoryName,
                    targetName: this.form.targetName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
					this.loading = false
                    this.page1.total = res.total
                    this.rowspan()
                })
        },
        resetData() {
            this.form.accessoryName = ''
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
                .supplementaryIndexAdd({
                    accessoryName: form.accessoryName,
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
                .supplementaryIndexEdit({
                    id: form.id,
                    accessoryName: form.accessoryName,
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
                        .supplementaryIndexDel({
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
        },
		importTing(){

		}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
