<template>
    <div class="">
        <div class="page-container">
            <div class="page-header">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>修改密码</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="page-body">
                <div style="width: 500px; margin: 0 auto">
                    <div class="page-table">
                        <avue-form
                            @submit="submitPassword"
                            v-model="form"
                            :option="option"
                        ></avue-form>
                    </div>
                </div>
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
        var validatePass = (rule, value, callback) => {
            var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,10000}/
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (!passwordreg.test(value)) {
                callback(new Error('密码长度不少于8位，且必须包含数字、大小写字母和特殊字符'))
            } else {
                callback()
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            form: {
                password: ''
            },
            option: {
                addBtn: false,
                emptyBtn: false,
                submitText: '修改',
                column: [
                    {
						required: true,
                        label: '新密码',
                        prop: 'password',
                        type: 'password',
                        span: 24,
                        rules: [{ validator: validatePass, trigger: 'blur' }]
                    },
                    {
						required: true,
                        label: '确认密码',
                        prop: 'oldpassword',
                        type: 'password',
						span: 24,
                        rules: [{ validator: validatePass2, trigger: 'blur' }]
                    }
                ]
            }
        }
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        submitPassword(form, done) {
            console.log(form)
            console.log(this.$store.state.user.userNid)
            this.$api
                .editPassword({
                    userNid: this.$store.state.user.userNid, //用户标识
                    userPwd: form.password //修改后的密码（密码长度不少于8位，且必须包含数字、大小写字母和特殊字符。）
                })
                .then(res => {
                    if (res.code == 'SUCCESS') {
                        this.$message.success('密码已修改，请重新登录。')
                        done()
                        this.$store.dispatch('user/logout')
                        setTimeout(() => {
                            this.$router.push('/login')
                        }, 1000)
                    } else {
                        this.$message.error(res.message)
                    }
                })
            /* this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

            }) */
        }
    },
    activated() {}
}
</script>
<style lang='scss' scoped>
/* @import ''; // 引入公共css类*/
</style>
