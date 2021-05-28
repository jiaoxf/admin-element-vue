<template>
    <div class="element-container">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16" class="component-content">
                <div class="content-box">
                    <el-divider content-position="left">
                        表单抽屉
                        <a target="_blank" href="https://element.eleme.cn/#/zh-CN/component/drawer">
                            文档
                        </a>
                    </el-divider>
                    <el-button type="text" @click="openDrawer('add')">
                        新增嵌套 Form 的 Drawer
                    </el-button>
                    <el-button type="text" @click="openDrawer('edit')">
                        编辑嵌套 Form 的 Drawer
                    </el-button>
                    <form-drawer
                        ref="drawer"
                        :rules="rules"
                        :drawerFormVisible="drawerFormVisible"
                        :formEditType="formEditType"
                        :searchData="formData"
                        :formLabel="formLabel"
                        @validateTrue="validateTrue"
                        @validateFalse="validateFalse"
                        @closeDrawerFunc="closeDrawer"
                    ></form-drawer>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import FormDrawer from './FormDrawer';
export default {
    name: 'name',
    props: {},
    components: {
        FormDrawer,
    },
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            } else {
                callback();
            }
        };
        return {
            drawerFormVisible: false,
            formEditType: 'edit',
            formWidth: 'line', // line: 竖排布局    不传参则是并列排版
            rules: {
                userName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
                userIdentity: [{ required: true, message: '请输入用户身份', trigger: 'blur' }],
                userPassword: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
                userPermissions: [{ required: true, message: '请输入用户权限', trigger: 'blur' }],
                userGroup: [{ required: true, message: '请选择用户群组', trigger: 'blur' }],
                phoneNumber: [{ required: true, message: '请输入用户手机号', trigger: 'blur' }],
                ageNum: [{ validator: checkAge, trigger: 'blur', required: true }],
            },
            formData: {
                userName: '',
                userIdentity: '',
                userPassword: '',
                userPermissions: '',
                userGroup: '',
                phoneNumber: '',
                description: '',
                ageNum: '',
            },
            formLabel: [
                {
                    type: 'Input',
                    label: '用户姓名',
                    prop: 'userName',
                    width: '120px',
                    disabled: false,
                    isFormItemShow: true,
                },
                {
                    type: 'Input',
                    label: '用户身份',
                    prop: 'userIdentity',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'Input',
                    label: '用户密码',
                    prop: 'userPassword',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'Input',
                    label: '用户权限',
                    prop: 'userPermissions',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'Select',
                    label: '用户分组',
                    prop: 'userGroup',
                    width: '120px',
                    props: [],
                    change: row => {
                        this.selectVal(row); // 请求下拉框接口数据
                    },
                    isFormItemShow: true,
                },
                {
                    type: 'Input',
                    label: '用户手机号',
                    prop: 'phoneNumber',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'Input',
                    label: '年龄',
                    prop: 'ageNum',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'TextArea',
                    label: '文件描述',
                    prop: 'description',
                    width: '120px',
                    isFormItemShow: true,
                },
                {
                    type: 'Radio',
                    label: '性别',
                    prop: 'sex',
                    width: '120px',
                    props: [
                        {
                            label: '男',
                            value: '1',
                        },
                        {
                            label: '女',
                            value: '2',
                        },
                    ],
                    isFormItemShow: true,
                },
            ],
        };
    },
    created() {},
    mounted() {
        this.selectVal();
    },
    computed: {},
    watch: {},
    methods: {
        openDrawer(text) {
            this.formEditType = text;
            this.drawerFormVisible = true;
        },
        selectVal(row) {
            console.log(row);
            let selectList = [
                {
                    label: '第一项',
                    value: 1,
                },
                {
                    label: '第二项',
                    value: 2,
                },
            ];
            this.roleList = selectList;
            this.formLabel.forEach(item => {
                if (item.props && item.props.length === 0) {
                    item.props = this.roleList;
                }
            });
        },
        validateTrue(data) {
            if (this.formEditType === 'add') {
                this.$message({
                    message: '这是表单提交的数据' + JSON.stringify(data),
                    type: 'success',
                });
                this.addInfo(data);
            } else if (this.formEditType === 'edit') {
                this.$message({
                    message: '这是表单提交的数据' + JSON.stringify(data),
                    type: 'success',
                });
                this.editInfo(data);
            }
            this.drawerFormVisible = false;
        },
        addInfo(infoData) {
            console.log(infoData);
            console.log(this.$children);
        },
        editInfo(infoData) {
            console.log(infoData);
        },
        validateFalse() {
            this.drawerFormVisible = true;
        },
        closeDrawer(newdrawerFormVisible) {
            this.drawerFormVisible = newdrawerFormVisible;
        },
        openMessage() {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
