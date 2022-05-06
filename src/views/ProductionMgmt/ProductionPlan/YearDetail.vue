<template>
    <div class="page-container">
        <div class="page-header flex-align-between">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产计划管理</el-breadcrumb-item>
                <el-breadcrumb-item>年生产计划</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button
                icon="el-icon-back"
                type="primary"
                @click="$router.push('/productionYear')"
                size="small"
                >返回</el-button
            >
        </div>
        <div class="page-body">
            <div class="flex">
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
                            <el-form-item label="计划年度:" prop="planYear">
                                <el-date-picker
                                    v-model="selectForm.planYear"
                                    type="year"
                                    placeholder="计划年度"
                                    value-format="yyyy"
                                    style="width: 100%"
                                    :disabled="viewStatus"
                                    @change="selectPlanYear"
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
                </el-form>
            </div>
            <div class="page-table">
                <div class="title-magrin">生产计划详情</div>
                <avue-crud
                    ref="crud"
                    :data="data"
                    :option="option"
                    @row-update="rowUpdate"
                    @row-save="rowSave"
                    @row-click="handleRowClick"
                    @row-del="rowDel"
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
                            filterable
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
            option: {
                addBtn: false,
                columnBtn: false,
                border: true,
                refreshBtn: false,
                addRowBtn: false,
                row: true,
                menuWidth: 150,
                saveBtnText: '确认',
                cellBtn: true,
                editBtn: false,
                saveBtn: true,
                align: 'center',
                headerAlign: 'center',
                column: [
                    {
                        label: '分厂名称',
                        prop: 'factoryName',
                        type: 'select',
                        minWidth: 150,
                        cell: true,
                        overHidden: true,
                        slot: true,
                        formslot: true,
                        rules: [
                            {
                                required: true,
                                message: '请选择分厂名称',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
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
                        label: '规格型号',
                        minWidth: 100,
                        prop: 'productSize',
                        disabled: true
                    },
                    {
                        label: '产能',
                        minWidth: 150,
                        prop: 'capacity',
                        cell: true
                    },
                    {
                        label: '计量单位',
                        prop: 'measureUnit',
                        disabled: true
                    },
                    {
                        label: '年目标',
                        minWidth: 150,
                        prop: 'yearPlanTarget',
                        cell: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入年目标',
                                trigger: ['blur', 'change']
                            }
                        ]
                    },
                    {
                        label: '月度分解',
                        children: [
                            {
                                label: '一月',
                                prop: 'january',
                                cell: true,
                                minWidth: 100
                            },
                            {
                                label: '二月',
                                prop: 'february',
                                cell: true,
                                minWidth: 100
                            },
                            {
                                label: '三月',
                                prop: 'march',
                                cell: true,
                                minWidth: 100
                            },
                            {
                                label: '四月',
                                prop: 'april',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '五月',
                                prop: 'may',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '六月',
                                prop: 'june',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '七月',
                                prop: 'july',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '八月',
                                prop: 'august',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '九月',
                                prop: 'september',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '十月',
                                prop: 'october',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '十一月',
                                prop: 'november',
                                minWidth: 100,
                                cell: true
                            },
                            {
                                label: '十二月',
                                prop: 'december',
                                minWidth: 100,
                                cell: true
                            }
                        ]
                    },
                    {
                        label: '裁决',
                        minWidth: 150,
                        prop: 'verdict',
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
                planYear: '', //计划时间（年）
                planName: '' //计划名称
            },
            rules: {
                planName: [
                    { required: true, message: '请输入计划名称', trigger: ['blur', 'change'] }
                ],
                planYear: [{ required: true, message: '请选择年度', trigger: ['blur', 'change'] }]
            },
            detailId: '',
            detailInfo: {},
            form: {},
            factoryCode: '',
            departmentCode: '',
            status: '',
            viewStatus: false
        }
    },
    created() {},
    mounted() {
        this.status = sessionStorage.getItem('detailStatus')
        if (this.status == 'add') {
            this.loading = false
            this.addRow()
        } else if (this.status == 'edit') {
            this.loading = true
            this.detailInfo = JSON.parse(sessionStorage.getItem('detailInfo'))
			console.log(this.detailInfo)
            this.detailId = this.detailInfo.id
            this.selectForm.planYear = this.detailInfo.planYear
            this.selectForm.planName = this.detailInfo.planName
            // this.getProduct()
            this.getFactory()
            this.getData()
        } else if (this.status == 'view') {
            this.viewStatus = true
            this.option.menu = false
            this.loading = true
            this.detailInfo = JSON.parse(sessionStorage.getItem('detailInfo'))
            this.detailId = this.detailInfo.id
            this.selectForm.planYear = this.detailInfo.planYear
            this.selectForm.planName = this.detailInfo.planName
            // this.getProduct()
            this.getFactory()
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
            this.$refs.crud.rowCellAdd({
                productName: ''
            })
        },
        getProduct() {
            this.productList = []
            let params = {
                factoryCode: this.factoryCode, //分厂代码
                departmentCode: this.departmentCode //车间代码
            }
            this.$api.productionYearData(params).then(res => {
                if (res.code == 'SUCCESS') {
                    this.productList = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /* getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        }, */
        getFactory() {
            this.$api.commonFactory({}).then(res => {
                this.factoryList = res.data
            })
        },
        getDepartment(nid) {
            this.$api
                .commonDepartment({
                    orgNid: nid
                })
                .then(res => {
                    // this.departmentsList = res.data
                    if (res.code == 'SUCCESS') {
                        this.departmentsList = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        selectProduct(val, row) {
            this.data[row.$index].productName = val.productName
            this.data[row.$index].productId = val.productId
            this.data[row.$index].measureUnit = val.measureUnit
            this.data[row.$index].productSize = val.productSize
        },
        selectFactory(val, row) {
            this.data[row.$index].factoryName = val.factoryName
            this.data[row.$index].factoryCode = val.factoryCode
            this.factoryCode = val.factoryCode
            this.getDepartment(val.nid)
            this.data[row.$index].departmentName = ''
            // this.getProduct()
        },
        selectDepartment(val, row) {
            this.data[row.$index].departmentName = val.departmentName
            this.data[row.$index].departmentCode = val.departmentCode
            this.departmentCode = val.departmentCode
            this.getProduct()
        },
        async getData() {
            /* this.data = [
                {
                    factoryCode: 'LY',
                    november: 10000,
                    departmentCode: 'LS',
                    productSize: '22-3-29',
                    remark: '测试数据',
                    april: 10000,
                    productName: '饲料级磷酸氢钙',
                    capacity: 120000,
                    september: 10000,
                    yearPlanTarget: 120000,
                    december: 10000,
                    departmentName: '磷酸车间',
                    productId: '01',
                    may: 10000,
                    august: 10000,
                    february: 10000,
                    factoryName: '磷化工',
                    july: 10000,
                    measureUnit: 'T',
                    march: 10000,
                    june: 10000,
                    january: 10000,
                    verdict: '',
                    october: 10000,
                    $cellEdit: false,
                    id: 0
                }
            ] */
            await this.$api
                .productionYearDetail({
                    id: this.detailId
                })
                .then(res => {
					console.log(res.data)
                    res.data.forEach((item, i) => {
                        item.$cellEdit = false
                        item.id = i
                    })
					this.data = res.data
                    // this.data = res.data
					console.log(this.data)
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
                row.$cellEdit = true
            }
        },
        rowCell(row, index) {
            // this.$refs.crud.rowCell(row, index)
            row.$cellEdit = false
        },
        rowSave(form, done) {
            form.id = this.genNonDuplicateID()
            // this.$message.success('新增数据' + JSON.stringify(form))
            done()
        },
        rowUpdate(form, index, done) {
            // this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
            done()
        },
        rowDel(form, index, done) {
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
                                yearPlan: this.selectForm,
                                yearPlanDetailList: dataList
                            }
                            this.$api.productionYearAdd(params).then(res => {
                                if (res.code == 'SUCCESS') {
                                    this.$message.success(res.message)
                                    this.$router.push('/productionYear')
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
                                    yearPlan: {
                                        id: this.detailId,
                                        planName: this.selectForm.planName,
                                        planYear: this.selectForm.planYear
                                    },
                                    yearPlanDetailList: dataList
                                }
                                this.$api.productionYearEdit(params).then(res => {
                                    if (res.code == 'SUCCESS') {
                                        this.$message.success(res.message)
                                        this.$router.push('/productionYear')
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
        selectPlanYear(val) {
            console.log(val)
            if (val != null || val != undefined) {
                this.selectForm.planName = `龙蟒大地${val}年度生产计划`
            } else {
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
</style>
