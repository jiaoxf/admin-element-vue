<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/productionPlanMgmt/productionYear' }"
                    >生产计划管理</el-breadcrumb-item
                >
                <el-breadcrumb-item>月生产计划</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-body">
            <div class="page-form">
                <el-form :model="form" class="demo-form-inline" label-width="100px">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="时间（年月）:">
                                <el-date-picker
                                    v-model="form.planTime"
                                    type="month"
                                    placeholder="时间（年月）"
                                    value-format="yyyy-MM"
                                    style="width: 100%"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label-width="60px" label="名称:">
                                <el-input
                                    v-model="form.planName"
                                    placeholder="请输入名称"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label-width="80px" label="版本号:">
                                <el-input
                                    v-model="form.version"
                                    placeholder="版本号"
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="更新日期:">
                                <el-date-picker
                                    style="width: 100%"
                                    v-model="form.time"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    clearable
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="mb-10">
                            <el-button type="primary" icon="el-icon-search" @click="searchChange"
                                >搜索</el-button
                            >
                            <el-button icon="el-icon-delete" @click="resetData">清空</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <avue-crud
                ref="crud"
                :option="option"
                :data="data"
                v-model="form"
                @row-save="handleSave"
                @row-update="handleUpdate"
                @current-change="currentChange"
                :page.sync="page1"
				:table-loading="loading"
            >
                <template slot-scope="{ type, size }" slot="menuLeft">
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        :size="size"
                        @click="pushDetail('add')"
                    >
                        新增</el-button
                    >
                </template>
                <template slot-scope="{ row, type, size }" slot="menu">
                    <el-button
                        type="text"
                        icon="el-icon-view"
                        :size="size"
                        @click="pushDetail('view', row)"
                        >查看</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-edit"
                        :size="size"
                        @click="pushDetail('edit', row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="text"
                        icon="el-icon-delete"
                        :size="size"
                        @click="handleDel(row)"
                        >删除</el-button
                    >
                </template>
            </avue-crud>
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
            data: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                viewBtn: true,
                row: true,
                span: 12,
                addBtn: false,
                viewBtn: false,
                editBtn: false,
                delBtn: false,
                searchShowBtn: false,
                searchMenuSpan: 6,
                dialogWidth: '80%',
                menuSpan: 4,
                index: true,
                indexLabel: '序号',
                // addBtn: false,
                column: [
                    {
                        label: '时间（年月）',
                        prop: 'planMonth',
                        search: false
                    },
					{
                        label: '分厂名称',
                        prop: 'factoryName',
                        display: false
                    },
                    {
                        label: '名称',
                        prop: 'planName',
                        display: false,
						width: 200,
						overHidden: true
                    },
                    {
                        label: '版本号',
                        prop: 'version',
                        display: false
                    },
                    {
                        label: '更新时间',
                        prop: 'createDate',
                        display: false,
						overHidden: true
                    }
                ]
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            },
            form: {
                planTime: '', //计划时间（年月）
                planName: '', //计划名称
                version: '', //计划版本
                beginDate: '', //更新时间起
                endDate: '', //更新时间止
                time: ''
            }
        }
    },
    created() {},
    mounted() {
        this.getData()
		this.setOperate()
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
        getData() {
			this.loading = true
            this.$api
                .monthPlanList({
                    planTime: this.form.planTime, //计划时间（年）
                    planName: this.form.planName, //计划名称
                    version: this.form.version, //计划版本
                    beginDate: this.form.time ? this.form.time[0] : '', //更新时间起
                    endDate: this.form.time ? this.form.time[1] : '', //更新时间止
                    currPage: this.page1.currentPage,
                    pageSize: 20
                })
                .then(res => {
                    this.data = res.rows
					this.loading = false
                    this.page1.total = res.total
                })
        },
        searchChange(params) {
            this.page1.currentPage = 1
            console.log(this.form)
            this.getData()
        },
        resetData() {
            this.form.planTime = ''
            this.form.planName = ''
            this.form.version = ''
            this.form.beginDate = ''
            this.form.endDate = ''
            this.form.time = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getList()
        },
        handleSave(form, done, loading) {
            this.$api
                .productCodeAdd({
                    productId: form.productId,
                    productName: form.productName
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
        handleUpdate(form, index, done, loading) {
            this.$api
                .productCodeEdit({
                    id: form.id,
                    productId: form.productId,
                    productName: form.productName
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
            console.log(form)
            this.$confirm('确认是否删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api
                    .monthPlanDel({
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
        pushDetail(type, row) {
            console.log(type, row)
            if (type == 'add') {
                this.$router.push({
                    path: '/monthDetail'
                })
                sessionStorage.setItem('monthStatus', type)
            } else {
                this.$router.push({
                    path: '/monthDetail',
                    query: {
                        status: type
                    }
                })
                sessionStorage.setItem('monthStatus', type)
                sessionStorage.setItem('monthInfo', JSON.stringify(row))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
