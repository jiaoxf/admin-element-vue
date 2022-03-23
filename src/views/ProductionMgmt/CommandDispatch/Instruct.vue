<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产指挥调度</el-breadcrumb-item>
                <el-breadcrumb-item>指令调度</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-table">
                <avue-crud
                    :permission="permission"
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
                    :before-open="openDialog"
                >
                    <template slot="menuLeft" slot-scope="{}">
                        <el-button type="primary" icon="el-icon-folder-remove">导出</el-button>
                    </template>
                    <template slot-scope="{ type }" slot="directiveTypeNameForm">
                        <avue-cascader
                            lazy
                            ref="demoCascader"
                            :disabled="type == 'view'"
                            :show-all-levels="false"
                            placeholder="请选择指令分类"
                            :lazy-load="lazyLoad"
                            :props="props"
                            v-model="form.directiveTypeName"
                            @change="changeDirectiveType($event, type)"
                        ></avue-cascader>
                    </template>
                    <template slot-scope="{ type }" slot="departmentNameForm">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择车间名称"
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
                    <template slot-scope="{ type }" slot="directiveContentForm">
                        <el-input
                            type="textarea"
                            :rows="4"
                            :disabled="type == 'view'"
                            placeholder="请输入内容"
                            v-model="form.directiveContent"
                        >
                        </el-input>
                    </template>
                    <template slot-scope="{ type }" slot="userIdsForm">
                        <el-select
                            v-model="form.userIds"
                            placeholder="请选择接收人"
                            value-key="userId"
                            :disabled="type == 'view'"
                            multiple
                            @change="selectUser"
                            clearable
                        >
                            <el-option
                                v-for="item in userList"
                                :key="item.userId"
                                :label="item.userName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="instructFileForm">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            :limit="1"
                            action=""
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            :auto-upload="false"
                            :on-change="upload"
                        >
                            <el-button slot="trigger" size="small" type="primary"
                                >选取文件</el-button
                            >
                        </el-upload>
                        {{ form.attchName }}
                        <el-button type="text" v-if="type != 'add' && form.attchName" @click="downLoad()"
                            >下载</el-button
                        >
                    </template>
                    <template slot-scope="{ row }" slot="menu">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            size="small"
                            v-if="$store.state.user.userInfo.userType == 'user_dispatch'"
                            @click="dispatchCheck(row)"
                            >查看接收人</el-button
                        >
                    </template>
                </avue-crud>
                <el-dialog title="查看接收人" :visible.sync="dialogTableVisible">
                    <el-table :data="gridData">
                        <el-table-column
                            property="userName"
                            label="接收用户名称"
                            width="200"
                        ></el-table-column>
                        <el-table-column
                            property="departmentName"
                            label="车间名称"
                            width="150"
                        ></el-table-column>
                        <el-table-column property="receiveStateText" label="状态"></el-table-column>
                        <el-table-column property="receiveDate" label="接收日期"></el-table-column>
                    </el-table>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        let _this = this
        return {
            loading: true,
            flag: false,
            dialogTableVisible: false,
            data: [],
            fileInfo: {},
            fileList: [],
            gridData: [],
            props: {
                label: 'label',
                value: 'id'
            },
            departmentNameForm: [],
            permission: {},
            option: {
                viewBtn: false,
                addBtn: true,
                size: 'mini',
                border: true,
                columnBtn: false,
                refreshBtn: false,
                // viewBtn: true,
                searchShowBtn: false,
                row: true,
                span: 24,
                searchMenuSpan: 6,
                dialogWidth: '60%',
                index: true,
                labelWidth: 150,
                indexLabel: '序号',
                searchslot: true,
                searchLabelWidth: 100,
                menuWidth: 300,
                // addBtn: false,
                column: [
                    {
                        label: '指令分类',
                        prop: 'directiveTypeName',
                        rules: [
                            {
                                required: true,
                                message: '请输入指令分类',
                                trigger: ['change', 'blur']
                            }
                        ],
                        search: true
                    },
                    {
                        label: '指令名称',
                        prop: 'directiveName',
                        rules: [
                            {
                                required: true,
                                message: '请输入指令名称',
                                trigger: ['change', 'blur']
                            }
                        ],
                        search: false,
                        overHidden: true
                    },
                    {
                        label: '指令内容',
                        prop: 'directiveContent',
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入指令内容',
                                trigger: ['change', 'blur']
                            }
                        ],
                        overHidden: true,
                        width: 250
                    },
                    {
                        label: '发布时间',
                        prop: 'issueDate',
                        search: true,
                        overHidden: true,
                        addDisplay: false
                    },
                    {
                        label: '发布人',
                        prop: 'issueUserName',
                        search: true,
                        addDisplay: false
                    },
                    {
                        label: '接收车间',
                        prop: 'departmentName',
                        hide: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择接收车间',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '接收人',
                        prop: 'userIds',
                        hide: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择接收人',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '指令附件',
                        prop: 'instructFile',
                        hide: true
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'productName',
            /* key1: 'productSize',
			key2: 'productId', */
            form: {},
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            list: [],
            OrgId: '',
            userList: []
        }
    },
    created() {
        this.getData()
        this.getDepartment()
    },
    mounted() {
        if (this.$store.state.user.userInfo.userType != 'user_dispatch') {
            this.permission = {
                addBtn: false,
                viewBtn: true
            }
        }
    },
    computed: {},
    watch: {},
    methods: {
        getDepartment() {
            this.$api
                .commonDepartment({
                    orgNid: this.$store.state.user.userInfo.orgNid
                })
                .then(res => {
                    this.departmentsList = res.data
                })
        },
        getUserList(id) {
            this.$api
                .getUserList({
                    orgNid: id
                })
                .then(res => {
                    this.userList = res.data
                })
        },
        selectDepartment(val) {
            console.log(val)
            this.OrgId = val.nid
            this.getUserList(this.OrgId)
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        selectUser(val) {
            /* console.log(val)
            console.log(this.form.userIds) */
        },
        upload(file, fileList) {
            console.log(file, fileList)
            console.log(file.raw)
            this.fileInfo = file.raw
        },
        uploadFile(params) {
            console.log(params.file)
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
        },
        handlePreview(file) {
            console.log(file)
        },
        getUser() {
            this.$api
                .getUser({
                    orgNid: '1000100010001'
                })
                .then(res => {
                    this.userList = res.data
                })
        },
        getData() {
            this.loading = true
            let userId = sessionStorage.getItem('login-userNid')
            this.$api
                .commandDispatchList({
                    id: userId,
                    directiveName: '',
                    directiveTypeName: '',
                    issueUserName: '',
                    beginDate: '',
                    endDate: '',
                    currPage: 1,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
                    this.loading = false
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.form.productId = ''
            this.form.productName = ''
            this.form.targetName = ''
            this.form.productSize = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            console.log(form, '新增的数据')
            console.log(form)
			console.log(this.form.directiveTypeId)
            //构建formData
            let formData = new FormData()
            //文件部分
            // var file = document.getElementById('file').files[0]
            formData.append('file', this.fileInfo)
            //json部分
            var jsonData = JSON.stringify({
                directiveInfo: {
                    directiveName: form.directiveName,
                    directiveTypeName: form.typeName,
                    directiveContent: form.directiveContent,
                    directiveTypeId: this.form.directiveTypeId
                },
                directiveReceiveList: form.userIds
            })
            //这里包装 可以直接转换成对象
            formData.append('vo', new Blob([jsonData], { type: 'application/json' }))

            console.log(formData)
            // 发送请求

            this.$api.commandDispatchAdd(formData).then(res => {
                if (res.code == 'SUCCESS') {
                    this.$message.success(res.message)
                    this.page1.currentPage = 1
                    done()
                    this.getData()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        handleUpdate(form, index, done, loading) {
            console.log(this.form.directiveTypeId)
			console.log(form.directiveTypeId)
            let formData = new FormData()
            //文件部分
            // var file = document.getElementById('file').files[0]
            formData.append('file', this.fileInfo)
            //json部分
            var jsonData = JSON.stringify({
                directiveInfo: {
                    id: form.id,
                    directiveName: form.directiveName,
                    directiveTypeName: form.typeName,
                    directiveContent: form.directiveContent,
                    directiveTypeId: form.directiveTypeId
                },
                directiveReceiveList: form.userIds
            })
            //这里包装 可以直接转换成对象
            formData.append('vo', new Blob([jsonData], { type: 'application/json' }))
            this.$api.commandDispatchEdit(formData).then(res => {
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
                    .commandDispatchDel({
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
        lazyLoad(node, resolve) {
            let stop_level = 1
            let level = node.level
            let data = node.data || {}
            let code = data.code
            let list = []
            let callback = () => {
                resolve(
                    (list || []).map(ele => {
                        return Object.assign(ele, {
                            leaf: level >= stop_level
                        })
                    })
                )
            }
            if (level == 0) {
                this.$api
                    .commonDepartment({
                        orgNid: this.$store.state.user.userInfo.orgNid
                    })
                    .then(res => {
                        res.data.map(item => {
                            let obj = {
                                id: item.departmentCode,
                                label: item.departmentName
                            }
                            list.push(obj)
                        })
                        // list = res.data.data
                        callback()
                    })
            }
            if (level == 1) {
                this.$api
                    .commandDirectiveType({
                        departmentCode: data.id
                    })
                    .then(res => {
                        res.map(item => {
                            let obj = {
                                id: item.id,
                                label: item.directiveType
                            }
                            list.push(obj)
                        })
                        console.log(this.form.directiveTypeName)
                        // list = res.data.data
                        callback()
                    })
            } else {
                callback()
            }
        },
        changeDirectiveType(val, type) {
            console.log(val, type)
            if (type == 'add') {
                let directiveId = val.split(',')[1]
                this.form.directiveTypeId = directiveId
                console.log(this.form.directiveTypeId)
            } else if (type == 'edit') {
				console.log(val)
                this.form.directiveTypeId = val[1]
            }
            this.form.directiveTypeName = val
            if (this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label) {
                this.form.typeName = this.$refs[
                    'demoCascader'
                ].$children[0].getCheckedNodes()[0].label
                console.log(this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label)
            }
        },
        openDialog(done, type) {
            console.log(this.form, '打开窗口的数据')
            if (type == 'edit') {
                // TODO 回显
                console.log(this.form.departmentCode)
                console.log(this.form.directiveTypeId)

                this.form.directiveTypeName = [this.form.departmentCode, this.form.directiveTypeId]
                // console.log(this.form.directiveTypeName)
				this.departmentsList.forEach(item => {
					this.getUserList(item.nid)
				})
                // this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label = '设备停车'
            } else if (type == 'view') {
                let params = {
                    directiveKey: this.form.directiveTypeId, //指令标识
                    userId: this.$store.state.user.userInfo.userNid //用户标识
                }
                this.$api.commandSaveStatus(params).then(res => {
                    if (res.code == 'SUCCESS') {
                        console.log(res)
                    }
                })
            }
            done()
        },
        downLoad(type) {
            console.log(this.form)
            let formData = new FormData()
            formData.append('id', this.form.directiveTypeId)
            this.$api.commandDownfile(formData).then(res => {
                if (res.code == 'SUCCESS') {
                    this.$message.success(res.message)
                    this.page1.currentPage = 1
                    this.getData()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        dispatchCheck(row) {
            console.log(row)
            this.dialogTableVisible = true
            let params = {
                id: row.id
            }
            this.$api.commandCheckUser(params).then(res => {
                if (res.code == 'SUCCESS') {
                    this.gridData = res.data
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
