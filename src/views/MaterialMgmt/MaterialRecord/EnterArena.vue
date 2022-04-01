<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>原料记录</el-breadcrumb-item>
                <el-breadcrumb-item>进场记录</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="purchasedDateForm">
                        <el-date-picker
                            v-model="form.purchasedDate"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            :disabled="type == 'view'"
                            value-format="yyyy-MM-dd"
                            clearable
                        >
                        </el-date-picker>
                    </template>
                    <template slot-scope="{ type }" slot="factoryNameForm">
                        <el-select
                            v-model="form.factoryName"
                            placeholder="请选择 分厂名称"
                            value-key="factoryCode"
                            @change="selectFactory"
                            :disabled="type == 'view'"
                            clearable
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
                    <template slot-scope="{ type }" slot="supplierNameForm">
                        <el-select
                            v-model="form.supplierName"
                            placeholder="请选择 供应商名称"
                            @change="selectSupplierName"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="(item, i) in supplierNameList"
                                :key="i + 's'"
                                :label="item.supplierName"
                                :value="item.supplierName"
                            >
                            </el-option>
                        </el-select>
                    </template>

                    <template slot-scope="{ type }" slot="qualityInfoForm">
                        <el-select
                            v-model="form.qualityInfo"
                            placeholder="请选择 质量信息"
                            @change="selectQualityInfo"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in qualityInfoList"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{ row }" slot="menu">
                        <el-button
                            v-if="myIndexBtn"
                            type="text"
                            icon="el-icon-check"
                            @click="showDialog(row)"
                            >约定参数</el-button
                        >
                    </template>
                </avue-crud>
                <el-dialog title="约定参数详情" :visible.sync="dialogVisible" width="80%">
                    <el-descriptions
                        class="margin-top"
                        title=""
                        :column="3"
                        border
                    >
                        <el-descriptions-item
                            v-for="(item, i) in materialInfoIndex"
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
            data: [],
            defaults: {},
            // 质量指标数据
            indexArr: [],
            option: {
                addBtn: false,
                editBtn: false,
                viewBtn: false,
                delBtn: false,
                menuWidth: 300,
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                viewBtn: true,
                row: true,
                span: 12,
                searchShowBtn: false,
                searchMenuSpan: 6,
                searchSpan: 8,
                searchLabelWidth: 100,
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                column: [
                    {
                        label: '进料日期',
                        prop: 'purchasedDate',
                        width: 200,
                        display: false,
                        search: true
                    },
                    {
                        label: '原料名称',
                        prop: 'materialName',
                        width: 200,
                        display: false,
                        search: true
                    },
                    {
                        label: '供应商名称',
                        prop: 'supplierName',
                        display: false,
                        search: true
                    },
                    {
                        label: '分厂名称',
                        prop: 'factoryName',
                        display: false,
                        search: true
                    },
                    {
                        label: '分厂代码',
                        prop: 'factoryCode',
                        display: false,
                        hide: true
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
                        label: '质量信息',
                        prop: 'qualityInfo',
                        display: false
                    }
                ],
                group: [
                    {
                        label: '原料信息',
                        prop: 'jbxx',
                        icon: 'el-icon-box',
                        arrow: false,
                        column: [
                            {
                                label: '进料日期',
                                prop: 'purchasedDate',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择进料日期',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '原料名称',
                                prop: 'materialName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入原料名称',
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
                                        message: '请输入供应商名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '分厂名称',
                                prop: 'factoryName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入分厂名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '分厂代码',
                                prop: 'factoryCode',
                                display: false,
                                hide: true,
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
                                disabled: true,
								placeholder:'系统自动带入',
                                span: 8
                            },
                            {
                                label: '质量信息',
                                prop: 'qualityInfo',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择质量信息',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '备注',
                                prop: 'remark',
                                type: 'textarea',
                                span: 24
                            }
                        ]
                    },
                    {
                        label: '分析指标（选择供应商名称和分厂名称后自动生成）',
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
                time: '',
                factoryName: '' //分厂名称
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            // 分厂option
            factoryList: [],
            materialNameList: [],
            indexStr: '',
            productIndexList: [],
            supplierNameList: [],
            meterialIndexArr: [],
            qualityInfoList: [],
            myExportBtn: false,
            myImportBtn: false,
            myIndexBtn: false,
            materialInfoIndex: [],
            dialogVisible: false
        }
    },
    created() {
        // this.getData()

        this.getMaterial()
        this.getQualityInfo()
        this.setOperate()
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
                btnList.indexOf('index') > -1 ? (this.myIndexBtn = true) : (this.myIndexBtn = false) //
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
        showDialog(row, index) {
            this.getDayProductDetail(row)
        },
        getDayProductDetail(row) {
            this.$api
                .marterialsEnterIndex({
                    id: row.id
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.materialInfoIndex = res.data
                        this.dialogVisible = true
                    } else {
                        this.$message.error(res.message)
                    }
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
        getQualityInfo() {
            this.$api
                .commonDict({
                    entityCode: 'PRODUCT_QUALITY', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'DECISION_OUTCOME' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.qualityInfoList = res.data
                })
        },
        selectMaterial(val) {
            this.form.materialName = val.materialName
            // this.form.materialId = val.materialId
            this.getMaterialData(val.materialName)
        },
        selectFactory(val) {
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
            this.getMeterialIndex(this.form.supplierName, this.form.factoryCode)
        },
        selectQualityInfo(val) {
            console.log(val)
        },
        selectSupplierName(val) {
            this.form.supplierName = val
            this.getMeterialIndex(this.form.supplierName, this.form.factoryCode)
        },
        getMaterialData(name) {
            this.$api
                .materialsEnterData({
                    materialName: name
                })
                .then(res => {
                    console.log(res)

                    if (res.code == 'SUCCESS') {
                        this.factoryList = res.data.factoryArray
                        this.supplierNameList = res.data.supplierArray
                        this.meterialIndexArr = res.data.materialArray
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        /* getFactory() {
            this.$api.commonFactory({}).then(res => {
                this.factoryList = res.data
            })
        }, */
        getMeterialIndex(supplierName, factoryCode) {
            console.log(supplierName, factoryCode, '选项')
            console.log(this.meterialIndexArr)
            let arr = {}
            this.meterialIndexArr.forEach(item => {
                // console.log(item.supplierName == supplierName)
                // console.log(item.factoryCode == factoryCode)
                if (supplierName == item.supplierName && factoryCode == item.factoryCode) {
                    arr = item
                }
            })
            console.log(arr, '锅炉')
            this.indexArr = []
            if (arr != {} && arr.indexArray.length > 0) {
                this.form.measureUnit = arr.measureUnit
                this.indexStr = arr.indexArray[0].targetKey.substring(0, 3)
                console.log(this.indexStr)
                this.productIndexList = arr.indexArray
                arr.indexArray.forEach((item, i) => {
                    this.indexArr[i] = {
                        label: item.targetName,
                        prop: item.targetKey,
                        index: item.targetKey,
                        span: 8
                    }
                })
                this.option.group[1].column = this.indexArr
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            } else {
                this.option.group[1].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
        },
        searchChange(params, done) {
            console.log(params)
            this.page1.currentPage = 1
            // this.form = params
            this.form.materialName = params.materialName
            this.form.factoryName = params.factoryName
            this.form.supplierName = params.supplierName
            this.getData()
            done()
        },
        getData() {
            this.loading = true
            this.$api
                .materialEnterList({
                    materialName: this.form.materialName,
                    supplierName: this.form.supplierName,
                    factoryName: this.form.factoryName, //分厂名称
                    currPage: this.page1.currentPage,
                    beginDate: this.form.time ? this.form.time[0] : '',
                    endDate: this.form.time ? this.form.time[1] : '',
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
            this.form.materialName = ''
            this.form.supplierName = ''
            this.form.factoryName = ''
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
        filtermaterialEnter(obj, str) {
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
                    console.log(materialList, '2222')
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
            console.log(form, this.indexStr, '参数')
            let materialEnterList = this.filtermaterialEnter(form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(form, this.indexStr)
            // console.log(materialEnterList)
            let params = {
                materialsPurchased: materialEnterList,
                materialsPurchasedIndexList: materialIndexList
            }
            this.$api.materialEnterAdd(params).then(res => {
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
            let materialEnterList = this.filtermaterialEnter(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)

            let params = {
                materialsPurchased: materialEnterList,
                materialsPurchasedIndexList: materialIndexList
            }
            this.$api
                .materialEnterEdit({
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
                    .materialEnterDel({
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
                .marterialsEnterIndex({
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
        openDialog(done, type) {
            console.log()
            if (['view', 'edit'].includes(type)) {
                this.viewProductIndex(this.form.id)
            } else {
                this.option.group[1].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
            done()
        },
        importTing() {}
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
</style>
