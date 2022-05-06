<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>报警管理</el-breadcrumb-item>
                <el-breadcrumb-item>指标报警信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-table">
                <avue-crud
                    ref="crud"
                    :option="option"
                    :data="data"
                    v-model="form"
                    @search-change="searchChange"
                    @current-change="currentChange"
                    :page.sync="page1"
                    @search-reset="resetData"
                    :before-open="openDialog"
                    :table-loading="loading"
                >
                    <!-- <template slot-scope="{ row }" slot="menu">
                        <el-button icon="el-icon-edit-outline" type="text" @click="dispose(row)"
                            >处理</el-button
                        >
                    </template> -->
                    <template slot="alarmType" slot-scope="{ row }">
                        <div v-if="row.alarmType === 'high'" class="text-orange">高限</div>
                        <div v-else-if="row.alarmType === 'low'" class="text-orange">低限</div>
                        <div v-else-if="row.alarmType === 'ultraHigh'" class="text-super">
                            超高限
                        </div>
                        <div v-else-if="row.alarmType === 'ultraLow'" class="text-super">
                            超低限
                        </div>
                        <div v-else>-</div>
                    </template>
                    <template slot="alarmTypeForm" slot-scope="{}">
                        <div v-if="form.alarmType === 'high'" class="text-orange-form">高限</div>
                        <div v-else-if="form.alarmType === 'low'" class="text-orange-form">
                            低限
                        </div>
                        <div v-else-if="form.alarmType === 'ultraHigh'" class="text-super-form">
                            超高限
                        </div>
                        <div v-else-if="form.alarmType === 'ultraLow'" class="text-super-form">
                            超低限
                        </div>
                        <div v-else>-</div>
                    </template>
                    <template slot="pointLocationSearch" slot-scope="{}">
                        <el-cascader
                            :options="options"
                            :props="{ checkStrictly: true }"
                            v-model="form.pointLocation"
                            clearable
                            @change="changePT"
                        ></el-cascader>
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
                        label: '告警类型',
                        prop: 'alarmType',
                        display: false
                    },
                    {
                        label: '指标等级',
                        prop: 'alarmLevel',
                        display: false,
                        overHidden: true
                    },
                    {
                        label: '触发时间',
                        prop: 'triggerTime',
                        overHidden: true,
                        display: false,
                        width: 160
                    },
                    {
                        label: '点位位置',
                        prop: 'pointLocation',
                        width: 230,
                        display: false,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '点位标识',
                        prop: 'pointId',
                        width: 100,
                        display: false,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '点位名称',
                        prop: 'pointName',
                        width: 150,
                        overHidden: true,
                        display: false,
                        search: true
                    },
                    {
                        label: '实时值',
                        prop: 'realValue',
                        display: false,
                        search: false
                    },
                    {
                        label: '指标单位',
                        prop: 'unit',
                        display: false,
                        search: false
                    },
                    {
                        label: '指标范围',
                        prop: 'alarmRange',
                        display: false,
                        search: false
                    },
                    {
                        label: '异常判定标准',
                        prop: 'abnormalStandard',
                        display: false,
                        width: 120,
                        search: false
                    },
                    {
                        label: '事故判断标准',
                        prop: 'accidentStandard',
                        display: false,
                        width: 120,
                        search: false
                    }
                ],
                group: [
                    {
                        label: '告警信息',
                        prop: 'gjxx',
                        icon: 'el-icon-document-copy',
                        arrow: false,
                        column: [
                            {
                                label: '触发时间',
                                prop: 'triggerTime',
                                span: 8
                            },
                            {
                                label: '告警类型',
                                prop: 'alarmType',
                                span: 8
                            },
                            {
                                label: '告警等级',
                                prop: 'alarmLevel',
                                span: 8
                            },
                            {
                                label: '点位位置',
                                prop: 'pointLocation',
                                span: 8
                            },
                            {
                                label: '点位标识',
                                prop: 'pointId',
                                span: 8
                            },
                            {
                                label: '点位名称',
                                prop: 'pointName',
                                span: 8
                            },
                            {
                                label: '实时值',
                                prop: 'realValue',
                                span: 8
                            },
                            {
                                label: '指标单位',
                                prop: 'unit',
                                span: 8
                            },
                            {
                                label: '指标范围',
                                prop: 'alarmRange',
                                span: 8
                            },
                            {
                                label: '异常判定标准',
                                prop: 'abnormalStandard',
                                span: 8
                            },
                            {
                                label: '事故判定标准',
                                prop: 'accidentStandard',
                                span: 8
                            }
                        ]
                    },
                    {
                        label: '告警阈值',
                        prop: 'gjyz',
                        icon: 'el-icon-odometer',
                        arrow: false,
                        column: [
                            {
                                label: '高限',
                                prop: 'high',
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
                    }
                ]
            },
            spanArr: [],
            form: {
                factoryName: '', //分厂名称
                materialName: '',
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
            materialNameList: [],
            indexStr: '',
            productIndexList: [],
            options: []
        }
    },
    created() {
        this.getData()
        this.getAlarmLocationOption()
		setOperate()
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
            if (this.form.pointLocation == undefined) {
                params = {
                    pointId: this.form.pointId,
                    pointName: this.form.pointName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                }
            } else {
                params = {
                    factoryDictId: this.form.pointLocation[0] ? this.form.pointLocation[0] : '',
                    departmentDictId: this.form.pointLocation[1] ? this.form.pointLocation[1] : '',
                    workDictId: this.form.pointLocation[2] ? this.form.pointLocation[2] : '',
                    pointId: this.form.pointId,
                    pointName: this.form.pointName,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                }
            }
            this.$api.alarmInfoList(params).then(res => {
                this.data = res.rows
                this.loading = false
                this.page1.total = res.total
            })
        },
        resetData() {
            this.form.pointLocation = ''
            this.form.pointId = ''
            this.form.pointName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
        },
        changePT(val) {
            console.log(val)
            console.log(this.form.pointLocation)
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
            console.log(this.form.id)
            if (['view', 'edit'].includes(type)) {
                this.getViewData(this.form.id)
            }
            done()
        },
        getViewData(id) {
            this.$api
                .alarmInfoView({
                    id: id
                })
                .then(res => {
					this.form.high = res.data.high || '-'//高限等级
                    this.form.highLevel = res.data.highLevel || '-'//高限等级
                    this.form.ultraLowLevel = res.data.ultraLowLevel || '-' //超低限等级
                    this.form.lowLevel = res.data.lowLevel || '-'
					this.form.ultraHigh = res.data.ultraHigh || '-'//超高限值
					this.form.low = res.data.low || '-'//低限值
					this.form.ultraHighLevel = res.data.ultraHighLevel || '-'//超高限等级
					this.form.ultraLow = res.data.ultraLow || '-'//超低限值
                })
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
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
@import './index.scss';
</style>
