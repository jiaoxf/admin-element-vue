<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/productionPlanMgmt/productionYear' }"
                    >生产计划管理</el-breadcrumb-item
                >
                <el-breadcrumb-item>月生产计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-form">
                <el-form :model="form" class="demo-form-inline" label-width="100px">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="时间（年月）:">
                                <el-date-picker
                                    v-model="form.planTime"
                                    type="month"
                                    placeholder="时间（年月）"
                                    value-format="yyyy-MM"
                                    style="width: 100%"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label-width="60px" label="名称:">
                                <el-input
                                    v-model="form.planName"
                                    placeholder="请输入名称"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label-width="80px" label="版本号:">
                                <el-input
                                    v-model="form.version"
                                    placeholder="版本号"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="更新日期:">
                                <el-date-picker
                                    style="width: 100%"
                                    v-model="form.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    clearable
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="mb-10">
                            <el-button type="primary" icon="el-icon-search" @click="searchChange"
                                >搜索</el-button
                            >
                            <el-button icon="el-icon-delete" @click="resetData">清空</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <avue-crud
                ref="crud"
                :option="option"
                :data="data"
                v-model="form"
                @row-save="handleSave"
                @row-update="handleUpdate"
                @current-change="currentChange"
                :page.sync="page1"
                :table-loading="loading"
            >
                <template slot-scope="{ type, size }" slot="menuLeft">
                    <el-button
                        v-if="myAddBtn"
                        type="primary"
                        icon="el-icon-plus"
                        :size="size"
                        @click="pushDetail('add')"
                    >
                        新增</el-button
                    >
                </template>
                <template slot-scope="{}" slot="menuRight">
                    <div style="display: flex; justify-content: end">
                        <el-button
                            v-if="myExportBtn"
                            size="small"
                            icon="el-icon-download"
                            type="primary"
                            style="margin-right: 10px"
                            @click="exportFunction"
                            >导出</el-button
                        >
                        <el-button
                            v-if="myImportBtn"
                            icon="el-icon-upload2"
                            size="small"
                            type="primary"
                            @click="importBtn"
                            >导入</el-button
                        >
                    </div>
                </template>
                <template slot-scope="{ row, type, size }" slot="menu">
                    <el-button
                        type="text"
                        icon="el-icon-view"
                        :size="size"
                        @click="pushDetail('view', row)"
                        >查看</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        :size="size"
                        @click="pushDetail('edit', row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        :size="size"
                        @click="handleDel(row)"
                        >删除</el-button
                    >
                </template>
            </avue-crud>
            <el-dialog title="数据导入" :visible.sync="dialogVisible" width="40%">
                <div v-if="pageActive == 0" class="step-div">
                    <div class="step-div">
                        <p style="font-size: 14px; font-weight: bold; margin-bottom: 10px">
                            欢迎使用数据导入向导。
                        </p>
                        <p style="margin-left: 15px">第一步：下载数据模板</p>
                        <p style="margin-bottom: 16px; margin-left: 15px">
                            第二步：选择导入的数据文件
                        </p>
                        <p class="tip-text">*请下载最新数据模板，填写数据后再使用数据导入向导</p>
                        <p class="tip-text">
                            *如已下载最新数据模板，并填写完毕数据，请点击“开始”进入数据导入
                        </p>
                        <p class="tip-text">*填写数据前，请仔细阅读导入说明，并按要求填写</p>
                    </div>
                </div>
                <div v-if="pageActive == 1">
                    <div class="step-div">
                        <p>第一步：下载数据模板</p>
                        <p style="margin-left: 15px">若已下载模板，请执行下一步。</p>
                    </div>

                    <el-button
                        size="small"
                        icon="el-icon-download"
                        type="text"
                        style="margin-right: 10px"
                        @click="downTemplate"
                        >下载模板</el-button
                    >
                </div>
                <div v-if="pageActive == 2">
                    <div class="step-div">
                        <p>第二步：选择要导入的数据文件</p>
                        <p style="margin-left: 15px">
                            允许文件类型：xls，xlsx，文件大小，5 MB以内。
                        </p>
                        <p style="margin-left: 15px">
                            根据网络、以及文件大小等因素，导入数据文件需要时间不等，请耐心等待。
                        </p>
                        <p style="margin-bottom: 16px; margin-left: 15px">
                            添加数据文件后，请点击“确认”开始导入数据文件...
                        </p>
                    </div>
                    <p style="padding: 10px">数据模板</p>
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action=""
                        :http-request="uploadFileChange"
                        :auto-upload="false"
                        :on-change="upload"
                        :limit="1"
                    >
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    </el-upload>
                </div>
                <div v-if="pageActive == 3">
                    {{ this.uploadFileMsg }}
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button v-if="pageActive == 0" @click="startBtn" icon="el-icon-s-promotion"
                        >开 始</el-button
                    >
                    <el-button v-if="pageActive == 1" @click="lastStep">上一步</el-button>
                    <el-button v-if="pageActive == 1" type="primary" @click="nextStep"
                        >下一步</el-button
                    >
                    <el-button v-if="pageActive == 2" type="primary" @click="submitUpload"
                        >确 认</el-button
                    >
                    <el-button v-if="pageActive == 3" type="primary" @click="dialogVisible = false"
                        >关 闭</el-button
                    >
                </span>
            </el-dialog>
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
            exportVal: 0,
            pageActive: 0,
            dialogVisible: false,
            loading: true,
            data: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                viewBtn: true,
                row: true,
                span: 12,
                addBtn: false,
                viewBtn: false,
                editBtn: false,
                delBtn: false,
                searchShowBtn: false,
                searchMenuSpan: 6,
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '时间（年月）',
                        prop: 'planMonth',
                        search: false
                    },
                    {
                        label: '分厂名称',
                        prop: 'factoryName',
                        display: false
                    },
                    {
                        label: '名称',
                        prop: 'planName',
                        display: false,
                        width: 200,
                        overHidden: true
                    },
                    {
                        label: '版本号',
                        prop: 'version',
                        display: false
                    },
                    {
                        label: '更新时间',
                        prop: 'createDate',
                        display: false,
                        overHidden: true
                    }
                ]
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            form: {
                planTime: '', //计划时间（年月）
                planName: '', //计划名称
                version: '', //计划版本
                beginDate: '', //更新时间起
                endDate: '', //更新时间止
                time: ''
            },
            myAddBtn: false,
            myExportBtn: false,
            myImportBtn: false,
            fileInfo: '',
            uploadFileMsg: ''
        }
    },
    created() {},
    mounted() {
        this.getData()
        this.setOperate()
    },
    computed: {},
    watch: {},
    methods: {
        setOperate() {
            let result = this.$utils.getOperate(this.$route.meta.id)
            result.then(res => {
                /* this.permission = {
                    delBtn: false,
                    addBtn: false,
					viewBtn: false
                } */
                let resultList = res.data
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
                .monthPlanList({
                    planTime: this.form.planTime, //计划时间（年）
                    planName: this.form.planName, //计划名称
                    version: this.form.version, //计划版本
                    beginDate: this.form.time ? this.form.time[0] : '', //更新时间起
                    endDate: this.form.time ? this.form.time[1] : '', //更新时间止
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
                    this.loading = false
                    this.page1.total = res.total
                })
        },
        searchChange(params) {
            this.page1.currentPage = 1
            console.log(this.form)
            this.getData()
        },
        resetData() {
            this.form.planTime = ''
            this.form.planName = ''
            this.form.version = ''
            this.form.beginDate = ''
            this.form.endDate = ''
            this.form.time = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
        },
        handleSave(form, done, loading) {
            this.$api
                .productCodeAdd({
                    productId: form.productId,
                    productName: form.productName
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
                .productCodeEdit({
                    id: form.id,
                    productId: form.productId,
                    productName: form.productName
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
            console.log(form)
            this.$confirm('确认是否删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api
                    .monthPlanDel({
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
        pushDetail(type, row) {
            console.log(type, row)
            if (type == 'add') {
                this.$router.push({
                    path: '/monthDetail'
                })
                sessionStorage.setItem('monthStatus', type)
            } else {
                this.$router.push({
                    path: '/monthDetail',
                    query: {
                        status: type
                    }
                })
                sessionStorage.setItem('monthStatus', type)
                sessionStorage.setItem('monthInfo', JSON.stringify(row))
            }
        },
        downTemplate() {
            this.$api.monthPlanTemplate({}).then(res => {
                console.log(res)
                if (res.code == 'SUCCESS') {
                    window.open(res.data.templateFile)
                }
            })
        },
        exportFunction() {
            let params = {
                planTime: this.form.planTime, //计划年度
                planName: this.form.planName, //计划名称
                version: this.form.version, //计划版本
                beginDate: this.form.time ? this.form.time[0] : '', //更新日期起
                endDate: this.form.time ? this.form.time[1] : '' //更新日期止
            }
            console.log(params)
            axios({
                method: 'post',
                url: `${this.$baseUrl}/web/monthPlan/export`,
                headers: {
                    token: sessionStorage.getItem('login-user'),
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                data: params,
                responseType: 'blob' // 设置接收格式为blob格式
            }).then(res => {
                console.log(res)
                // console.log('res :>> ', res)
                if (res.data.code == 'FAIL') {
                    this.$message.error(res.data.message)
                } else {
                    const content = res.data
                    const blob = new Blob([content])
                    const fileName = '月生产计划.xlsx'
                    if ('download' in document.createElement('a')) {
                        const link = document.createElement('a') //创建a标签
                        link.download = fileName //a标签添加属性
                        link.style.display = 'none'
                        link.href = URL.createObjectURL(blob)
                        document.body.appendChild(link)
                        link.click() //执行下载
                        URL.revokeObjectURL(link.href) //释放url
                        document.body.removeChild(link) //释放标签
                    } else {
                        navigator.msSaveBlob(blob, fileName)
                    }
                }
            })
        },
        importFunction() {},
        importBtn() {
            this.pageActive = 0
            this.dialogVisible = true
        },
        startBtn() {
            this.pageActive = 1
        },
        lastStep() {
            this.pageActive = 0
        },
        nextStep() {
            this.pageActive = 2
        },
        upLoadFile() {
            this.pageActive = 3
        },
        upload(file, fileList) {
            console.log(file, fileList)
            console.log(file.raw)
            this.fileInfo = file.raw
        },
        uploadFileChange() {
            const loading = this.$loading({
                text: '正在导入中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            let formData = new FormData()
            formData.append('file', this.fileInfo)
            this.$api.monthPlanImport(formData).then(res => {
                console.log(res)
                if (res.code == 'SUCCESS') {
                    this.uploadFileMsg = res.message
                    this.page1.currentPage = 1
                    this.getData()
                    loading.close()
                } else {
                    this.uploadFileMsg = res.message
                    loading.close()
                }
            })
        },
        submitUpload() {
            let files = this.$refs.upload.uploadFiles
            if (files.length == 0) {
                this.$message.error('请选择文件')
                return
            }
            this.uploadFileMsg = ''
            this.$refs.upload.submit()
            this.pageActive = 3
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
@import 'index.scss';
</style>
