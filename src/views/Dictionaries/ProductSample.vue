<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品样编码</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="factoryNameForm">
                        <el-select
                            v-model="form.factoryName"
							:disabled="type == 'view'"
                            placeholder="请选择分厂名称"
                            value-key="factoryCode"
                            @change="selectFactory"
                        >
                            <el-option
                                v-for="item in factoryList"
                                :key="item.factoryCode"
                                :label="item.factoryName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ error }" slot="factoryNameError">
                        <p style="color: green">自定义提示{{ error }}</p>
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
                        label: '分厂名称',
                        prop: 'factoryName',
                        rules: [
                            {
                                required: true,
                                message: '请选择分厂名称',
                                trigger: 'change'
                            }
                        ],
                        errorslot: true,
                        search: true,
                        formslot: true
                    },
                    {
                        label: '产品样名称',
                        prop: 'sampleName',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品样名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true,
                        searchLabelWidth: 100
                    },
                    {
                        label: '产品样代码',
                        prop: 'sampleCode',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品样代码',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true,
                        searchLabelWidth: 100
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                factoryName: '',
                factoryCode: '',
                sampleName: '',
                sampleCode: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            factoryList: [],
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
		this.setOperate()
        this.getData()
        this.getFactory()
    },
    mounted() {
        console.log(this.$api)
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
        getFactory() {
            this.$api.commonFactory({}).then(res => {
                if (res.code == 'SUCCESS') {
                    this.factoryList = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        selectFactory(val) {
            console.log(val)
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
        },
        getData() {
			this.loading = true
            this.$api
                .sampleCodeList({
                    sampleName: this.form.sampleName,
                    factoryCode: this.form.factoryCode,
                    factoryName: this.form.factoryName,
                    sampleCode: this.form.sampleCode,
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
            this.form.sampleName = ''
            this.form.factoryCode = ''
            this.form.factoryName = ''
            this.form.sampleCode = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            console.log(form)
            this.$api
                .sampleCodeAdd({
                    sampleName: form.sampleName,
                    factoryCode: form.factoryCode,
                    factoryName: form.factoryName,
                    sampleCode: form.sampleCode
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
                .sampleCodeEdit({
                    id: form.id,
                    sampleName: form.sampleName,
                    factoryCode: form.factoryCode,
                    factoryName: form.factoryName,
                    sampleCode: form.sampleCode
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
                        .sampleCodeDel({
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
