<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>物料收率</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="departmentNameForm">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择车间名称"
                            value-key="departmentCode"
                            @change="selectDepartment"
                            :disabled="type == 'view'"
                        >
                            <el-option
                                v-for="item in departmentList"
                                :key="item.departmentCode"
                                :label="item.departmentName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="materialNameForm">
                        <el-select
                            v-model="form.materialName"
                            :disabled="type == 'view'"
                            placeholder="请选择物料名称"
                            value-key="materialId"
                            @change="selectMaterial"
                        >
                            <el-option
                                v-for="item in materialsList"
                                :key="item.departmentCode"
                                :label="item.materialName"
                                :value="item.materialName"
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
            addBtn: false,
            editBtn: false,
            viewBtn: false,
            delBtn: false,
            loading: true,
            flag: false,
            data: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                searchShowBtn: false,
                // viewBtn: true,
                searchMenuSpan: 6,
                row: true,
                span: 24,
                dialogWidth: '40%',
                menuSpan: 12,
                index: true,
                indexLabel: '序号',
                column: [
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        rules: [
                            {
                                required: true,
                                message: '请输入车间名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true
                    },
                    {
                        label: '车间代码',
                        prop: 'departmentCode',
                        disabled: true,
                        display: false,
                        hide: true
                    },
                    {
                        label: '物料名称',
                        prop: 'materialName',
                        rules: [
                            {
                                required: true,
                                message: '请输入物料名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true
                    },
                    {
                        label: '收率',
                        prop: 'yield',
                        rules: [
                            {
                                required: true,
                                message: '请输入收率',
                                trigger: ['blur', 'change']
                            }
                        ]
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                departmentName: '',
                materialName: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            departmentList: [],
            materialsList: [],
            myExportBtn: false,
            myImportBtn: false
        }
    },
    created() {
        this.setOperate()
        this.getData()
        this.getDepartment()
        this.getmMterialsOptions()
    },
    mounted() {
        console.log(this.$store.state.user.userInfo.orgId)
    },
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
        getData() {
            this.loading = true
            this.$api
                .materialYieldList({
                    departmentName: this.form.departmentName,
                    materialName: this.form.materialName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
                    this.loading = false
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.form.departmentName = ''
            this.form.materialName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        getDepartment() {
            this.$api
                .commonDepartment({
                    orgNid: this.$store.state.user.userInfo.orgNid
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.departmentList = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        getmMterialsOptions() {
            this.$api.materialsOptions({}).then(res => {
                if (res.code == 'SUCCESS') {
                    this.materialsList = res.data
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
        selectMaterial(val) {
            console.log(val)
            this.form.materialName = val
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            this.$api
                .materialYieldAdd({
                    departmentName: form.departmentName,
                    departmentCode: form.departmentCode,
                    materialName: form.materialName,
                    yield: form.yield
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
                .materialYieldEdit({
                    id: form.id,
                    departmentName: form.departmentName,
                    departmentCode: form.departmentCode,
                    materialName: form.materialName,
                    yield: form.yield
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
                    .materialYieldDel({
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
