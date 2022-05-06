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
                            <div style="display: flex; justify-content: end">
                                <el-select
                                    v-if="myExportBtn"
                                    v-model="exportVal"
                                    placeholder="请选择"
                                    style="width: 100px !important; margin-right: 20px"
                                >
                                    <el-option
                                        v-for="item in exportOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
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
                        </div>
                    </template>
                    <template slot-scope="" slot="factoryNameSearch">
                        <el-input
                            v-model="form.factoryName"
                            placeholder="请输入分厂名称"
                            clearable
                        ></el-input>
                    </template>
                    <template slot-scope="" slot="sampleNameSearch">
                        <el-input
                            v-model="form.sampleName"
                            placeholder="请输入产品名称"
                            clearable
                        ></el-input>
                    </template>
                    <template slot-scope="" slot="sampleCodeSearch">
                        <el-input
                            v-model="form.sampleCode"
                            placeholder="请输入产品样代码"
                            clearable
                        ></el-input>
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
                            <p class="tip-text">
                                *请下载最新数据模板，填写数据后再使用数据导入向导
                            </p>
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
                            <el-button slot="trigger" size="small" type="primary"
                                >选取文件</el-button
                            >
                        </el-upload>
                    </div>
                    <div v-if="pageActive == 3">
                        {{ this.uploadFileMsg }}
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button
                            v-if="pageActive == 0"
                            @click="startBtn"
                            icon="el-icon-s-promotion"
                            >开 始</el-button
                        >
                        <el-button v-if="pageActive == 1" @click="lastStep">上一步</el-button>
                        <el-button v-if="pageActive == 1" type="primary" @click="nextStep"
                            >下一步</el-button
                        >
                        <el-button v-if="pageActive == 2" type="primary" @click="submitUpload"
                            >确 认</el-button
                        >
                        <el-button
                            v-if="pageActive == 3"
                            type="primary"
                            @click="dialogVisible = false"
                            >关 闭</el-button
                        >
                    </span>
                </el-dialog>
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
            exportVal: 0,
            exportOptions: [
                {
                    value: 0,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '当前页'
                }
            ],
            pageActive: 0,
            dialogVisible: false,
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
            myImportBtn: false,
            fileInfo: '',
            uploadFileMsg: ''
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
            }).then(() => {
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
            // this.form = params
            this.getData()
            done()
        },
        downTemplate() {
            this.$api.sampleCodeTemplate({}).then(res => {
                console.log(res)
                if (res.code == 'SUCCESS') {
                    window.open(res.data.templateFile)
                }
            })
        },
        exportFunction() {
            let params = {
                currPage: this.exportVal == 0 ? 0 : this.page1.currentPage, //当前页码
                factoryName: this.form.factoryName,
                sampleName: this.form.sampleName,
                sampleCode: this.form.sampleCode
            }
            axios({
                method: 'post',
                url: `${this.$baseUrl}/web/sampleCode/export`,
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
                    const fileName = '产品样编码.xlsx'
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
            this.$api.sampleCodeImport(formData).then(res => {
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
