<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>辅料记录</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="accessoryNameForm">
                        <el-select
                            v-model="form.accessoryName"
                            placeholder="请选择 辅料名称"
                            value-key="materialId"
                            @change="selectMaterial"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in accessoryNameList"
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
                // addBtn: false,
                column: [
                    {
                        label: '进料日期',
                        prop: 'purchasedDate',
                        width: 200,
                        display: false,
                        search: true
                    },
                    {
                        label: '辅料名称',
                        prop: 'accessoryName',
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
                        label: '辅料信息',
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
                                label: '辅料名称',
                                prop: 'accessoryName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入辅料名称',
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
            accessoryNameList: [],
            indexStr: '',
            productIndexList: [],
            supplierNameList: [],
            meterialIndexArr: [],
            qualityInfoList: []
        }
    },
    created() {
        // this.getData()

        this.getMaterial()
        this.getQualityInfo()
        this.getData()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        getMaterial() {
            this.$api
                .commonMaterial({
                    materialType: 'FL'
                })
                .then(res => {
                    this.accessoryNameList = res.data
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
            this.form.accessoryName = val.materialName
            // this.form.materialId = val.materialId
            this.getMaterialData(this.form.accessoryName)
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
                .accessoryEnterData({
                    accessoryName: name
                })
                .then(res => {
                    console.log(res)
                    if (res.code == 'SUCCESS') {
                        this.factoryList = res.data.factoryArray
                        this.supplierNameList = res.data.supplierArray
                        this.meterialIndexArr = res.data.accessoryArray
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
            this.form.accessoryName = params.accessoryName
            this.form.factoryName = params.factoryName
            this.form.supplierName = params.supplierName
            this.getData()
            done()
        },
        getData() {
            this.loading = true
            this.$api
                .ingredientsEnterList({
                    accessoryName: this.form.accessoryName,
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
            this.form.accessoryName = ''
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
        filteringredientsEnter(obj, str) {
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
            // console.log(form, this.indexStr)
            let ingredientsEnterList = this.filteringredientsEnter(form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(form, this.indexStr)
            // console.log(ingredientsEnterList)
            let params = {
                accessoryPurchased: ingredientsEnterList,
                accessoryPurchasedIndexList: materialIndexList
            }
            this.$api.ingredientsEnterAdd(params).then(res => {
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
            let ingredientsEnterList = this.filteringredientsEnter(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)

            let params = {
                accessoryPurchased: ingredientsEnterList,
                accessoryPurchasedIndexList: materialIndexList
            }
            this.$api
                .ingredientsEnterEdit({
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
                    .ingredientsEnterDel({
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
                .accessoryEnterIndex({
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
            if (['view', 'edit'].includes(type)) {
                this.viewProductIndex(this.form.id)
            } else {
                this.option.group[1].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
            done()
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
