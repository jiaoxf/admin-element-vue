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
                    <template slot-scope="{}" slot="factoryNameForm">
                        <el-select
                            v-model="form.factoryName"
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
            factoryList: []
        }
    },
    created() {
        this.getData()
        this.getFactory()
    },
    mounted() {
        console.log(this.$api)
    },
    computed: {},
    watch: {},
    methods: {
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
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
