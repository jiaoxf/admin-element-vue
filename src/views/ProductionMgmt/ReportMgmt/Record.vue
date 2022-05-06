<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>报警管理</el-breadcrumb-item>
                <el-breadcrumb-item>指标报警记录</el-breadcrumb-item>
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
                    <!-- <template slot="bjz" slot-scope="{ row }">
                        <div v-if="row.bjz > 80" class="num-red">{{ row.bjz }}</div>
                        <div v-else class="num-gray">{{ row.bjz }}</div>
                    </template> -->
                    <template slot="alarmType" slot-scope="{ row }">
                        <div v-if="row.alarmType === 'high'" class="text-orange">高限</div>
                        <div v-else-if="row.alarmType === 'low'" class="text-orange">低限</div>
                        <div v-else-if="row.alarmType === 'ultraHigh'" class="text-super">超高限</div>
                        <div v-else-if="row.alarmType === 'ultraLow'" class="text-super">超低限</div>
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
					<template slot="alarmTypeForm" slot-scope="{ }">
                        <div v-if="form.alarmType === 'high'" class="text-orange-form">高限</div>
                        <div v-else-if="form.alarmType === 'low'" class="text-orange-form">低限</div>
                        <div v-else-if="form.alarmType === 'ultraHigh'" class="text-super-form">超高限</div>
                        <div v-else-if="form.alarmType === 'ultraLow'" class="text-super-form">超低限</div>
                        <div v-else>-</div>
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
                column: [
                    {
                        label: '恢复时间',
                        prop: 'recoverTime',
                        width: 160
                    },
                    {
                        label: '告警类型',
                        prop: 'alarmType'
                    },
                    {
                        label: '指标等级',
                        prop: 'alarmLevel',
                        overHidden: true
                    },
                    {
                        label: '触发时间',
                        prop: 'triggerTime',
                        overHidden: true,
                        width: 160
                    },
                    {
                        label: '点位位置',
                        prop: 'pointLocation',
                        width: 230,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '点位标识',
                        prop: 'pointId',
                        search: true
                    },
                    {
                        label: '点位名称',
                        prop: 'pointName',
                        width: 150,
                        overHidden: true,
                        search: true
                    },
                    {
                        label: '报警值',
                        prop: 'realValue',
                        search: false
                    },
                    {
                        label: '指标单位',
                        prop: 'unit',
                        search: false
                    },
                    {
                        label: '指标范围',
                        prop: 'alarmRange',
                        search: false
                    },
                    {
                        label: '异常判定标准',
                        prop: 'abnormalStandard',
                        width: 120,
                        search: false
                    },
                    {
                        label: '事故判断标准',
                        prop: 'accidentStandard',
                        width: 120,
                        search: false
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
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
		this.setOperate()
        this.getAlarmLocationOption()
        /* this.getMaterial()
        this.getFactory()
        this.getData()
		this.setOperate() */
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
            this.$api.alarmInfoHistoryRecordList(params).then(res => {
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
            /* if (val.length == 1) {
                this.currentPoint = val[0]
            } else if (val.length == 2) {
                this.currentPoint = val[1]
            } else if (val.length == 3) {
                this.currentPoint = val[2]
            } */
        },
        searchChange(params, done) {
            console.log(params)
            this.form.pointId = params.pointId
            this.form.pointName = params.pointName
            this.page1.currentPage = 1
            this.getData()
            done()
        },
        viewProductIndex(projectId) {
            this.indexArr = []
            this.$api
                .getMaterialIndexForm({
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
                // this.getMaterialIndex(this.form.id)
                // this.viewProductIndex(this.form.id)
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
@import './index.scss';
</style>
