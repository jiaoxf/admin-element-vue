<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>槽参数</el-breadcrumb-item>
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
                    <template slot-scope="{ type }" slot="materialNameSearch">
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
                    <template slot-scope="{ type }" slot="grooveTypeForm">
                        <el-select
                            v-model="form.grooveType"
                            placeholder="请选择 槽类型"
                            :disabled="type == 'view'"
                            clearable
                        >
                            <el-option
                                v-for="item in grooveTypeList"
                                :key="item.dictId"
                                :label="item.dictId"
                                :value="item.dictId"
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
import { Loading } from 'element-ui'
import axios from 'axios'
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
            exportVal: 0,
            exportOptions: [
                {
                    value: 0,
                    label: '全部'
                },
                {
                    value: 1,
                    label: '当前页'
                }
            ],
            pageActive: 0,
            loading: true,
            flag: false,
            data: [],
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
                searchShowBtn: false,
                searchMenuSpan: 6,
                row: true,
                span: 24,
                dialogWidth: '80%',
                menuSpan: 12,
                index: true,
                indexLabel: '序号',
                column: [
                    {
                        label: '原料名称',
                        prop: 'materialName',
                        rules: [
                            {
                                required: true,
                                message: '请输入原料名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        span: 8,
                        search: true
                    },
                    {
                        label: '槽类型',
                        prop: 'grooveType',
                        rules: [
                            {
                                required: true,
                                message: '请输入槽类型',
                                trigger: ['blur', 'change']
                            }
                        ],
                        span: 8
                    },
                    {
                        label: '槽名称',
                        prop: 'grooveName',
                        rules: [
                            {
                                required: true,
                                message: '请输入槽名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true,
                        span: 8
                    },
                    {
                        label: '位号',
                        prop: 'bitNumber',
                        span: 8
                    },
                    {
                        label: '形状',
                        prop: 'shape',
                        span: 8
                    },
                    {
                        label: '介质',
                        prop: 'neurogen',
                        span: 8
                    },
                    {
                        label: '测点点位',
                        prop: 'testPoint',
                        span: 8
                    },
                    {
                        label: '半径（m）',
                        prop: 'radius',
                        rules: [
                            {
                                required: true,
                                message: '请输入半径（m）',
                                trigger: ['blur', 'change']
                            }
                        ],
                        span: 8
                    },
                    {
                        label: '密度',
                        prop: 'density',
                        rules: [
                            {
                                required: true,
                                message: '请输入密度',
                                trigger: ['blur', 'change']
                            }
                        ],
                        span: 8
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
				grooveName: '',
				materialKey: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            myExportBtn: false,
            myImportBtn: false,
            fileInfo: '',
            uploadFileMsg: '',
            grooveTypeList: [],
            materialNameList: []
        }
    },
    created() {
        this.setOperate()
        this.getData()
        this.getMaterial()
        this.getGrooveType()
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
                    materialType: 'YL'
                })
                .then(res => {
                    this.materialNameList = res.data
                })
        },
        getGrooveType() {
            this.$api
                .commonDict({
                    entityCode: 'GROOVE_PARAMS', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'GROOVE_TYPE' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.grooveTypeList = res.data
                })
        },
        selectMaterial(val) {
            console.log(val)
            // this.form.materialName = val.materialName
            this.form.materialKey = val.materialId
        },
        getData() {
            this.loading = true
            this.$api
                .grooveList({
                    materialKey: this.form.materialKey, //原料标识（原料下拉选项中获取）
                    grooveName: this.form.grooveName, //槽名称
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
            this.form.materialKey = ''
            this.form.grooveName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            let params = {
                materialKey: this.form.materialKey, //原料标识（原料下拉选项中获取）
                grooveType: this.form.grooveType, //槽类型（业务字典提取）
                grooveName: this.form.grooveName, //槽名称
                bitNumber: this.form.bitNumber, //位号
                shape: this.form.shape, //形状
                neurogen: this.form.neurogen, //介质
                testPoint: this.form.testPoint, //测点点位
                radius: this.form.radius, //半径（m）
                density: this.form.density //密度
            }
            this.$api.grooveAdd(params).then(res => {
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
            let params = {
                id: form.id,
                materialKey: this.form.materialKey, //原料标识（原料下拉选项中获取）
                grooveType: this.form.grooveType, //槽类型（业务字典提取）
                grooveName: this.form.grooveName, //槽名称
                bitNumber: this.form.bitNumber, //位号
                shape: this.form.shape, //形状
                neurogen: this.form.neurogen, //介质
                testPoint: this.form.testPoint, //测点点位
                radius: this.form.radius, //半径（m）
                density: this.form.density //密度
            }
            this.$api.grooveEdit(params).then(res => {
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
            this.$confirm('确认是否删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api
                    .grooveDel({
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
        handleNext() {
            this.flag = true
            this.$refs.crud.rowSave()
        },
        searchChange(params, done) {
            this.form.grooveName = params.grooveName
            this.page1.currentPage = 1
            this.getData()
            done()
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
@import 'index.scss';
</style>
