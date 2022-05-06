<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>报警管理</el-breadcrumb-item>
                <el-breadcrumb-item>指标报警配置</el-breadcrumb-item>
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
                    <template slot="ssz" slot-scope="{ row }">
                        <div v-if="row.ssz > 80" class="num-red">{{ row.ssz }}</div>
                        <div v-else class="num-gray">{{ row.ssz }}</div>
                    </template>
                    <template slot="tagNameForm" slot-scope="{ type }">
                        <el-cascader
                            :options="options"
                            :props="{ checkStrictly: true }"
                            v-model="form.tagName"
                            clearable
                            :disabled="type == 'view' || type == 'edit'"
                            @change="changeTagName"
                        ></el-cascader>
                    </template>
                    <template slot="tagNameSearch" slot-scope="{}">
                        <el-cascader
                            :options="options"
                            :props="{ checkStrictly: true }"
                            v-model="form.pointLocation"
                            clearable
                            @change="changePT"
                        ></el-cascader>
                    </template>
                    <template slot="pointIdForm" slot-scope="{ type }">
                        <el-input
                            v-model="form.pointId"
                            placeholder="请输入 点位标识"
                            clearable
                            :disabled="type == 'view' || type == 'edit'"
                        ></el-input>
                    </template>
                    <template slot-scope="{ type }" slot="pointIdForm">
                        <el-select
                            v-model="form.pointId"
                            placeholder="请选择点位标识"
                            filterable
                            @change="selectPoint"
                            :disabled="type == 'view' || type == 'edit'"
                            clearable
                        >
                            <el-option
                                v-for="item in PointOption"
                                :key="item.dictId"
                                :label="item.dictId"
                                :value="item.dictId"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{}" slot="highLevelForm">
                        <el-select
                            v-model="form.highLevel"
                            placeholder="请选择高限等级"
                            filterable
                            @change="selectLevel"
                            clearable
                        >
                            <el-option
                                v-for="item in classOptions"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{}" slot="ultraHighLevelForm">
                        <el-select
                            v-model="form.ultraHighLevel"
                            placeholder="请选择超高限等级"
                            filterable
                            @change="selectLevel"
                            clearable
                        >
                            <el-option
                                v-for="item in classOptions"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{}" slot="lowLevelForm">
                        <el-select
                            v-model="form.lowLevel"
                            placeholder="请选择低限等级"
                            filterable
                            @change="selectLevel"
                            clearable
                        >
                            <el-option
                                v-for="item in classOptions"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
                            >
                            </el-option>
                        </el-select>
                    </template>
                    <template slot-scope="{}" slot="ultraLowLevelForm">
                        <el-select
                            v-model="form.ultraLowLevel"
                            placeholder="请选择超低限等级"
                            filterable
                            @change="selectLevel"
                            clearable
                        >
                            <el-option
                                v-for="item in classOptions"
                                :key="item.dictName"
                                :label="item.dictName"
                                :value="item.dictName"
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
            options: [

            ],
            addBtn: false,
            editBtn: false,
            viewBtn: false,
            delBtn: false,
            loading: false,
            flag: false,
            data: [],
            defaults: {},
            // 质量指标数据
            indexArr: [],
            option: {
                addBtn: false,
                editBtn: false,
                delBtn: false,
                viewBtn: false,
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
                        label: '点位位置',
                        prop: 'tagName',
                        overHidden: true,
                        width: 250,
                        display: false,
                        search: true
                    },
                    {
                        label: '点位标识',
                        prop: 'pointId',
                        display: false,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '点位名称',
                        prop: 'pointName',
                        display: false,
                        width: 150,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '报警阈值',
                        prop: 'dwbjyz',
                        align: 'center',
                        display: false,
                        children: [
                            {
                                label: '高限',
                                display: false,
                                prop: 'high'
                            },
                            {
                                label: '高限等级',
                                display: false,
                                prop: 'highLevel'
                            },
                            {
                                label: '超高限',
                                display: false,
                                prop: 'ultraHigh'
                            },
                            {
                                label: '超高限等级',
                                prop: 'ultraHighLevel',
                                display: false,
                                width: 120
                            },
                            {
                                label: '低限',
                                display: false,
                                prop: 'low'
                            },
                            {
                                label: '低限等级',
                                display: false,
                                prop: 'lowLevel'
                            },
                            {
                                label: '超低限',
                                display: false,
                                prop: 'ultraLow'
                            },
                            {
                                label: '超低限等级',
                                prop: 'ultraLowLevel',
                                display: false,
                                width: 120
                            }
                        ]
                    }
                ],
                group: [
                    {
                        label: '点位信息',
                        prop: 'dwxx',
                        icon: 'el-icon-map-location',
                        arrow: false,
                        column: [
                            {
                                label: '点位位置',
                                prop: 'tagName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择点位',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '点位标识',
                                prop: 'pointId',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入点位标识',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '点位名称',
                                prop: 'pointName',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入点位名称',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 8
                            },
                            {
                                label: '指标单位',
                                prop: 'unit',
                                span: 8
                            }
                        ]
                    },
                    {
                        label: '点位报警阈值',
                        prop: 'dwbjyz',
                        icon: 'el-icon-odometer',
                        arrow: false,
                        column: [
                            {
                                label: '高限',
                                prop: 'high',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入高限',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 6
                            },
                            {
                                label: '高限等级',
                                prop: 'highLevel',
                                span: 6
                            },
                            {
                                label: '超高限',
                                prop: 'ultraHigh',
                                span: 6
                            },
                            {
                                label: '超高限等级',
                                prop: 'ultraHighLevel',
                                span: 6
                            },
                            {
                                label: '低限',
                                prop: 'low',
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入低限',
                                        trigger: 'blur'
                                    }
                                ],
                                span: 6
                            },
                            {
                                label: '低限等级',
                                prop: 'lowLevel',
                                span: 6
                            },
                            {
                                label: '超低限',
                                prop: 'ultraLow',
                                span: 6
                            },
                            {
                                label: '超低限等级',
                                prop: 'ultraLowLevel',
                                span: 6
                            }
                        ]
                    },
                    {
                        label: '报警描述',
                        prop: 'bjms',
                        icon: 'el-icon-document',
                        arrow: false,
                        column: [
                            {
                                label: '指标范围',
                                prop: 'alarmRange',
                                span: 8
                            },
                            {
                                label: '异常判断标准',
                                prop: 'abnormalStandard',
                                span: 8
                            },
                            {
                                label: '事故判断标准',
                                prop: 'accidentStandard',
                                span: 8
                            },
                            {
                                label: '备注',
                                prop: 'remark',
                                type: 'textarea',
                                span: 24
                            }
                        ]
                    }
                ]
            },
            spanArr: [],
            form: {
                tagName: '', //分厂名称
                pointLocation: []
            },
            currentPoint: '',
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            PointOption: [],
            classOptions: []
        }
    },
    created() {
        this.getData()
        this.getAlarmLocationOption()
        // this.getFactory()
        // this.getData()
        this.getClassOption()
        this.setOperate()
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
        getAlarmLocationOption() {
            this.$api.alarmLocationOption().then(res => {
                this.options = res.data
            })
        },
        getData() {
            this.loading = true
			let params = {}
			console.log(this.form.pointLocation, '几点几十块')
			if(this.form.pointLocation == undefined){
				params = {
                    tagName: this.form.tagName,
                    pointId: this.form.pointId,
                    pointName: this.form.pointName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                }
			}else{
				params = {
                    factoryDictId: this.form.pointLocation[0] ? this.form.pointLocation[0] : '',
                    departmentDictId: this.form.pointLocation[1] ? this.form.pointLocation[1] : '',
                    workDictId: this.form.pointLocation[2] ? this.form.pointLocation[2] : '',
                    tagName: this.form.tagName,
                    pointId: this.form.pointId,
                    pointName: this.form.pointName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                }
			}
            this.$api
                .reportConfigList(params)
                .then(res => {
                    this.data = res.rows
                    this.loading = false
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.form.tagName = ''
            this.form.pointId = ''
            this.form.pointName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
        },
        handleSave(form, done, loading) {
            console.log(this.form)
            let params = {
                factoryDictId: this.form.tagName[0], //分厂字典标识（一级）
                departmentDictId: this.form.tagName[1] ? this.form.tagName[1] : '', //车间字典标识（二级）
                workDictId: this.form.tagName[2] ? this.form.tagName[2] : '', //工段字典标识（三级）
                pointId: this.form.pointId, //点位标识
                pointName: this.form.pointName, //点位名称
                ultraHigh: this.form.ultraHigh, //超高限
                ultraHighLevel: this.form.ultraHighLevel, //超高限等级
                high: this.form.high, //高限
                highLevel: this.form.highLevel, //高限等级
                low: this.form.low, //低限
                lowLevel: this.form.lowLevel, //低限等级
                ultraLow: this.form.ultraLow, //超低限
                ultraLowLevel: this.form.ultraLowLevel, //超低限等级
                unit: this.form.unit, //指标单位
                alarmRange: this.form.alarmRange, //指标范围
                abnormalStandard: this.form.abnormalStandard, //异常判定标准
                accidentStandard: this.form.accidentStandard, //事故判定标准
                remark: this.form.remark //备注
            }
            this.$api.reportConfigAdd(params).then(res => {
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
                pointName: this.form.pointName, //点位名称
                ultraHigh: this.form.ultraHigh, //超高限
                ultraHighLevel: this.form.ultraHighLevel, //超高限等级
                high: this.form.high, //高限
                highLevel: this.form.highLevel, //高限等级
                low: this.form.low, //低限
                lowLevel: this.form.lowLevel, //低限等级
                ultraLow: this.form.ultraLow, //超低限
                ultraLowLevel: this.form.ultraLowLevel, //超低限等级
                unit: this.form.unit, //指标单位
                alarmRange: this.form.alarmRange, //指标范围
                abnormalStandard: this.form.abnormalStandard, //异常判定标准
                accidentStandard: this.form.accidentStandard, //事故判定标准
                remark: this.form.remark //备注
            }
            this.$api.reportConfigEdit(params).then(res => {
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
                    .reportConfigDel({
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
            this.form.pointId = params.pointId
            this.form.pointName = params.pointName
            this.page1.currentPage = 1
            this.getData()
            done()
        },
        openDialog(done, type) {
            if (type == 'edit' || type == 'view') {
                if (this.form.departmentDictId != '' && this.form.workDictId == '') {
                    this.form.tagName = [this.form.factoryDictId, this.form.departmentDictId]
                } else if (this.form.workDictId != '' && this.form.departmentDictId != '') {
                    this.form.tagName = [
                        this.form.factoryDictId,
                        this.form.departmentDictId,
                        this.form.workDictId
                    ]
                } else if (this.form.factoryDictId != '') {
                    this.form.tagName = [this.form.factoryDictId]
                }
            }
            done()
        },
        dispose(row) {
            // console.log(row)
            this.$confirm('是否处理？', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
            })
                .then(() => {
                    console.log('处理')
                    this.$message.success('处理成功')
                })
                .catch(() => {})
        },
        changeTagName(val) {
            console.log(val)
            let id = ''
            if (val.length == 1) {
                id = val[0]
            } else if (val.length == 2) {
                id = val[1]
            } else if (val.length == 3) {
                id = val[2]
            }
            this.getPoint(id)
        },
        changePT(val) {
            console.log(val)
            console.log(this.form.pointLocation)
            /* if (val.length == 1) {
                this.currentPoint = val[0]
            } else if (val.length == 2) {
                this.currentPoint = val[1]
            } else if (val.length == 3) {
                this.currentPoint = val[2]
            } */
        },
        getPoint(id) {
            this.$api
                .alarmPointOption({
                    id
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.PointOption = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
        },
        selectPoint(val) {
            console.log(val)
        },
        getClassOption() {
            this.$api
                .commonDict({
                    entityCode: 'SIGNALTAB_CONFIG', //实体代码（参数从字典选项参照中获取）
                    fieldCode: 'HIGH_LEVEL' //属性代码（参数从字典选项参照中获取）
                })
                .then(res => {
                    this.classOptions = res.data
                })
        },
        selectLevel(val) {
            console.log(val)
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
@import './index.scss';
</style>
