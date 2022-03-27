<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品质量记录</el-breadcrumb-item>
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
                    :before-open="openDialog"
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
                    <template slot-scope="{ type }" slot="productNameSearch">
                        <el-select
                            v-model="form.productName"
                            placeholder="请选择产品名称"
                            value-key="productId"
                            @change="searchProduct"
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
                    <template slot-scope="{ type }" slot="departmentNameSearch">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择 车间名称"
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
                    <template slot-scope="{ type }" slot="departmentNameForm">
                        <el-select
                            v-model="form.departmentName"
                            placeholder="请选择 车间名称"
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
                    <template slot-scope="{ type }" slot="productionDateForm">
                        <el-date-picker
                            v-model="form.productionDate"
                            type="date"
                            placeholder="选择生产日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="sampleNameSearch">
                        <el-select
                            v-model="form.sampleName"
                            placeholder="请选择 样品名称"
                            value-key="sampleCode"
                            @change="selectSample"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in sampleDataList"
                                :key="item.sampleCode"
                                :label="item.sampleName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="sampleNameForm">
                        <el-select
                            v-model="form.sampleName"
                            placeholder="请选择 样品名称"
                            value-key="sampleCode"
                            @change="selectSample"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in sampleDataList"
                                :key="item.sampleCode"
                                :label="item.sampleName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="samplingTimeForm">
                        <el-time-picker
                            v-model="form.samplingTime"
                            placeholder="请选择采样时间"
                            format="HH:mm"
                            :disabled="type == 'view'"
                            value-format="HH:mm"
                        >
                        </el-time-picker>
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
                        <p class="num-tip" v-if="type != 'view'">
                            批次号可系统生成，可输入。保存前请确保当前内容与批次号一致。
                        </p>
                    </template>
                    <template slot-scope="{ type }" slot="analysisDateForm">
                        <el-date-picker
                            v-model="form.analysisDate"
                            type="date"
                            placeholder="选择生产日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="decisionOutcomeSearch">
                        <el-select
                            v-model="form.decisionOutcome"
                            placeholder="请选择 判定结果"
                            @change="selectDecisionOutcome"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in resultDataList"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="decisionOutcomeForm">
                        <el-select
                            v-model="form.decisionOutcome"
                            placeholder="请选择 判定结果"
                            @change="selectDecisionOutcome"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in resultDataList"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <!-- <template slot-scope="{row,label,dic,index}" slot="menu">
						<el-button icon="el-icon-check" @click="rowView(row, index,label,dic)">自定义菜单按钮</el-button>
					</template> -->
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
                row: true,
                span: 12,
                searchShowBtn: false,
                searchMenuSpan: 6,
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        display: false,
                        search: true,
                        width: 120,
                        overHidden: true
                    },
                    {
                        label: '车间代码',
                        prop: 'departmentCode',
                        display: false,
                        hide: true
                    },
                    {
                        label: '产品名称',
                        prop: 'productName',
                        display: false,
                        search: true,
                        width: 200,
                        overHidden: true
                    },
                    {
                        label: '产品编号',
                        prop: 'productId',
                        display: false,
                        hide: true
                    },
                    {
                        label: '产品规格',
                        prop: 'productSize',
                        display: false
                    },
                    {
                        label: '类型',
                        prop: 'productType',
                        display: false
                    },
                    {
                        label: '套系',
                        prop: 'taoxi',
                        display: false
                    },
                    {
                        label: '生产日期',
                        prop: 'productionDate',
                        display: false,
                        width: 100,
                        search: true
                    },
                    {
                        label: '生产班次',
                        prop: 'workingShift',
                        display: false,
                        search: true
                    },
                    {
                        label: '生产批次',
                        prop: 'productBatch',
                        display: false,
                        search: true
                    },
                    {
                        label: '批次号',
                        prop: 'productBatchNum',
                        display: false,
                        width: 150,
                        search: true
                    },
                    {
                        label: '样品名称',
                        prop: 'sampleName',
                        display: false,
                        width: 120,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '采样时间',
                        prop: 'samplingTime',
                        display: false
                    },
                    {
                        label: '分析日期',
                        prop: 'analysisDate',
                        width: 120,
                        display: false
                    },
                    {
                        label: '分析班次',
                        prop: 'analysisShift',
                        display: false
                    },
                    {
                        label: '判定结果',
                        prop: 'decisionOutcome',
                        display: false,
                        search: true
                    },
                    {
                        label: '分析人',
                        prop: 'analysisUser',
                        display: false
                    }
                ],
                group: [
                    {
                        label: '产品信息',
                        prop: 'cpxx',
                        icon: 'el-icon-box',
                        arrow: false,
                        column: [
                            {
                                label: '车间名称',
                                prop: 'departmentName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择车间名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '车间代码',
                                prop: 'departmentCode',
                                disabled: true,
                                display: false,
                                span: 8
                            },
                            {
                                label: '产品名称',
                                prop: 'productName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择产品名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '产品规格',
                                prop: 'productSize',
                                disabled: true,
                                span: 8
                            },
                            {
                                label: '类型',
                                prop: 'productType',
                                disabled: true,
                                span: 8
                            },
                            {
                                label: '套系',
                                prop: 'taoxi',
                                span: 8
                            },
                            {
                                label: '生产日期',
                                prop: 'productionDate',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择生产日期',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '生产班次',
                                prop: 'workingShift',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入生产班次',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '生产批次',
                                prop: 'productBatch',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入生产批次',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '批次号',
                                prop: 'productBatchNum',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入批次号',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            }
                        ]
                    },
                    {
                        label: '产品检验信息',
                        prop: 'jbxxa',
                        icon: 'el-icon-document-copy',
                        arrow: false,
                        column: [
                            {
                                label: '样品名称',
                                prop: 'sampleName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入样品名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '样品代码',
                                prop: 'sampleCode',
                                display: false,
                                span: 8
                            },
                            {
                                label: '采样时间',
                                prop: 'samplingTime',
                                span: 8
                            },
                            {
                                label: '分析日期',
                                prop: 'analysisDate',
                                span: 8
                            },
                            {
                                label: '分析班次',
                                prop: 'analysisShift',
                                span: 8
                            },
                            {
                                label: '判定结果',
                                prop: 'decisionOutcome',
                                search: true,
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择判定结果',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '分析人',
                                prop: 'analysisUser',
                                span: 8
                            }
                        ]
                    },
                    {
                        label:
                            '分析指标（选择生产产品后，带出该产品的质量分析指标，人工录入分析数值）',
                        prop: 'tksq',
                        icon: 'el-icon-finished',
                        formslot: true,
                        arrow: false,
                        column: this.indexArr
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                departmentName: '', //车间名称
                productName: '', //产品名称
                departmentCode: '', //车间代码
                workingShift: '', //生产班次
                productBatch: '', //生产批次
                batchNumber: '', //批次号
                beginDate: '', //生产日期起
                endDate: '', //生产日期止
                sampleName: '', //样品名称
                decisionOutcome: '', //判定结果
                time: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            // 分厂option
            departmentsList: [],
            productList: [],
            indexStr: '',
            productIndexList: [],
            sampleDataList: [],
            resultDataList: [],
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
        // this.getData()
        this.getDepartment()
        this.getProduct()
		this.setOperate()
        this.getResultData()
        this.getData()
    },
    mounted() {},
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
        getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        },
        getResultData() {
            this.$api
                .commonDict({
                    entityCode: 'PRODUCT_QUALITY', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'DECISION_OUTCOME' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.resultDataList = res.data
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
        searchProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
        },
        selectProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
            this.getProductIndex(this.form.productId)
            this.getProductInfo(this.form.productId)
        },
        selectDepartment(val) {
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        // 获取产品样编码
        getSampleData() {
            this.$api
                .getSampleData({
                    factoryCode: this.$store.state.user.userInfo.orgCode
                })
                .then(res => {
                    console.log(res)
                    if (res.code == 'SUCCESS') {
                        this.sampleDataList = res.data
                    } else {
                        // this.$message.error(res.message)
                    }
                })
        },
        selectSample(val) {
            this.form.sampleName = val.sampleName
            this.form.sampleCode = val.sampleCode
        },
        selectDecisionOutcome(val) {
            console.log(val)
            this.form.decisionOutcome = val
        },
        getProductInfo(productId) {
            this.$api
                .productInfo({
                    productId
                })
                .then(res => {
                    console.log(res.data)
                    this.form.productSize = res.data.productSize
                    this.form.productType = res.data.productType
                })
        },
        getProductIndex(val) {
            this.indexArr = []
            this.$api
                .getProductIndex({
                    productId: val
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        let productIndexArr = res.data.productIndex
                        this.productIndexList = res.data.productIndex
                        this.indexStr = productIndexArr[0].targetKey.substring(0, 3)
                        productIndexArr.forEach((item, i) => {
                            this.indexArr[i] = {
                                label: item.targetName,
                                prop: item.targetKey,
                                index: item.targetKey,
                                span: 8
                            }
                        })
                        this.option.group[2].column = this.indexArr
                        this.$nextTick(() => {
                            this.$refs.crud.updateDic()
                        })
                    } else if (res.code == 'FAIL') {
                        this.$message.error(res.message)
                        this.option.group[2].column = []
                        this.$nextTick(() => {
                            this.$refs.crud.updateDic()
                        })
                    }
                })
        },
        searchChange(params, done) {
            console.log(params)
            this.form.workingShift = params.workingShift
            this.form.productBatch = params.productBatch
            this.form.productBatchNum = params.productBatchNum
            this.page1.currentPage = 1
            // this.form = params
            this.getData()
            done()
        },
        getData() {
            this.loading = true
            this.$api
                .productQualityList({
                    departmentCode: this.form.departmentCode, //车间名称
                    productName: this.form.productName, //产品名称
                    workingShift: this.form.workingShift, //生产班次
                    productBatch: this.form.productBatch, //生产批次
                    batchNumber: this.form.productBatchNum, //批次号
                    beginDate: this.form.time ? this.form.time[0] : '', //生产日期起
                    endDate: this.form.time ? this.form.time[1] : '', //生产日期止
                    sampleName: this.form.sampleName, //样品名称
                    decisionOutcome: this.form.decisionOutcome, //判定结果
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
            this.form.departmentName = ''
            this.form.productName = ''
            this.form.productBatchNum = ''
            this.form.departmentCode = ''
            this.form.productName = ''
            this.form.workingShift = ''
            this.form.productBatch = ''
            this.form.time = ''
            this.form.sampleName = ''
            this.form.decisionOutcome = ''
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
        // 获取表单   obj: 表单对象，str : 产品指标前3位
        filterproductQuality(obj, str) {
            const object = {}
            Object.keys(obj)
                .filter(key => key.indexOf(str) == -1)
                .forEach(key => {
                    object[key] = obj[key]
                })
            return object
        },
        fileterMaterialIndexList(obj, str) {
            const object = {}
            Object.keys(obj)
                .filter(key => key.indexOf(str) != -1)
                .forEach(key => {
                    object[key] = obj[key]
                })
            this.productIndexList.forEach((element, i) => {
                element.targetValue = ''
            })
            let materialList = []
            Object.keys(object).map(el => {
                this.productIndexList.forEach((item, i) => {
                    materialList = this.productIndexList
                    if (item.targetKey == el) {
                        materialList[i] = {
                            targetName: item.targetName,
                            targetKey: item.targetKey,
                            targetValue: object[el]
                        }
                    }
                })
            })
            return materialList
        },
        handleSave(form, done, loading) {
            let productQualityList = this.filterproductQuality(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            console.log(productQualityList)
            let params = {
                productQuality: productQualityList,
                productQualityIndexList: materialIndexList
            }
            this.$api.productQualityAdd(params).then(res => {
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
            let productQualityList = this.filterproductQuality(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)

            let params = {
                productQuality: productQualityList,
                productQualityIndexList: materialIndexList
            }
            this.$api
                .productQualityEdit({
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
                    .productQualityDel({
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
                .productQualityIndex({
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
                                span: 8
                            }
                        })
                        this.option.group[2].column = this.indexArr
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
        openDialog(done, type) {
			this.getSampleData()
            if (['view', 'edit'].includes(type)) {
                this.viewProductIndex(this.form.id)
            } else {
                this.option.group[2].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
            done()
        },
		generateNum() {
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
        },
		importTing(){

		}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
.num-tip {
    font-size: 12px;
    color: #990000;
	line-height: 14px;
}
</style>
