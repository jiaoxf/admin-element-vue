<template>
    <div class="setp-content">
        第一步
        <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
    </el-form> -->
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
            needRule: true, // 是否需要验证字段
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                ],
            },
        };
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        validateForm() {
            let flag = null;
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    flag = true;
                } else {
                    flag = false;
                }
            });
            return flag;
        },
    },
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.setp-content {
    padding: 20px;
}
</style>
