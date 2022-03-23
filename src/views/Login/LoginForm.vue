<template>
    <div class="margin-auto login-form-box">
        <h2>用户登录</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userId">
                <el-input
                    v-model="ruleForm.userId"
                    size="primary"
                    placeholder="请输入用户名"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
                <el-input
                    type="password"
                    v-model="ruleForm.userPwd"
                    size="primary"
                    placeholder="请输入密码"
                    clearable
                ></el-input>
            </el-form-item>
            <el-form-item style="margin-top: 40px">
                <el-button
                    size="primary"
                    style="width: 100%"
                    type="primary"
                    @click="submitForm('ruleForm')"
                    >登录</el-button
                >
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
            ruleForm: {
                userId: '',
                userPwd: ''
            },
            rules: {
                userId: [
                    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] }
                ],
                userPwd: { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
            }
        }
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$store
                        .dispatch('user/login', this.ruleForm)
                        .then((res) => {
							this.$message.success(res.message)
							this.$router.push('/')
                            // this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>
<style lang="scss" scoped>
.login-form-box {
    padding: 1rem;
    margin-left: 4rem;
    h2 {
        text-align: left;
        font-size: 26px;
        line-height: 34px;
        margin-bottom: 0.75rem;
        font-weight: 700;
    }
    ::v-deep {
        .el-form {
            width: 400px;
            .el-form-item__content {
                .el-input {
                    input {
                        border-radius: 4px;
                    }
                }
            }
        }
    }
}
</style>
