<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>原料盘存</el-breadcrumb-item>
                <el-breadcrumb-item>调整数据</el-breadcrumb-item>
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
                    <template slot-scope="{}" slot="departmentNameSearch">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择车间名称"
                            value-key="departmentCode"
                            @change="selectDepartment"
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
                    <template slot-scope="" slot="productionDateSearch">
                        <!-- <el-date-picker
                            v-model="form"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker> -->
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
                    <template slot-scope="{ type }" slot="productionDateForm">
                        <el-date-picker
                            v-model="form.productionDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="productNameForm">
                        <el-select
                            v-model="form.productName"
                            placeholder="请选择产品名称"
                            value-key="productId"
                            @change="selectProduct"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in productList"
                                :key="item.productCode"
                                :label="item.productName"
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
            departmentList: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                searchLabelWidth: 90,
                row: true,
                menu: false,
                menuWidth: 300,
                span: 12,
                searchShowBtn: false,
                searchMenuSpan: 6,
                dialogWidth: '80%',
                menuSpan: 4,
                searchSpan: 8,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '月份',
                        prop: 'productionDate',
                        search: false,
                        width: 120,
                        rules: [
                            {
                                required: true,
                                message: '请选择生产日期',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '物料名称',
                        prop: 'departmentName',
                        disabled: true,
                        search: false,
                        width: 120,
                        rules: [
                            {
                                required: true,
                                message: '请输入生产车间',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '库存量（t）',
                        prop: 'productName',
                        width: 120,
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '上月库存量（t）',
                        prop: 'productName',
                        width: 120,
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '本月库存量（t）',
                        prop: 'workingShift',
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入班次',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },

                    {
                        label: '中建物料量（t）',
                        prop: 'productBatch',
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入生产批次',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '生产批次号',
                        prop: 'productBatchNum',
                        search: false,
                        addDisplay: false,
                        editDisplay: false,
                        width: 200
                    },
                    {
                        label: '产量',
                        prop: 'yield',
                        rules: [
                            {
                                required: true,
                                message: '请输入产量',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '产量',
                        prop: 'yield',
                        rules: [
                            {
                                required: true,
                                message: '请输入产量',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '产量',
                        prop: 'yield',
                        rules: [
                            {
                                required: true,
                                message: '请输入产量',
                                trigger: ['change', 'blur']
                            }
                        ]
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                productName: '', //产品名称
                departmentCode: '', //车间代码
                workingShift: '', //生产班次
                productBatch: '', //生产批次
                batchNumber: '', //批次号
                beginDate: '', //生产日期起
                endDate: '', //生产日期止
                time: []
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            // 分厂option
            factoryList: [],
            departmentsList: [],
            productList: [],
            indexStr: '',
            productIndexList: [],
            searchInfo: {}
        }
    },
    created() {
        // this.getData()
        this.getDepartment()
        this.getProduct()
        this.getData()
    },
    mounted() {},
    computed: {
        qualityInfo() {
            const { productName, productionDate, workingShift, productBatch } = this.form
            return { productName, productionDate, workingShift, productBatch }
        }
    },
    watch: {
        qualityInfo: {
            handler: function(newval, oldval) {
                this.form.productName = newval.productName
                this.form.productionDate = newval.productionDate
                this.form.workingShift = newval.workingShift
                this.form.productBatch = newval.productBatch
                console.log(this.form.productName)
                console.log(this.form.productionDate)
                console.log(this.form.workingShift)
                console.log(this.form.productBatch)
                if (
                    this.form.productName != '' &&
                    this.form.productName != undefined &&
                    this.form.productionDate != '' &&
                    this.form.productionDate != undefined &&
                    this.form.workingShift != '' &&
                    this.form.workingShift != undefined &&
                    this.form.productBatch != '' &&
                    this.form.productBatch != undefined
                ) {
                    this.getQualityInfo()
                }
            },
            deep: true
        }
    },
    methods: {
        getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        },
        getQualityInfo() {
            let params = {
                productName: this.form.productName, //产品名称
                productionDate: this.form.productionDate, //生产日期
                workingShift: this.form.workingShift, //生产班次
                productBatch: this.form.productBatch //生产批次
            }
            this.$api.statisticsYieldDecision(params).then(res => {
                console.log(res)
                if (res.code == 'SUCCESS') {
                    this.form.qualityInfo = res.data
                } else {
                    // this.$message.error(res.message)
                    this.$alert(res.message, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            console.log(action)
                        }
                    })
                }
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
        selectProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
            this.getProductInfo(this.form.productId)
        },
        selectFactory(val) {
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
        },
        selectDepartment(val) {
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        getProductInfo(val) {
            this.$api
                .productInfo({
                    productId: val
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        console.log(res.data)
                        let data = res.data
                        this.form.departmentName = data.departmentName
                        this.form.productType = data.productType
                        this.form.measureUnit = data.measureUnit
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        getDecision() {
            this.$api
                .statisticsYieldList({
                    productName: this.searchInfo.productName, //产品名称
                    departmentCode: this.form.departmentCode, //车间代码
                    workingShift: this.searchInfo.workingShift, //生产班次
                    productBatch: this.searchInfo.productBatch, //生产批次
                    batchNumber: this.searchInfo.batchNumber, //批次号
                    beginDate: this.form.time ? this.form.time[0] : '', //生产日期起
                    endDate: this.form.time ? this.form.time[1] : '', //生产日期止
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
                    this.page1.total = res.total
                })
        },
        getData() {
            this.loading = true
            this.$api
                .statisticsYieldList({
                    productName: this.searchInfo.productName, //产品名称
                    departmentCode: this.form.departmentCode, //车间代码
                    workingShift: this.searchInfo.workingShift, //生产班次
                    productBatch: this.searchInfo.productBatch, //生产批次
                    batchNumber: this.searchInfo.batchNumber, //批次号
                    beginDate: this.form.time ? this.form.time[0] : '', //生产日期起
                    endDate: this.form.time ? this.form.time[1] : '', //生产日期止
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.loading = false
                    this.data = res.rows
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.searchInfo.productName = ''
            this.searchInfo.productBatch = ''
            this.searchInfo.workingShift = ''
            this.searchInfo.batchNumber = ''
            this.form.productName = '' //产品名称
            this.form.departmentCode = '' //车间代码
            this.form.workingShift = '' //生产班次
            this.form.productBatch = '' //生产批次
            this.form.batchNumber = '' //批次号
            this.form.beginDate = '' //生产日期起
            this.form.endDate = '' //生产日期止
            this.form.time = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
        },
        handleView(row, index) {
            console.log(row, index)
        },
        handleSave(form, done, loading) {
            let params = {
                productionDate: form.productionDate, //生产日期
                productName: form.productName, //产品名称
                productId: form.productId, //产品编号
                departmentName: form.departmentName, //车间名称
                departmentCode: form.departmentCode, //车间代码
                workingShift: form.workingShift, //生产班次
                productBatch: form.productBatch, //生产批次
                productType: form.productType, //产品类型
                yield: form.yield, //产量
                measureUnit: form.measureUnit, //单位
                qualityInfo: form.qualityInfo //质量检验结果
            }
            this.$api.statisticsYieldAdd(params).then(res => {
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
            console.log(form)
            let params = {
                productionDate: form.productionDate, //生产日期
                productName: form.productName, //产品名称
                productId: form.productId, //产品编号
                departmentName: form.departmentName, //车间名称
                departmentCode: form.departmentCode, //车间代码
                workingShift: form.workingShift, //生产班次
                productBatch: form.productBatch, //生产批次
                productType: form.productType, //产品类型
                yield: form.yield, //产量
                measureUnit: form.measureUnit, //单位
                qualityInfo: form.qualityInfo //质量检验结果
            }
            this.$api
                .statisticsYieldEdit({
                    id: form.id,
                    ...params
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
                    .statisticsYieldDel({
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
            this.searchInfo = params
            this.page1.currentPage = 1
            this.getData()
            done()
        },
        viewProductIndex(projectId) {
            this.indexArr = []
            this.$api
                .getProductIndexForm({
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
        // 指标查看
        rowView(row, index) {
            console.log(row, index)
            this.$refs.crud.rowView()
            console.log(this.$refs.crud)
            this.$api
                .statisticsYieldProductTest({
                    batchNumber: row.productBatchNum
                })
                .then(res => {
                    console.log(res)
                })
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
