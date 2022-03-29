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
                    :defaults.sync="defaults"
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
                    <template slot-scope="{ type }" slot="directiveTypeNameForm">
                        <avue-cascader
                            v-if="type == 'edit' || type == 'add'"
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
                        <div v-else style="color: #606266; font-size: 12px">
                            {{ form.directiveTypeName }}
                        </div>
                    </template>
                    <!-- <template slot-scope="{ type }" slot="departmentNameForm">
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
                    </template> -->
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
                    <template slot-scope="{ type }" slot="userListIdsForm">
                        <!-- <el-select
                            v-model="form.userListIds"
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
                        </el-select> -->
                        <el-cascader
                            :disabled="type == 'view'"
                            :options="allUserIds"
                            :props="propsPerson"
                            v-model="form.userListIds"
                            :show-all-levels="true"
                            @change="changeDirectiveuserListIds($event, type)"
                            clearable
                        ></el-cascader>
                        <!-- <el-cascader
                            :disabled="type == 'view'"
                            :props="propsPerson"
                            v-model="form.userListIds"
                            :show-all-levels="false"
                            @change="changeDirectiveuserListIds($event, type)"
                            clearable
                        ></el-cascader> -->
                        <!-- <avue-cascader
                            lazy
                            multiple
                            ref="demoCascader1"
                            :disabled="type == 'view'"
                            :show-all-levels="true"
                            placeholder="请选择接收人"
                            :lazy-load="lazyLoadPeople"
                            :props="props"
                            v-model="form.userListIds"
                            @change="changeDirectiveuserListIds($event, type)"
                        ></avue-cascader> -->
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
                            v-if="type != 'view'"
                        >
                            <el-button slot="trigger" size="small" type="primary"
                                >选取文件</el-button
                            >
                        </el-upload>
                        {{ form.attchName }}
                        <el-button
                            type="text"
                            v-if="type != 'add' && type != 'edit' && form.attchName"
                            @click="downLoad()"
                            >下载</el-button
                        >
                        <el-button
                            type="text"
                            v-if="type == 'edit' && form.attchName"
                            @click="delFile()"
                            >删除</el-button
                        >
                    </template>
                    <template slot-scope="{ row }" slot="menu">
                        <el-button
                            type="text"
                            icon="el-icon-view"
                            size="small"
                            v-if="myViewBtn"
                            @click="dispatchCheck(row)"
                            >查看</el-button
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
            defaults: {},
            loading: true,
            flag: false,
            dialogTableVisible: false,
            data: [],
            fileInfo: {},
            fileList: [],
            gridData: [],
            userListIds: [],
            props: {
                label: 'label',
                value: 'id'
            },
            propsPerson: {
                multiple: true,
                label: 'label',
                value: 'id'
                // lazy: true,
                // lazyLoad: this.lazyLoadPerson
            },
            departmentNameForm: [],
            permission: {},
            option: {
                addBtn: false,
                editBtn: false,
                viewBtn: false,
                viewBtnText: '接收',
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
                                message: '请选择指令分类',
                                trigger: 'blur'
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
                    /* {
                        label: '接收车间',
                        prop: 'departmentName',
                        hide: false
                    }, */
                    {
                        label: '接收人',
                        prop: 'userListIds',
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
            form: {
                userListIds: []
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            list: [],
            OrgId: '',
            userList: [],
            allUserIds: [],
            myViewBtn: false
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        this.setOperate()
        this.getDepartment()
        this.getAllUsers()
    },
    computed: {},
    watch: {
        /* 'form.userListIds': function(n, o) {
            console.log(n)
        } */
    },
    methods: {
        getAllUsers() {
            let obj = {}
            let list = []
            let a
            let _this = this
            this.$api
                .commonDepartment({
                    orgNid: this.$store.state.user.userInfo.orgNid
                })
                .then(res => {
                    res.data.map(item => {
                        obj = {
                            id: item.nid,
                            label: item.departmentName,
                            children: [
                                /* {
                                    id: '6631604e-e30e-4aab-acc4-768dcce46a7d',
                                    label: '磷酸车间用户1',
                                    departmentId: '1000100010001',
                                    departmentName: '磷酸车间'
                                },
                                {
                                    id: 'cf18ec52-8312-4857-87d0-e794db04fdf9',
                                    label: '磷酸车间用户2',
                                    departmentId: '1000100010001',
                                    departmentName: '磷酸车间'
                                } */
                            ]
                        }
                        list.push(obj)
                    })
                    list.forEach((item, i) => {
                        // console.log(this.getAlluserList(item.id))
                        let list2 = []
                        this.$api
                            .getUserList({
                                orgNid: item.id
                            })
                            .then(res => {
                                res.data.map((item, i) => {
                                    let obj = {
                                        id: item.userId,
                                        label: item.userName,
                                        departmentId: item.departmentId,
                                        departmentName: item.departmentName
                                    }
                                    list2.push(obj)
                                })
                            })
                        list[i].children = list2
                    })
                    console.log(list, 'list11')
                    this.allUserIds = list
                })
        },
        getAlluserList(id) {
            let list = []
            this.$api
                .getUserList({
                    orgNid: id
                })
                .then(res => {
                    res.data.map((item, i) => {
                        let obj = {
                            id: item.userId,
                            label: item.userName,
                            departmentId: item.departmentId,
                            departmentName: item.departmentName
                        }
                        list.push(obj)
                    })
                    console.log(list)
                    return list
                })
        },
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
                btnList.indexOf('receive') > -1
                    ? (this.option.viewBtn = true)
                    : (this.option.viewBtn = false) // 接收按钮
                btnList.indexOf('import') > -1
                    ? (this.myImportBtn = true)
                    : (this.myImportBtn = false) // 导出
                btnList.indexOf('export') > -1
                    ? (this.myExportBtn = true)
                    : (this.myExportBtn = false) // 导入
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
        lazyLoadPerson(node, resolve) {
            let { level } = node
            let stop_level = 1
            let data = node.data || {}
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
                                id: item.nid,
                                label: item.departmentName
                            }
                            list.push(obj)
                        })
                        // list = res.data.data
                        callback()
                    })
            } else if (level == 1) {
                this.$api
                    .getUserList({
                        orgNid: data.id
                    })
                    .then(res => {
                        console.log(res, '人员数据')
                        res.data.map(item => {
                            let obj = {
                                id: item.userId,
                                label: item.userName,
                                departmentId: item.departmentId,
                                departmentName: item.departmentName
                            }
                            list.push(obj)
                        })
                        // list = res.data.data
                        callback()
                    })
            } else {
                callback()
            }
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
            console.log(this.form.userListIds) */
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
            console.log(form.userListIds, '欢聚时代技术的话')
            let userList = []
            form.userListIds.forEach((item, i) => {
                userList[i] = {
                    departmentId: item[0],
                    userId: item[1]
                }
            })
            // console.log(userList, '选中的')
            // console.log(form, '新增的数据')
            // console.log(this.form.directiveTypeId)
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
                directiveReceiveList: userList
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
            console.log(this.form.userListIds, 'userListIdsuserListIdsuserListIds')
            console.log(form.directiveTypeId)
            let userList = []
            this.form.userListIds.forEach((item, i) => {
                userList.push({
                    departmentId: item[0],
                    userId: item[1]
                })
            })
            let formData = new FormData()
            //文件部分
            // var file = document.getElementById('file').files[0]
            formData.append('file', this.fileInfo)
            //json部分
            var jsonData = JSON.stringify({
                directiveInfo: {
                    id: form.id,
                    directiveName: form.directiveName,
                    directiveTypeName: this.form.typeName,
                    directiveContent: form.directiveContent,
                    directiveTypeId: form.directiveTypeId,
                    attchAddress: form.attchAddress
                },
                directiveReceiveList: userList
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
        lazyLoadPeople(node, resolve) {
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
                                id: item.nid,
                                label: item.departmentName
                            }
                            list.push(obj)
                        })
                        // list = res.data.data
                        callback()
                    })
            } else if (level == 1) {
                this.$api
                    .getUserList({
                        orgNid: data.id
                    })
                    .then(res => {
                        console.log(res, '人员数据')
                        res.data.map(item => {
                            let obj = {
                                id: item.userId,
                                label: item.userName,
                                departmentId: item.departmentId,
                                departmentName: item.departmentName
                            }
                            list.push(obj)
                        })
                        // list = res.data.data
                        callback()
                    })
            } else {
                callback()
            }
        },
        changeDirectiveType(val, type) {
            // console.log(val, type)
            if (type == 'add') {
                let directiveId = val.split(',')[1]
                this.form.directiveTypeId = directiveId
                this.$nextTick(() => {
                    this.form.typeName = this.$refs['demoCascader'].$children[0]._data.presentText
                })
                // console.log(this.form.directiveTypeId)
            } else if (type == 'edit') {
                // console.log(val)
                this.form.directiveTypeId = val[1]
                this.$nextTick(() => {
                    this.form.typeName = this.$refs['demoCascader'].$children[0]._data.presentText
                })
                this.form.typeName = this.$refs['demoCascader'].$children[0]._data.inputValue
            }
            this.form.directiveTypeName = val
            // console.log(this.$refs["demoCascader"].getCheckedNodes()[0].pathLabels)
            // console.log(this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label)
            /* if (this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label) {
                this.form.typeName = this.$refs[
                    'demoCascader'
                ].$children[0].getCheckedNodes()[0].label
                console.log(this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label)
            } */
        },
        changeDirectiveuserListIds(val, type) {
            console.log(val)
        },
        openDialog(done, type) {
            console.log(this.form, '打开窗口的数据')
            if (type == 'edit') {
                console.log(this.form.userListIds, '好的好的哈')
                this.form.userListIds = []
                // TODO
                this.form.userIds.forEach((item, i) => {
                    console.log(item, i, '啛啛喳喳')
                    this.form.userListIds.push([item.departmentId, item.userId])
                })

                // this.form.userListIds = [['1000100010001', '6631604e-e30e-4aab-acc4-768dcce46a7d']]
                /* this.$nextTick(() => {
                    ;(this.form.userListIds = '1000100010001'),
                        '6631604e-e30e-4aab-acc4-768dcce46a7d'
                })
                setTimeout(() => {
                    this.form.userListIds = [
                        ['1000100010001', '6631604e-e30e-4aab-acc4-768dcce46a7d']
                    ]
                }, 2000) */
                /*  this.form.userListIds = [
                    ['1000100010001', '6631604e-e30e-4aab-acc4-768dcce46a7d'],
                    ['1000100010002']
                ] */
                this.form.directiveTypeName = [this.form.departmentCode, this.form.directiveTypeId]
                // TODO
                this.departmentsList.forEach(item => {
                    this.getUserList(item.nid)
                })
                setTimeout(() => {
                    this.form.typeName = this.$refs['demoCascader'].$children[0]._data.inputValue
                    // console.log(this.$refs['demoCascader'].$children[0]._data.inputValue)
                }, 2000)
                // this.$refs['demoCascader'].$children[0].getCheckedNodes()[0].label = '设备停车'
                console.log(this.form.userIds, '测试')
                /* let newuserListIds = []
                this.form.userListIds.forEach((item, i) => {
                    newuserListIds[i] = [item.departmentId, item.userId]
                })
                this.$nextTick(() => {
                    this.form.userListIds = newuserListIds
					console.log(this.form.userListIds, '1111')
                }) */
                /* this.form.userListIds = [
                    ['1000100010001', '6631604e-e30e-4aab-acc4-768dcce46a7d'],
                    ['1000100010001', 'cf18ec52-8312-4857-87d0-e794db04fdf9']
                ] */
                /* this.$nextTick(() => {
                    this.form.userListIds = [
                        ['1000100010001', '6631604e-e30e-4aab-acc4-768dcce46a7d'],
                        ['1000100010001', 'cf18ec52-8312-4857-87d0-e794db04fdf9']
                    ]
                }) */
            } else if (type == 'view') {
                this.option.column[5].display = false
                let params = {
                    directiveKey: this.form.id, //指令标识
                    userId: this.$store.state.user.userInfo.userNid //用户标识
                }
                this.$api.commandSaveStatus(params).then(res => {
                    if (res.code == 'SUCCESS') {
                        console.log(res)
                        this.$message.success(res.message)
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
            done()
        },
        // TODO 下载文件流
        downLoad(type) {
            console.log(this.form.attchName)
            window.open(this.form.attchAddress, '_self')
            /* let formData = new FormData()
            formData.append('fileName', this.form.attchName)
            this.$api.commandDownfile(formData, { responseType: 'blob' }).then(res => {
                let url = window.URL.createObjectURL(new Blob([res]))
                let a = document.createElement('a')
                a.style.display = 'none'
                a.href = url
                a.setAttribute('download', 'excel.xls')
                document.body.appendChild(a)
                a.click() //执行下载
                window.URL.revokeObjectURL(a.href)
                document.body.removeChild(a)
            }) */
        },
        delFile() {
            console.log(this.form)
            console.log(1)
            this.form.attchName = ''
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
