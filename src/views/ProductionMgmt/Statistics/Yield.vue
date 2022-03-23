<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产统计</el-breadcrumb-item>
                <el-breadcrumb-item>日产量统计</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="productBatchNumForm">
                        <el-input
                            :disabled="type == 'view'"
                            v-model="form.productBatchNum"
                            placeholder="请输批次号"
                        ></el-input>
                        <el-button type="text" v-show="type != 'view'" @click="generateNum"
                            >生成批次号</el-button
                        >
                        <p class="num-tip">
                            批次号可系统生成，可输入。保存前请确保当前内容与批次号一致。
                        </p>
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
                    <template slot-scope="{ row }" slot="menu">
                        <el-button icon="el-icon-check" type="text" @click="showDialog(row)"
                            >指标</el-button
                        >
                    </template>
                </avue-crud>
                <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
                    <el-descriptions
                        class="margin-top"
                        title="产品质量检验信息"
                        :column="3"
                        border
                    >
                        <el-descriptions-item>
                            <template slot="label"> 产品名称 </template>
                            {{ productQualityInfo.productName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 产品规格 </template>
                            {{ productQualityInfo.productSize }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 产品批次号 </template>
                            {{ productQualityInfo.productBatchNum }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 产品类型 </template>
                            {{ productQualityInfo.productType }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 车间名称 </template>
                            {{ productQualityInfo.departmentName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 生产班次 </template>
                            {{ productQualityInfo.workingShift }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 生产日期 </template>
                            {{ productQualityInfo.productionDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 生产批次 </template>
                            {{ productQualityInfo.productBatch }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 分析人 </template>
                            {{ productQualityInfo.analysisUser }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 分析班次 </template>
                            {{ productQualityInfo.analysisShift }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 分析日期 </template>
                            {{ productQualityInfo.analysisDate }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 判定结果 </template>
                            {{ productQualityInfo.decisionOutcome }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 样品名称 </template>
                            {{ productQualityInfo.sampleName }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template slot="label"> 采用时间 </template>
                            {{ productQualityInfo.samplingTime }} </el-descriptions-item
                        >createUser
                        <el-descriptions-item>
                            <template slot="label"> 创建用户 </template>
                            {{ productQualityInfo.createUser }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-descriptions
                        class="margin-top"
                        title="产品质量分析指标信息"
                        :column="3"
                        border
                    >
                        <el-descriptions-item
                            v-for="(item, i) in productQualityInfo.indexValue"
                            :key="i + 'value'"
                        >
                            <template slot="label"> {{ item.targetName }} </template>
                            {{ item.targetValue }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
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
            loading: true,
            flag: false,
            dialogVisible: false,
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
                viewBtn: true,
                searchLabelWidth: 90,
                row: true,
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
                        label: '生产日期',
                        prop: 'productionDate',
                        search: true,
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
                        label: '产品名称',
                        prop: 'productName',
                        width: 120,
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '生产车间',
                        prop: 'departmentName',
                        disabled: true,
                        search: true,
                        width: 120
                    },
                    {
                        label: '生产班次',
                        prop: 'workingShift',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入班次',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '产品类型',
                        prop: 'productType',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品类型',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },

                    {
                        label: '生产批次',
                        prop: 'productBatch',
                        search: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入生产批次',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '产品批次号',
                        prop: 'productBatchNum',
                        search: true,
                        // addDisplay: false,
                        // editDisplay: false,
                        width: 200,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品批次号',
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
                        label: '计量单位',
                        prop: 'measureUnit',
                        disabled: true
                    }
                    /* {
                        label: '质量信息',
                        prop: 'qualityInfo',
                        disabled: true
                    } */
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
                time: [],
				productBatchNum: ''
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
            searchInfo: {},
            productQualityInfo: {}
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
        /* qualityInfo() {
            const { productName, productionDate, workingShift, productBatch } = this.form
            return { productName, productionDate, workingShift, productBatch }
        } */
    },
    watch: {
        /* qualityInfo: {
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
        } */
    },
    methods: {
        getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        },
        /* getQualityInfo() {
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
        }, */
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
                        this.form.departmentCode = data.departmentCode
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
		 searchChange(params, done) {
            console.log(params)
            this.searchInfo = params
            this.page1.currentPage = 1
            this.getData()
            done()
        },
        getData() {
            this.loading = true
            this.$api
                .statisticsYieldListApi({
                    productName: this.searchInfo.productName, //产品名称
                    departmentCode: this.form.departmentCode, //车间代码
                    workingShift: this.searchInfo.workingShift, //生产班次
                    productBatch: this.searchInfo.productBatch, //生产批次
                    batchNumber: this.searchInfo.batchNumber, //批次号
                    beginDate: this.form.time ? this.form.time[0] : '', //生产日期起
                    endDate: this.form.time ? this.form.time[1] : '', //生产日期止
					batchNumber: this.searchInfo.productBatchNum,
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
			this.form.productBatchNum = ''
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
                productBatchNum: form.productBatchNum // 产品批次号
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
                productBatchNum: form.productBatchNum // 产品批次号
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
        showDialog(row, index) {
            console.log(row, 'row的信息')
            this.getDayProductDetail(row)
        },
        getDayProductDetail(row) {
            console.log(row)
            // this.
            this.$api
                .statisticsYieldProductTest({
                    batchNumber: row.productBatchNum
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.productQualityInfo = res.data
                        this.dialogVisible = true
                    } else {
                        this.$message.error(res.message)
                    }
                })
            /*  this.productQualityInfo = {
                updateDate: '', //更新日期
                taoxi: 'E', //套系
                departmentCode: 'HS', //车间代码
                productSize: '24-6-10', //产品规格
                remark: '', //备注
                workingShift: '1', //生产班次
                analysisUser: '杨晓艳', //分析人
                analysisShift: '2', //分析班次
                productName: '粒状磷酸一铵', //产品名称
                sampleName: '粉状磷酸一铵(PMAP)', //样品名称
                productionDate: '2022-03-01', //生产日期
                decisionOutcome: '合格', //判定结果
                id: 'da34757a-ea55-40ca-aa51-afc2c789d4d0', //主键标识
                productBatch: '2E', //生产批次
                productType: '中氯', //产品类型
                createDate: '2022-03-05 20:26:19', //创建日期
                departmentName: '复合肥一车间', //车间名称
                productId: '08', //产品编号
                analysisDate: '2022-03-02', //分析日期
                updateUser: '', //更新用户
                samplingTime: '19:00', //采用时间
                sampleCode: 'MP', //样品代码
                createUser: '磷化工用户1', //创建用户
                productBatchNum: '22030112E08', //产品批次号
                indexValue: [
                    {
                        targetName: '总养分%', //指标名称
                        targetValue: '29.98' //指标值
                    },
                    {
                        targetName: '总养分%', //指标名称
                        targetValue: '29.98' //指标值
                    },
                    {
                        targetName: '总养分%', //指标名称
                        targetValue: '29.98' //指标值
                    },
                    {
                        targetName: '总养分%', //指标名称
                        targetValue: '29.98' //指标值
                    }
                ] //质量指标对象
            } */
        },
        handleClose() {},
        generateNum() {
            console.log(this.form)
            if (this.form.productId == '' || this.form.productId == undefined) {
                this.$message.error('请选择产品名称')
                return
            } else if (this.form.productionDate == '' || this.form.productionDate == undefined) {
                this.$message.error('请选择生产日期')
                return
            } else if (this.form.workingShift == '' || this.form.workingShift == undefined) {
                this.$message.error('请输入生产班次')
                return
            } else if (this.form.productBatch == '' || this.form.productBatch == undefined) {
                this.$message.error('请输入产品批次')
                return
            }
            let params = {
                productId: this.form.productId, //产品编号
                productionDate: this.form.productionDate, //生产日期
                workingShift: this.form.workingShift, //生产班次
                productBatch: this.form.productBatch //产品批次
            }
            this.$api.generationBatchNumber(params).then(res => {
                if (res.code == 'SUCCESS') {
                    this.form.productBatchNum = res.data.batchNum
                } else {
                    this.$message.error(res.message)
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
::v-deep .el-descriptions__header {
    margin-top: 10px;
}
::v-deep .el-descriptions__title {
    font-weight: 500;
}
::v-deep .el-descriptions-item__label {
    width: 200px;
}
.num-tip {
    font-size: 12px;
    color: #990000;
}
</style>
