<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品数据</el-breadcrumb-item>
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
        let indexArr = []
        return {
            reload: Math.random(),
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
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '分厂名称',
                        prop: 'factoryName',
                        width: 200,
                        fixed: true,
                        display: false,
                        search: true
                    },
                    {
                        label: '分厂代码',
                        prop: 'factoryCode',
                        display: false,
                        fixed: true
                    },
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        width: 200,
                        fixed: true,
                        display: false,
                        search: true
                    },
                    {
                        label: '车间代码',
                        prop: 'departmentCode',
                        display: false
                    },
                    {
                        label: '产品名称',
                        prop: 'productName',
                        width: 200,
                        display: false,
                        search: true
                    },
                    {
                        label: '产品规格',
                        prop: 'productSize',
                        display: false,
                        search: true
                    },
                    {
                        label: '产品编号',
                        prop: 'productId',
                        display: false
                    },
                    {
                        label: '计量单位',
                        prop: 'measureUnit',
                        display: false
                    },
                    {
                        label: '包装规格',
                        prop: 'packingSize',
                        display: false,
                        width: 250
                    },
                    {
                        label: '类型',
                        prop: 'productType',
                        display: false
                    },
                    {
                        label: '备注',
                        prop: 'productRemark',
                        display: false,
                        width: 250
                    }
                ],
                group: [
                    {
                        label: '产品信息',
                        prop: 'jbxx',
                        icon: 'el-icon-box',
                        arrow: false,
                        column: [
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
                                disabled: true,
                                display: false,
                                span: 8
                            },
                            {
                                label: '车间名称',
                                prop: 'departmentName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入车间名称',
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
                                        message: '请输入产品名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '产品规格',
                                prop: 'productSize',
                                disabled: true,
                                display: false,
                                span: 8
                            },
                            {
                                label: '计量单位',
                                prop: 'measureUnit',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入计量单位',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '产品编号',
                                prop: 'productId',
                                disabled: true,
                                display: false,
                                span: 8
                            },
                            {
                                label: '包装规格',
                                prop: 'packingSize',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入包装规格',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '类型',
                                prop: 'productType',
                                span: 8
                            },
                            {
                                label: '备注',
                                prop: 'productRemark',
                                type: 'textarea',
                                span: 24
                            }
                        ]
                    },
                    {
                        label: '质量检验指标（选择产品名称后自动生成）',
                        prop: 'tksq',
                        icon: 'el-icon-finished',
                        formslot: true,
                        arrow: false,
                        column: indexArr
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                factoryName: '', //分厂名称
                departmentName: '', //车间名称
                productName: '', //产品名称
                productSize: '' //产品规格
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
            productIndexList: []
        }
    },
    created() {
        // this.getData()

        this.getProduct()
        this.getFactory()
        this.getData()
    },
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        getProduct() {
            this.$api.commonProduct({}).then(res => {
                this.productList = res
            })
        },
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
                    if (res.code == 'SUCCESS') {
                        this.departmentsList = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        selectProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
            this.getProductIndex(this.form.productId)
        },
        selectFactory(val) {
            console.log(val)
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
            this.form.departmentName = ''
            this.getDepartment(val.nid)
        },
        selectDepartment(val) {
            this.form.departmentName = val.departmentName
            this.form.departmentCode = val.departmentCode
        },
        getProductIndex(val) {
            this.indexArr = []
            this.$api
                .getProductIndex({
                    productId: val
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.form.productSize = res.data.productSize
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

                        /* this.$nextTick(() => {
                            this.option.group[1].column = this.indexArr
                        }) */
                        // this.option.group[1].column = this.indexArr
                        /* setTimeout(() => {
                            this.$refs.crud.updateDic('tksq')
                        }, 1000) */
                        // this.option.group[1].column = this.indexArr
                        // this.$refs.crud.DIC.tksq = this.indexArr

                        // this.$refs.crud.DIC.tksq = this.indexArr
                        this.option.group[1].column = this.indexArr
                        this.$refs.crud.updateDic('tksq', this.indexArr)
                        this.$nextTick(() => {
                            this.$refs.crud.updateDic()
                            console.log(this.$refs.crud.DIC.tksq)
                            console.log(this.option.group[1].column)
                        })
                        setTimeout(() => {
                            this.option.group[1].column = this.indexArr
                            this.$refs.crud.updateDic()
                            console.log(this.$refs.crud.DIC.tksq)
                            console.log(this.option.group[1].column)
                        }, 1000)
                        /*  setTimeout(() => {
                            this.$refs.crud.updateDic('tksq')
                        }, 500) */
                    } else if (res.code == 'FAIL') {
                        this.$message.error(res.message)
                        this.option.group[1].column = []
                        this.$nextTick(() => {
                            this.$refs.crud.updateDic()
                        })
                    }
                })
        },
        getData() {
            this.loading = true
            this.$api
                .productDataList({
                    factoryName: this.form.factoryName, //分厂名称
                    departmentName: this.form.departmentName, //车间名称
                    productName: this.form.productName, //产品名称
                    productSize: this.form.productSize, //产品规格
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
            this.form.factoryName = ''
            this.form.departmentName = ''
            this.form.productName = ''
            this.form.productSize = ''
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
        filterProductData(obj, str) {
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
                console.log(this.productIndexList)
                this.productIndexList.forEach((item, i) => {
                    materialList = this.productIndexList
                    if (item.targetKey == el) {
                        materialList[i] = {
                            targetName: item.targetName,
                            targetKey: item.targetKey,
                            targetValue: '' || object[el]
                        }
                    }
                })
                console.log(materialList)
            })
            return materialList
        },
        handleSave(form, done, loading) {
            let productDataList = this.filterProductData(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            let params = {
                productData: productDataList,
                productIndexList: materialIndexList
            }
            this.$api.productDataAdd(params).then(res => {
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
            let productDataList = this.filterProductData(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            let params = {
                productData: productDataList,
                productIndexList: materialIndexList
            }
            this.$api
                .productDataEdit({
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
                    .productDataDel({
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
            this.page1.currentPage = 1
            this.form = params
            this.getData()
            done()
        },
        viewProductIndex(projectId) {
            // this.option.group[1].column = []
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
                                span: 8
                            }
                        })
                        // TODO
                        /* this.$nextTick(() => {
							this.option.group[1].column = this.indexArr
                            this.$refs.crud.updateDic()
                        }) */
                        this.option.group[1].column = this.indexArr
                        // console.log(this.option.group[1].column)
                        // this.$set(this.option.group[1], 'column', this.indexArr)
                        /* this.option.group[1].column = this.indexArr
						Object.assign({}, this.option.group[1]) */
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
                /* this.option.group[1].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                }) */
            }
            done()
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
