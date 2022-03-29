<template>
    <div class="page-container">
        <div class="page-header flex-align-between">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
                <el-breadcrumb-item>月生产计划</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button
                icon="el-icon-back"
                @click="$router.push('/productionPlanMgmt/productionMonth')"
                size="small"
                type="primary"
                >返回</el-button
            >
        </div>
        <div class="page-body">
            <div>
                <el-button v-if="status == 'add'" type="primary" @click="addSubmit()" size="small"
                    >保存</el-button
                >
                <div v-else-if="status == 'edit'">
                    <el-button @click="submit('save')" size="small">暂存</el-button>
                    <el-button type="primary" @click="submit('submit')" size="small"
                        >提交</el-button
                    >
                </div>
            </div>
            <div class="title-magrin">基础信息</div>
            <div class="page-form">
                <el-form
                    :model="selectForm"
                    :rules="rules"
                    ref="selectForm"
                    class="demo-form-inline"
                    label-width="100px"
                >
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="分厂名称:" prop="factoryName">
                                <el-select
                                    v-model="selectForm.factoryName"
                                    placeholder="请选择 分厂名称"
                                    value-key="factoryCode"
                                    @change="selectFactory($event, row)"
                                    :disabled="viewStatus"
                                >
                                    <el-option
                                        v-for="item in factoryList"
                                        :key="item.factoryCode"
                                        :label="item.factoryName"
                                        :value="item"
                                        :disabled="viewStatus"
                                        clearable
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="计划年月:" prop="planMonth">
                                <el-date-picker
                                    v-model="selectForm.planMonth"
                                    type="month"
                                    placeholder="计划年月"
                                    value-format="yyyy-MM"
                                    style="width: 100%"
                                    :disabled="viewStatus"
									@change="selectPlanMonth"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="计划名称:" prop="planName">
                                <el-input
                                    v-model="selectForm.planName"
                                    placeholder="请输入计划名称"
                                    :disabled="viewStatus"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="拟制人:">
                                <el-input
                                    v-model="selectForm.fictionUser"
                                    placeholder="请输入拟制人"
                                    :disabled="viewStatus"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="审核人:">
                                <el-input
                                    v-model="selectForm.auditUser"
                                    placeholder="请输入审核人"
                                    :disabled="viewStatus"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="审批人:">
                                <el-input
                                    v-model="selectForm.approvalUser"
                                    placeholder="请输入审核人"
                                    :disabled="viewStatus"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="page-table">
                <div class="title-magrin">生产计划详情</div>
                <avue-crud
                    ref="crud"
                    :data="data"
                    v-model="data"
                    :option="option"
                    @row-update="rowUpdate"
                    @row-save="rowSave"
                    @row-del="rowDel"
                    @row-click="handleRowClick"
                    :table-loading="loading"
                >
                    <template slot="factoryNameForm" slot-scope="{ row, disabled }">
                        <el-select
                            v-model="row.factoryName"
                            placeholder="请选择 分厂名称"
                            value-key="factoryCode"
                            @change="selectFactory($event, row)"
                            :disabled="disabled"
                        >
                            <el-option
                                v-for="item in factoryList"
                                :key="item.factoryCode"
                                :label="item.factoryName"
                                :value="item"
                                :disabled="disabled"
                                clearable
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot="productNameForm" slot-scope="{ row, disabled }">
                        <el-select
                            v-model="row.productName"
                            placeholder="请选择产品名称"
                            value-key="productId"
                            @change="selectProduct($event, row)"
                            :disabled="disabled"
                            clearable
                        >
                            <el-option
                                v-for="item in productList"
                                :key="item.productId"
                                :label="item.productName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot="departmentNameForm" slot-scope="{ row, disabled }">
                        <el-select
                            v-model="row.departmentName"
                            placeholder="请选择 车间名称"
                            value-key="departmentCode"
                            @change="selectDepartment($event, row)"
                            :disabled="disabled"
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
                    <template slot="taskTypeForm" slot-scope="{ row, disabled }">
                        <el-select
                            v-model="row.taskType"
                            placeholder="请选择 生产任务类型"
                            value-key="dictId"
                            @change="selectTaskType($event, row)"
                            :disabled="disabled"
                            clearable
                        >
                            <el-option
                                v-for="item in taskTypeList"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot="menuLeft" v-if="!viewStatus">
                        <el-button type="text" @click="addRow()" icon="el-icon-plus" size="small"
                            >增行</el-button
                        >
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
            loading: false,
            data: [],
            productList: [],
            factoryList: [],
            departmentsList: [],
            taskTypeList: [],
            option: {
                addBtn: false,
                columnBtn: false,
                border: true,
                refreshBtn: false,
                addRowBtn: false,
                row: true,
                saveBtnText: '确认',
                menuWidth: 150,
                cellBtn: true,
                editBtn: false,
                saveBtn: true,
                align: 'center',
                headerAlign: 'center',
                column: [
                    {
                        label: '车间名称',
                        minWidth: 150,
                        prop: 'departmentName',
                        type: 'select',
                        slot: true,
                        formslot: true,
                        overHidden: true,
                        cell: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择车间名称',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '产品名称',
                        minWidth: 150,
                        prop: 'productName',
                        type: 'select',
                        slot: true,
                        formslot: true,
                        overHidden: true,
                        cell: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择产品名称',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '工序',
                        minWidth: 100,
                        prop: 'process',
                        cell: true
                    },
                    {
                        label: '计量单位',
                        minWidth: 100,
                        prop: 'measureUnit',
                        disabled: true
                    },
                    {
                        label: '产品规格',
                        minWidth: 100,
                        prop: 'productSize',
                        disabled: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品规格',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },

                    {
                        label: '包装规格',
                        minWidth: 200,
                        prop: 'packingSize',
                        disabled: true
                    },
                    {
                        label: '质量指标',
                        minWidth: 200,
                        prop: 'qualityIndex',
                        disabled: true,
                        overHidden: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入质量指标',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '生产任务类型',
                        minWidth: 150,
                        prop: 'taskType',
                        disabled: false,
                        cell: true
                    },
                    {
                        label: '月生产计划目标',
                        minWidth: 150,
                        prop: 'monthPlanTarget',
                        disabled: false,
                        cell: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入月生产计划目标',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '月力争目标',
                        minWidth: 100,
                        prop: 'monthStriveTarget',
                        cell: true
                    },
                    {
                        label: '备注',
                        minWidth: 150,
                        prop: 'remark',
                        cell: true
                    }
                ]
            },
            selectForm: {
                planMonth: '', //计划时间（年）
                planName: '', //计划名称
                factoryName: '',
                factoryCode: '',
                fictionUser: '',
                auditUser: '',
                approvalUser: ''
            },
            rules: {
                planName: [
                    { required: true, message: '请输入计划名称', trigger: ['blur', 'change'] }
                ],
                planMonth: [{ required: true, message: '请选择年度', trigger: ['blur', 'change'] }],
                factoryName: [
                    { required: true, message: '请选择分厂名称', trigger: ['blur', 'change'] }
                ]
            },
            detailId: '',
            monthInfo: {},
            form: {},
            factoryCode: '',
            departmentCode: '',
            status: '',
            viewStatus: false
        }
    },
    created() {},
    mounted() {
        this.status = sessionStorage.getItem('monthStatus')
        if (this.status == 'add') {
            this.loading = false
            this.getTaskData()
            this.getFactory()
            this.addRow()
        } else if (this.status == 'edit') {
            this.loading = true
            this.monthInfo = JSON.parse(sessionStorage.getItem('monthInfo'))
            this.detailId = this.monthInfo.id
            this.selectForm.planMonth = this.monthInfo.planMonth
            this.selectForm.planName = this.monthInfo.planName
            this.selectForm.factoryName = this.monthInfo.factoryName
            this.selectForm.factoryCode = this.monthInfo.factoryCode
            this.selectForm.fictionUser = this.monthInfo.fictionUser
            this.selectForm.auditUser = this.monthInfo.auditUser
            this.selectForm.approvalUser = this.monthInfo.approvalUser
            this.getTaskData()
            this.getFactory()
            this.getDepartment()
            this.getData()
            this.$refs.crud.rowCellAdd({
                id: this.genNonDuplicateID()
            })
        } else if (this.status == 'view') {
            this.viewStatus = true
            this.option.menu = false
            this.loading = true
            this.monthInfo = JSON.parse(sessionStorage.getItem('monthInfo'))
            this.detailId = this.monthInfo.id
            this.selectForm.planMonth = this.monthInfo.planMonth
            this.selectForm.planName = this.monthInfo.planName
            this.selectForm.factoryName = this.monthInfo.factoryName
            this.selectForm.factoryCode = this.monthInfo.factoryCode
            this.selectForm.fictionUser = this.monthInfo.fictionUser
            this.selectForm.auditUser = this.monthInfo.auditUser
            this.selectForm.approvalUser = this.monthInfo.approvalUser
            this.getFactory()
            this.getTaskData()
            this.getDepartment()
            this.getData()
        }
    },
    computed: {},
    watch: {
        'data.length': function(n, o) {
            // this.rowRow()
            console.log(n)
            if (n == 0) {
                this.addRow()
            }
        }
    },
    methods: {
        genNonDuplicateID() {
            let idStr = Date.now().toString(36)
            idStr += Math.random()
                .toString(36)
                .substr(3)
            return idStr
        },
        addRow() {
            this.getFactory()
            this.getDepartment()
            this.$refs.crud.rowCellAdd({
                // id: this.genNonDuplicateID()
            })
        },
        getProduct() {
            this.productList = []
            let params = {
                factoryCode: this.factoryCode, //分厂代码
                departmentCode: this.departmentCode //车间代码
            }
            this.$api.monthPlanData(params).then(res => {
                if (res.code == 'SUCCESS') {
                    this.productList = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        getTaskData() {
            this.$api
                .getTaskData({
                    entityCode: 'MONTH_PLAN_DETAIL', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'TASK_TYPE' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.taskTypeList = res.data
                })
        },
        getFactory() {
            this.$api.commonFactory({}).then(res => {
                this.factoryList = res.data
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
        selectProduct(val, row) {
            this.data[row.$index].productName = val.productName
            this.data[row.$index].productId = val.productId
            this.data[row.$index].qualityIndex = val.productIndex
            this.data[row.$index].productSize = val.productSize
            this.data[row.$index].packingSize = val.packingSize
			this.data[row.$index].measureUnit = val.measureUnit
        },
        selectFactory(val, row) {
            this.selectForm.factoryName = val.factoryName
            this.selectForm.factoryCode = val.factoryCode
            this.factoryCode = val.factoryCode
        },
        selectDepartment(val, row) {
            this.data[row.$index].productName = ''
            this.data[row.$index].productId = ''
            this.data[row.$index].qualityIndex = ''
            this.data[row.$index].productSize = ''
            this.data[row.$index].packingSize = ''
			this.data[row.$index].measureUnit = ''
            this.data[row.$index].departmentName = val.departmentName
            this.data[row.$index].departmentCode = val.departmentCode
            this.departmentCode = val.departmentCode
            this.productList = []
            console.log(this.data[row.$index])
            this.getProduct()
        },
        selectTaskType(val, row) {
            this.data[row.$index].taskType = val.dictName
        },
        async getData() {
            await this.$api
                .monthPlanDetail({
                    id: this.detailId
                })
                .then(res => {
                    res.data.forEach((item, i) => {
                        item.$cellEdit = false
                        item.id = i
                    })
                    this.data = res.data

                    this.loading = false
                })
            /* if (this.status == 'edit') {
                this.addRow()
            } */
        },
        handleRowClick(row, event, column) {
            if (this.status == 'view') {
                row.$cellEdit = false
            } else {
                this.getFactory()
                this.getDepartment()
                row.$cellEdit = true
            }
        },
        rowSave(form, done) {
            console.log(form)
            form.id = this.genNonDuplicateID()
            // this.$message.success('新增数据' + JSON.stringify(form))
            done()
        },
        rowUpdate(form, index, done) {
            console.log(form)
            // this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
            done()
        },
        rowCell(row, index) {
            // this.$refs.crud.rowCell(row, index)
            row.$cellEdit = false
        },
        rowDel(form, index, done) {
            console.log('删除是')
            done()
        },
        addSubmit() {
            let flag = true
            this.data.forEach(item => {
                console.log(item.$cellEdit)
                if (item.$cellEdit == true) {
                    flag = false
                    this.$message.error('请确认列表项数据')
                    return false
                }
            })
            if (flag) {
                this.$refs['selectForm'].validate(valid => {
                    if (valid) {
                        if (this.data.length == 0) {
                            this.$message.error('至少添加一条数据')
                            return
                        } else {
                            let dataList = this.data
                            dataList.map(val => {
                                delete val.id
                            })
                            let params = {
                                monthPlan: this.selectForm,
                                monthPlanDetailList: dataList
                            }
                            this.$api.monthPlanAdd(params).then(res => {
                                if (res.code == 'SUCCESS') {
                                    this.$message.success(res.message)
                                    this.$router.push('/productionMonth')
                                } else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        submit(type) {
            console.log(type)
            let flag = true
            this.data.forEach(item => {
                console.log(item.$cellEdit)
                if (item.$cellEdit == true) {
                    flag = false
                    this.$message.error('请确认列表项数据')
                    return false
                }
            })
            if (flag) {
                let tipText = ''
                if (type == 'save') {
                    tipText = '执行暂存将覆盖当前版本数据，是否继续？'
                } else if (type == 'submit') {
                    tipText = '执行提交将新增新版本数据，原版本转为历史数据，是否继续？'
                }
                this.$refs['selectForm'].validate(valid => {
                    if (valid) {
                        if (this.data.length == 0) {
                            this.$message.error('至少添加一条数据')
                            return
                        } else {
                            this.$confirm(tipText, '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let dataList = this.data
                                dataList.map(val => {
                                    delete val.id
                                })
                                let params = {
                                    state: type,
                                    monthPlan: {
                                        id: this.detailId,
                                        planName: this.selectForm.planName,
                                        planMonth: this.selectForm.planMonth,
                                        fictionUser: this.selectForm.fictionUser,
                                        auditUser: this.selectForm.auditUser,
                                        approvalUser: this.selectForm.approvalUser,
                                        factoryName: this.selectForm.factoryName,
                                        factoryCode: this.selectForm.factoryCode
                                    },
                                    monthPlanDetailList: dataList
                                }
                                this.$api.monthPlanEdit(params).then(res => {
                                    if (res.code == 'SUCCESS') {
                                        this.$message.success(res.message)
                                        this.$router.push('/productionMonth')
                                    } else {
                                        this.$message.error(res.message)
                                    }
                                })
                            })
                        }
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
		selectPlanMonth(val){
			console.log(val)
			if(val != null || val != undefined) {
				this.selectForm.planName = `${val}月生产计划`
			}else{
				this.selectForm.planName = ''
			}

		}
    },
    activated() {}
}
</script>
<style lang='scss' scoped>
/* @import ''; // 引入公共css类*/
.title-magrin {
    margin: 20px 0;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    font-size: 16px;
}
/deep/ .el-select {
    width: 100%;
}
</style>
