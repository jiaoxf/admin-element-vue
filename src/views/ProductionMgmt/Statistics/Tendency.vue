<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>生产统计</el-breadcrumb-item>
                <el-breadcrumb-item>统计趋势</el-breadcrumb-item>
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
                    :table-loading="loading"
                >
                    <template slot="monthFinishRate" slot-scope="{ row }">
                        {{ Number(row.monthFinishRate * 100).toFixed(2) }}%
                    </template>
                    <template slot-scope="{}" slot="planTimeSearch">
                        <el-date-picker
                            v-model="form.planTime"
                            type="month"
                            placeholder="选择生产月度"
                            format="yyyy-MM"
                            value-format="yyyy-MM"
                            clearable
                        >
                        </el-date-picker>
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
            departmentList: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                searchLabelWidth: 90,
                row: true,
                addBtn: false,
                menu: false,
                menuWidth: 300,
                span: 12,
                searchShowBtn: false,
                searchMenuSpan: 6,
                dialogWidth: '80%',
                menuSpan: 4,
                searchSpan: 6,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '车间名称',
                        prop: 'departmentName',
                        disabled: true,
                        search: false,
                        width: 120,
                        rules: [
                            {
                                required: true,
                                message: '请输入生产车间',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '产品名称',
                        prop: 'productName',
                        width: 120,
                        search: false,
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '全年计划目标',
                        prop: 'yearTarget',
                        width: 120
                    },
                    {
                        label: '全年已完成',
                        prop: 'yearYield',
                        search: false,
                        width: 120
                    },
                    {
                        label: '年计划完成率',
                        prop: 'productionDate',
                        search: false,
                        width: 120
                    },
                    {
                        label: '月计划目标',
                        prop: 'monthTarget',
                        width: 120
                    },

                    {
                        label: '月实物量',
                        prop: 'monthYield',
                        search: false
                    },
                    {
                        label: '合格',
                        prop: 'yieldEligible',
                        search: false
                    },
                    {
                        label: '定向销售',
                        prop: 'yieldSelling',
                        rules: [
                            {
                                required: true,
                                message: '请输入产量',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '不合格',
                        prop: 'yieldDefective',
                        disabled: true,
                        rules: [
                            {
                                required: true,
                                message: '请输入',
                                trigger: ['change', 'blur']
                            }
                        ]
                    },
                    {
                        label: '破包',
                        prop: 'yieldBalebroken',
                        disabled: true
                    },
                    {
                        label: '月计划完成率',
                        prop: 'monthFinishRate',
                        width: 120
                    },
                    {
                        label: '生产月度',
                        prop: 'planTime',
                        disabled: true,
                        hide: true,
                        search: true
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                productName: '', //产品名称
                departmentCode: '', //车间代码
                workingShift: '', //生产班次
                productBatch: '', //生产批次
                batchNumber: '', //批次号
                beginDate: '', //生产日期起
                endDate: '', //生产日期止
                time: [],
                planTime: this.getCurrentDay(new Date())
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
            searchInfo: {}
        }
    },
    created() {
        let myDate = new Date()
        let month = `${myDate.getFullYear()}-${(myDate.getMonth() + 1).toString().padStart(2, '0')}`
        this.getData(month)
    },
    mounted() {
        this.setOperate()
        // this.form.planTime = this.timeDefault
    },
    computed: {},
    watch: {},
    methods: {
        setOperate() {
            let result = this.$utils.getOperate(this.$route.meta.id)
            result.then(res => {
                console.log(res)
                /* this.permission = {
                    delBtn: false,
                    addBtn: false,
					viewBtn: false
                } */
                let resultList = [
                    {
                        operName: '导入', //操作名称
                        operCode: 'import' //操作代码
                    },
                    {
                        operName: '新增', //操作名称
                        operCode: 'add' //操作代码
                    },
                    {
                        operName: '编辑', //操作名称
                        operCode: 'edit' //操作代码
                    },
                    {
                        operName: '导出', //操作名称
                        operCode: 'export' //操作代码
                    },
                    {
                        operName: '删除', //操作名称
                        operCode: 'delete' //操作代码
                    },
                    {
                        operName: '查看', //操作名称
                        operCode: 'view' //操作代码
                    }
                ]
                let btnList = []
                resultList.forEach(element => {
                    btnList.push(element.operCode)
                })
                btnList.indexOf('add') > -1 ? (this.myAddBtn = true) : (this.myAddBtn = false) // 新增按钮
                btnList.indexOf('edit') > -1 ? (this.myEditBtn = true) : (this.myEditBtn = false) // 编辑按钮
                btnList.indexOf('delete') > -1
                    ? (this.myDeleteBtn = true)
                    : (this.myDeleteBtn = false) // 删除按钮
                btnList.indexOf('view') > -1 ? (this.myViewBtn = true) : (this.myViewBtn = false) // 查看按钮
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
        getData(month) {
            let yearMonth = ''
            if (month) {
                yearMonth = month
            } else {
                yearMonth = this.form.planTime
            }
            this.loading = true
            this.$api
                .statisticsYieldList({
                    planTime: yearMonth,
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.loading = false
                    this.data = res.rows
                    this.page1.total = res.total
                })
        },
        resetData() {
            this.form.planTime = this.getCurrentDay(new Date())
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
        searchChange(params, done) {
            console.log(params)

            this.page1.currentPage = 1
            this.getData()
            done()
        },
        getCurrentDay(obj) {
            var date = new Date()
            var month = date.getMonth() + 1
            var strDate = date.getDate()
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            var currentdate = date.getFullYear() + '-' + month
            return currentdate
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
