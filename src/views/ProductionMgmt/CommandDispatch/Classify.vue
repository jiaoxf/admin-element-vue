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
            loading: true,
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
            searchDepartmentCode: ''
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
                console.log(res)
                /* this.permission = {
                    delBtn: false,
                    addBtn: false,
					viewBtn: false
                } */
                let resultList = [
                    {
                        operName: '导入', //操作名称
                        operCode: 'import' //操作代码
                    },
                    {
                        operName: '新增', //操作名称
                        operCode: 'add' //操作代码
                    },
                    {
                        operName: '编辑', //操作名称
                        operCode: 'edit' //操作代码
                    },
                    {
                        operName: '导出', //操作名称
                        operCode: 'export' //操作代码
                    },
                    {
                        operName: '删除', //操作名称
                        operCode: 'delete' //操作代码
                    },
                    {
                        operName: '查看', //操作名称
                        operCode: 'view' //操作代码
                    }
                ]
                let btnList = []
                resultList.forEach(element => {
                    btnList.push(element.operCode)
                })
                btnList.indexOf('add') > -1 ? (this.myAddBtn = true) : (this.myAddBtn = false) // 新增按钮
                btnList.indexOf('edit') > -1 ? (this.myEditBtn = true) : (this.myEditBtn = false) // 编辑按钮
                btnList.indexOf('delete') > -1
                    ? (this.myDeleteBtn = true)
                    : (this.myDeleteBtn = false) // 删除按钮
                btnList.indexOf('view') > -1 ? (this.myViewBtn = true) : (this.myViewBtn = false) // 查看按钮
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
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
