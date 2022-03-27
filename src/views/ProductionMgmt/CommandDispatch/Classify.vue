<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产指挥调度</el-breadcrumb-item>
                <el-breadcrumb-item>指令分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-table">
                <avue-crud
                    ref="crud"
                    :option="option"
                    :data="data"
                    v-model="form"
                    @row-save="handleSave"
                    @row-update="handleUpdate"
                    @row-del="handleDel"
                    @search-change="searchChange"
                    @current-change="currentChange"
                    :page.sync="page1"
                    @search-reset="resetData"
                    :span-method="spanMethod"
                    :table-loading="loading"
					:permission="permission"
                >
                    <template slot-scope="{}" slot="departmentNameSearch">
                        <el-select
                            v-model="searchDepartmentName"
                            placeholder="请选择车间名称"
                            value-key="departmentCode"
                            @change="searchDepartment"
                        >
                            <el-option
                                v-for="item in departmentSearch"
                                :key="item.productCode"
                                :label="item.departmentName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
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
                    <template slot-scope="{}" slot="departmentNameForm">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择车间名称"
                            value-key="departmentCode"
                            @change="selectDepartment"
                        >
                            <el-option
                                v-for="item in departmentList"
                                :key="item.productCode"
                                :label="item.departmentName"
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
			permission: {},
            loading: true,
            flag: false,
            data: [],
            option: {
                size: 'mini',
                border: true,
                columnBtn: false,
                refreshBtn: false,
                viewBtn: false,
                searchShowBtn: false,
                row: true,
                span: 24,
                searchMenuSpan: 6,
                dialogWidth: '40%',
                index: true,
                labelWidth: 150,
                indexLabel: '序号',
                // menuWidth:400,
                // addBtn: false,
                column: [
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择车间名称',
                                trigger: 'blur'
                            }
                        ]
                    },
                    {
                        label: '指令分类',
                        prop: 'directiveTypeName',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入指令分类',
                                trigger: 'blur'
                            }
                        ]
                    }
                ]
            },
            form: {
                departmentCode: '',
                directiveTypeName: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            spanArr: [],
            // 合并单元格的
            key: 'departmentName',
            departmentSearch: [],
            departmentList: [],
            searchDepartmentName: '',
            searchDepartmentCode: '',
			myImportBtn: false,
            myExportBtn: false
        }
    },
    created() {
        this.getData()
        this.getDepartment()
        this.setOperate()
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
                btnList.indexOf('add') > -1 ? (this.option.addBtn = true) : (this.option.addBtn = false) // 新增按钮
                btnList.indexOf('edit') > -1 ? (this.option.editBtn = true) : (this.option.editBtn = false) // 编辑按钮
                btnList.indexOf('delete') > -1
                    ? (this.permission.delBtn = true)
                    : (this.permission.delBtn = false) // 删除按钮
                btnList.indexOf('view') > -1 ? (this.option.viewBtn = true) : (this.option.viewBtn = false) // 查看按钮
				btnList.indexOf('import') > -1
                    ? (this.myImportBtn = true)
                    : (this.myImportBtn = false) // 导出
                btnList.indexOf('export') > -1
                    ? (this.myExportBtn = true)
                    : (this.myExportBtn = false) // 导入

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
        getDepartment() {
            this.$api
                .commonDepartment({
                    orgNid: this.$store.state.user.userInfo.orgNid
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.departmentList = res.data
                        this.departmentSearch = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        selectDepartment(val) {
            console.log(val)
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        searchDepartment(val) {
            console.log(val)
            this.searchDepartmentName = val.departmentName
            this.searchDepartmentCode = val.departmentCode
            console.log(this.form.departmentCode)
        },
        getData() {
            this.loading = true
            this.$api
                .commandTypeList({
                    departmentCode: this.searchDepartmentCode,
                    directiveTypeName: this.form.directiveTypeName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.form.departmentCode = ''
                    this.data = res.rows
                    this.loading = false
                    this.page1.total = res.total
                    this.rowspan()
                })
        },
        resetData() {
            this.searchDepartmentCode = ''
            this.searchDepartmentName = ''
            this.form.directiveTypeName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            this.$api
                .commandTypeAdd({
                    departmentCode: form.departmentCode,
                    directiveTypeName: form.directiveTypeName,
                    departmentName: form.departmentName,
                    remark: ''
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
                .commandTypeEdit({
                    id: form.id,
                    departmentCode: form.departmentCode,
                    directiveTypeName: form.directiveTypeName,
                    departmentName: form.departmentName
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
                    .commandTypeDel({
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
        importTing() {
            console.log('导入')
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
