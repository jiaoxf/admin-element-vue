<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>环保管理</el-breadcrumb-item>
                <el-breadcrumb-item>指标异常检测</el-breadcrumb-item>
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
                                :on-change="importFunction"
                            >
                                <el-button icon="el-icon-upload2" size="small" type="primary"
                                    >导入</el-button
                                >
                            </el-upload>
                        </div>
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
                    <template slot-scope="{ type }" slot="productNameForm">
                        <el-select
                            v-model="form.productName"
							filterable
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
                        label: '触发时间',
                        prop: 'factoryName',
                        display: false,
                        search: true
                    },
                    {
                        label: '车间',
                        prop: 'materialName',
                        display: false,
                        search: true
                    },
					{
                        label: '工序/岗位',
                        prop: 'materialName',
                        display: false,
                        search: true
                    },
                    {
                        label: '指标名称',
                        prop: 'supplierName',
                        searchLabelWidth: 100,
                        display: false,
                        search: true
                    },
                    {
                        label: '指标单位',
                        prop: 'measureUnit',
                        display: false,
                        search: false
                    },
                    {
                        label: '指标等级',
                        prop: 'measureUnit',
                        display: false,
                        search: false
                    },
                    {
                        label: '指标范围',
                        prop: 'measureUnit',
                        display: false,
                        search: false
                    },
                    {
                        label: '实时值',
                        prop: 'measureUnit',
                        display: false,
                        search: false
                    },
                    {
                        label: '异常判定标准',
                        prop: 'measureUnit',
                        display: false,
                        search: false
                    },
                    {
                        label: '事故判断标准',
                        prop: 'measureUnit',
                        display: false,
                        search: false
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
								display: false,
                                prop: 'departmentCode',
                                disabled: true,
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
                                span: 8
                            },
                            {
                                label: '包装规格',
                                prop: 'packingSize',

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
                        label: '质量检验指标',
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
            productIndexList: [],
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
        // this.getData()
        this.getDepartment()
        this.getProduct()
		this.setOperate()
        this.getFactory()
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
        selectProduct(val) {
            this.form.productName = val.productName
            this.form.productId = val.productId
            this.getProductIndex(this.form.productId)
        },
        selectFactory(val) {
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
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
                    // this.data = res.rows
					this.loading = false
                    // this.page1.total = res.total
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
            let materialList = []
            Object.keys(object).map(el => {
                this.productIndexList.forEach((item, i) => {
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
            })
                .then(() => {
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
		importFunction(){}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
