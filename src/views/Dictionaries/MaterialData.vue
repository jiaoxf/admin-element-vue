<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>辅料数据</el-breadcrumb-item>
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
                            placeholder="请选择辅料名称"
                            value-key="materialId"
                            @change="selectAccessory"
                            :disabled="type == 'view'"
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
                        label: '分厂名称',
                        prop: 'factoryName',
                        display: false,
                        search: true
                    },
                    {
                        label: '辅料名称',
                        prop: 'accessoryName',
                        display: false,
                        search: true
                    },
                    {
                        label: '供应商名称',
                        searchLabelWidth: 100,
                        prop: 'supplierName',
                        display: false,
                        search: true
                    },
                    {
                        label: '计量单位',
                        prop: 'measureUnit',
                        display: false,
                        search: false
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
                                label: '分厂名称',
                                prop: 'factoryName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入分厂名称',
                                        trigger: 'blur'
                                    }
                                ]
                            },
                            {
                                label: '辅料名称',
                                prop: 'materialName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入辅料名称',
                                        trigger: 'blur'
                                    }
                                ]
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
                                ]
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
                                ]
                            }
                        ]
                    },
                    {
                        label: '质量检验指标（选择辅料名称后自动生成）',
                        arrow: false,
                        prop: 'tksq',
                        icon: 'el-icon-finished',
                        formslot: true,
                        column: this.indexArr
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                factoryName: '', //分厂名称
                accessoryName: '',
                supplierName: '',
                measureUnit: ''
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
			myExportBtn: false,
			myImportBtn: false
        }
    },
    created() {
        // this.getData()
		this.setOperate()
        this.getMaterial()
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
        getMaterial() {
            this.$api
                .commonMaterial({
                    materialType: 'FL'
                })
                .then(res => {
                    this.accessoryNameList = res.data
                })
        },
        getFactory() {
            this.$api.commonFactory({}).then(res => {
                this.factoryList = res.data
            })
        },
        selectAccessory(val) {
            this.form.accessoryName = val.materialName
            this.form.materialId = val.materialId
            this.getAccessoryIndex(this.form.materialId)
        },
        selectFactory(val) {
            this.form.factoryCode = val.factoryCode
            this.form.factoryName = val.factoryName
        },
        getAccessoryIndex(val) {
            this.indexArr = []
            this.$api
                .getAccessoryIndex({
                    id: val
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
                        console.log(this.indexArr)
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
                .accessoryDataList({
                    factoryName: this.form.factoryName, //分厂名称
                    accessoryName: this.form.accessoryName,
                    measureUnit: this.form.measureUnit,
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
            this.form.accessoryName = ''
            this.form.measureUnit = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
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
            let accessoryList = []
            Object.keys(object).map(el => {
                this.productIndexList.forEach((item, i) => {
                    accessoryList = this.productIndexList
                    if (item.targetKey == el) {
                        accessoryList[i] = {
                            targetName: item.targetName,
                            targetKey: item.targetKey,
                            targetValue: object[el]
                        }
                    }
                })
            })
            return accessoryList
        },
        handleSave(form, done, loading) {
            let productDataList = this.filterProductData(this.form, this.indexStr)
            let materialIndexList = this.fileterMaterialIndexList(this.form, this.indexStr)
            let params = {
                accessoryData: {
                    factoryName: productDataList.factoryName, //分厂名称
                    factoryCode: productDataList.factoryCode, //分厂代码
                    accessoryName: productDataList.materialName.materialName, //辅料名称
                    supplierName: productDataList.supplierName, //供应商名称
                    measureUnit: productDataList.measureUnit //计量单位
                },
                accessoryIndexList: materialIndexList
            }
            this.$api.accessoryDataAdd(params).then(res => {
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
            console.log(productDataList)
            let params = {
                accessoryData: {
                    id: productDataList.id,
                    factoryName: productDataList.factoryName, //分厂名称
                    factoryCode: productDataList.factoryCode, //分厂代码
                    accessoryName: productDataList.accessoryName, //辅料名称
                    supplierName: productDataList.supplierName, //供应商名称
                    measureUnit: productDataList.measureUnit //计量单位
                },
                accessoryIndexList: materialIndexList
            }
            console.log(params)
            this.$api
                .accessoryDataEdit({
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
                    .accessoryDataDel({
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
                .getAccessoryIndexForm({
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
                        console.log(this.indexArr)
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
                // this.getAccessoryIndex(this.form.id)
                console.log(this.form.$index)
                console.log(this.data[this.form.$index].accessoryName)
                this.form.materialName = this.data[this.form.$index].accessoryName
                console.log(this.form.id)
                this.viewProductIndex(this.form.id)
            } else {
                this.option.group[1].column = []
                this.$nextTick(() => {
                    this.$refs.crud.updateDic()
                })
            }
            done()
        },
		importFunction(){

		}
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
