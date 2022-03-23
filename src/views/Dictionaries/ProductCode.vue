<template>
    <div class="page-container">
        <div class="page-header">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
                <el-breadcrumb-item>产品编码</el-breadcrumb-item>
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
			loading:true,
            flag: false,
            data: [],
            option: {
                size: 'mini',
                labelWidth: 150,
                border: true,
                columnBtn: false,
                refreshBtn: false,
                searchShowBtn: false,
                // viewBtn: true,
                searchMenuSpan: 6,
                row: true,
                span: 24,
                dialogWidth: '40%',
                menuSpan: 12,
                index: true,
                indexLabel: '序号',
                column: [
                    {
                        label: '产品名称',
                        prop: 'productName',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品名称',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true
                    },
                    {
                        label: '产品编码',
                        prop: 'productId',
                        rules: [
                            {
                                required: true,
                                message: '请输入产品编码',
                                trigger: ['blur', 'change']
                            }
                        ],
                        search: true
                    }
                ]
            },
            spanArr: [],
            // 合并单元格的
            key: 'name',
            form: {
                productName: '',
                productId: ''
            },
            page1: {
                currentPage: 1,
                total: 0,
                layout: 'total,prev,pager, next, jumper',
                pageSize: 20
            }
        }
    },
    created() {
        this.getData()
    },
    mounted() {
        console.log(this.$api)
    },
    computed: {},
    watch: {},
    methods: {
        getData() {
			this.loading = true
            this.$api
                .productCodeList({
                    productId: this.form.productId,
                    productName: this.form.productName,
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
            this.form.productId = ''
            this.form.productName = ''
            this.page1.currentPage = 1
            this.getData()
        },
        currentChange(val) {
            this.page1.currentPage = val
            this.getData()
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
            this.$confirm('确认是否删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$api
                        .productCodeDel({
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
            this.page1.currentPage = 1
            this.form = params
            this.getData()
            done()
        }
    }
}
</script>
<style lang="scss" scoped>
/* @import ''; // 引入公共css类*/
</style>
