<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>辅料记录</el-breadcrumb-item>
                <el-breadcrumb-item>使用记录</el-breadcrumb-item>
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
                    <template slot-scope="" slot="useDateSearch">
                        <el-date-picker
                            v-model="form.time"
                            type="daterange"
                            range-separator="-"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="useDateForm">
                        <el-date-picker
                            v-model="form.useDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="departmentNameForm">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择 车间名称"
                            value-key="departmentCode"
                            @change="selectDepartment"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in departmentsList"
                                :key="item.departmentCode"
                                :label="item.departmentName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="accessoryNameForm">
                        <el-select
                            v-model="form.accessoryName"
                            placeholder="请选择辅料名称"
                            value-key="materialId"
                            @change="selectMaterial"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in accessoryNameList"
                                :key="item.materialId"
                                :label="item.materialName"
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
            defaults: {},
            // 质量指标数据
            indexArr: [],
            option: {
				addBtn: false,
                editBtn: false,
                viewBtn: false,
                delBtn: false,
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                viewBtn: true,
                row: true,
                span: 12,
                searchShowBtn: false,
                searchMenuSpan: 6,
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '使用日期',
                        prop: 'useDate',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择使用日期',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '辅料名称',
                        prop: 'accessoryName',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入辅料名称',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        searchLabelWidth: 100,
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入使用日期',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '使用量',
                        prop: 'useNum',
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入使用量',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '计量单位',
                        prop: 'measureUnit',
                        search: false,
                        disabled: true
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                factoryName: '', //分厂名称
                accessoryName: '',
                measureUnit: '',
                time: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            // 分厂option
            factoryList: [],
            accessoryNameList: [],
            indexStr: '',
            productIndexList: [],
            departmentsList: [],
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
        // this.getData()
        this.getMaterial()
        this.getDepartment()
        this.getData()
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
        getMaterial() {
            this.$api
                .commonMaterial({
                    materialType: 'FL'
                })
                .then(res => {
                    /* if (res.code == 'SUCCESS') {
                        this.accessoryNameList = res.data
                    } else {
                        this.$message.error(res.message)
                    } */
                    this.accessoryNameList = res.data
                })
        },
        getDepartment() {
            this.$api
                .commonDepartment({
                    orgNid: this.$store.state.user.userInfo.orgNid
                })
                .then(res => {
                    this.departmentsList = res.data
                })
        },
        selectMaterial(val) {
            this.form.accessoryName = val.materialName
            this.form.accessoryId = val.materialId
            this.getMaterialData(val.materialName)
        },
        selectDepartment(val) {
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        getMaterialData(name) {
            this.$api
                .accessoryData({
                    accessoryName: name
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.form.measureUnit = res.data.measureUnit
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        getData() {
            this.loading = true
            this.$api
                .ingredientsEmployList({
                    departmentName: this.form.departmentName, //车间名称
                    beginDate: this.form.time ? this.form.time[0] : '', //使用日期起
                    endDate: this.form.time ? this.form.time[1] : '', //使用日期止
                    accessoryName: this.form.accessoryName,
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
            this.form.time = ''
            this.form.useDate = ''
            this.form.accessoryName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
        },
        handleSave(form, done, loading) {
            let params = {
                ...form
            }
            this.$api.ingredientsEmployAdd(params).then(res => {
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
                .ingredientsEmployEdit({
                    id: form.id,
                    ...form
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
                    .ingredientsEmployDel({
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
        searchChange(params, done) {
            console.log(params)
            console.log(this.form)
            this.form.accessoryName = params.accessoryName
            this.form.departmentName = params.departmentName
            this.page1.currentPage = 1
            this.getData()
            done()
        },
        viewProductIndex(projectId) {
            this.indexArr = []
            this.$api
                .getMaterialIndexForm({
                    id: projectId
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        let productIndexArr = res.data
                        this.productIndexList = res.data
                        this.indexStr = productIndexArr[0].targetKey.substring(0, 3)
                        productIndexArr.forEach((item, i) => {
                            this.indexArr[i] = {
                                label: item.targetName,
                                prop: item.targetKey,
                                index: item.targetKey,
                                rules: [
                                    {
                                        required: true,
                                        message: `请输入${item.targetName}`,
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            }
                        })
                        this.option.group[1].column = this.indexArr
                        this.$nextTick(() => {
                            this.$refs.crud.updateDic()
                        })

                        let formList = res.data
                        formList.forEach(item => {
                            this.form[item.targetKey] = item.targetValue
                        })
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
		importTing(){}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
