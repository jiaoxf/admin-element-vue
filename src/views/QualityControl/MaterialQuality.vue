<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>质量管理</el-breadcrumb-item>
                <el-breadcrumb-item>原料质量记录</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="materialNameForm">
                        <el-select
                            v-model="form.materialName"
                            placeholder="请选择 原料名称"
                            value-key="materialId"
                            @change="selectMaterial"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in materialNameList"
                                :key="item.materialId"
                                :label="item.materialName"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="" slot="purchasedDateSearch">
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
                    <template slot-scope="" slot="samplingDateSearch">
                        <el-date-picker
                            v-model="form.samplingTime"
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
                    <template slot-scope="{ type }" slot="samplingDateForm">
                        <el-date-picker
                            v-model="form.samplingDate"
                            type="date"
                            placeholder="选择取样日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="purchasedDateForm">
                        <el-date-picker
                            v-model="form.purchasedDate"
                            type="date"
                            placeholder="选择进料日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="analysisDateForm">
                        <el-date-picker
                            v-model="form.analysisDate"
                            type="date"
                            placeholder="选择 分析日期"
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
					<template slot-scope="{ type }" slot="mineTypeForm">
                        <el-select
                            v-model="form.mineType"
                            placeholder="请选择 矿类型"
                            @change="selectOreTypesList"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in oreTypesList"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ type }" slot="supplierNameForm">
                        <el-select
                            v-model="form.supplierName"
                            placeholder="请选择 供应商名称"
                            @change="selectSupplierName"
                            :disabled="type == 'view'"
                            value-key="supplierName"
                            clearable
                        >
                            <el-option
                                v-for="item in supplierNameList"
                                :key="item.supplierName"
                                :label="item.supplierName"
                                :value="item"
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
                searchMenuSpan: 8,
				searchSpan: 8,
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '原料名称',
                        prop: 'materialName',
                        display: false,
                        search: true,
                        width: 120,
                        overHidden: true,
                        searchLabelWidth: 100
                    },
                    {
                        label: '供应商名称',
                        prop: 'supplierName',
                        display: false,
                        search: true,
                        width: 120,
                        overHidden: true,
                        searchLabelWidth: 100
                    },
                    {
                        label: '进料日期',
                        prop: 'purchasedDate',
                        display: false,
                        search: true,
                        searchLabelWidth: 100,
                        width: 120
                    },
                    {
                        label: '进料量',
                        prop: 'purchasedNum',
                        display: false
                    },
                    {
                        label: '计量单位',
                        prop: 'measureUnit',
                        display: false
                    },
                    {
                        label: '原料样品名称',
                        prop: 'sampleName',
                        display: false,
                        width: 120,
                        overHidden: true
                    },
                    {
                        label: '取样日期',
                        prop: 'samplingDate',
                        display: false,
                        width: 120,
                        search: true,
                        searchLabelWidth: 100,
                        overHidden: true
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
                        display: false,
                        width: 120
                    },
                    {
                        label: '判定结果',
                        prop: 'decisionOutcome',
                        display: false,
                        search: true,
                        searchLabelWidth: 100
                    },
                    {
                        label: '分析人',
                        prop: 'analysisUser',
                        display: false
                    }
                ],
                group: [
                    {
                        label: '原料信息',
                        prop: 'cpxx',
                        icon: 'el-icon-box',
                        arrow: false,
                        column: [
                            {
                                label: '原料名称',
                                prop: 'materialName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择原料名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '供应商名称',
                                prop: 'supplierName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择供应商名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '进料日期',
                                prop: 'purchasedDate',
                                disabled: true,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入类型',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '进料量',
                                prop: 'purchasedNum',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入进料量',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '计量单位',
                                prop: 'measureUnit',
								placeholder:'系统自动带入',
                                disabled: true,
                                span: 8
                            }
                        ]
                    },
                    {
                        label: '原料检验信息',
                        prop: 'jbxxa',
                        icon: 'el-icon-document-copy',
                        arrow: false,
                        column: [
                            {
                                label: '原料样品名称',
                                prop: 'sampleName',
                                span: 8
                            },
                            {
                                label: '取样日期',
                                prop: 'samplingDate',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择取样日期',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '分析日期',
                                prop: 'analysisDate',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择分析日期',
                                        trigger: 'blur'
                                    }
                                ],
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
                                label: '矿类型',
                                prop: 'mineType',
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
                            '分析指标（选择原料名称后，带出该原料的质量分析指标，人工录入分析数值）',
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
                sampleName: '', //样品名称
                decisionOutcome: '', //判定结果
                time: '',
                samplingTime: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            // 分厂option
            departmentsList: [],
            materialNameList: [],
            indexStr: '',
            productIndexList: [],
            sampleDataList: [],
            resultDataList: [],
            supplierNameList: [],
			oreTypesList: [],
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
        // this.getData()
        this.getDepartment()
        this.getMaterial()
		this.getOreTypesInfo()
		this.setOperate()
        this.getSampleData()
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
		getOreTypesInfo() {
            this.$api
                .commonDict({
                    entityCode: 'MATERIALS_USE', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'MINE_TYPE' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.oreTypesList = res.data
                })
        },
        getMaterial() {
            this.$api
                .commonMaterial({
                    materialType: 'YL'
                })
                .then(res => {
                    this.materialNameList = res.data
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
        selectMaterial(val) {
            console.log(val)
            this.form.materialName = val.materialName
            this.form.materialId = val.materialId
            this.getMaterialIndex(this.form.materialName)
            this.getMaterialInfo(this.form.materialName)
        },
        selectSupplierName(val) {
            console.log(val)
            this.form.supplierName = val.supplierName
            this.form.measureUnit = val.measureUnit
        },
        // 获取产品样编码
        getSampleData() {
            this.$api
                .getSampleData({
                    factoryCode: this.$store.state.user.userInfo.orgCode
                })
                .then(res => {
                    this.sampleDataList = res.data
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
		selectOreTypesList(val){
			this.form.mineType = val
		},
        getMaterialInfo(materialName) {
            this.$api
                .materialsQualityData({
                    materialName
                })
                .then(res => {
                    console.log(res.data)
                    this.supplierNameList = res.data
                })
        },
        getMaterialIndex(val) {
            this.indexArr = []
            this.$api
                .materialsQualityIndex({
                    materialName: val
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
            this.page1.currentPage = 1
            this.form.materialName = params.materialName
            this.form.supplierName = params.supplierName
            this.getData()
            done()
        },
        getData() {
            this.loading = true
            this.$api
                .materialsQualityList({
                    materialName: this.form.materialName, //原料名称
                    supplierName: this.form.supplierName, //供应商名称
                    samplingDateBegin: this.form.samplingTime ? this.form.samplingTime[0] : '', //取样日期起
                    samplingDateEnd: this.form.samplingTime ? this.form.samplingTime[1] : '', //取样日期止
                    beginDate: this.form.time ? this.form.time[0] : '', //生产日期起
                    endDate: this.form.time ? this.form.time[1] : '', //生产日期止
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
            this.form.time = ''
            this.form.samplingTime = ''
            this.form.sampleName = ''
            this.form.materialName = ''
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
        filtermaterialsQuality(obj, str) {
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
            let materialsQualityList = this.filtermaterialsQuality(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            console.log(materialsQualityList)
            let params = {
                materialsQuality: materialsQualityList,
                materialsQualityIndexList: materialIndexList
            }
            this.$api.materialsQualityAdd(params).then(res => {
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
            let materialsQualityList = this.filtermaterialsQuality(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            let params = {
                materialsQuality: materialsQualityList,
                materialsQualityIndexList: materialIndexList
            }
            this.$api
                .materialsQualityEdit({
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
                    .materialsQualityDel({
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

        viewMaterialsIndex(projectId) {
            this.indexArr = []
            this.$api
                .getMaterialsIndex({
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
            console.log()
            if (['view', 'edit'].includes(type)) {
                this.viewMaterialsIndex(this.form.id)
            } else {
                this.option.group[2].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
            done()
        },
		importTing(){

		}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
