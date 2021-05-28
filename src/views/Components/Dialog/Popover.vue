<template>
    <div class="">
        <el-popover
            placement="top-start"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
            <el-button slot="reference">hover 激活</el-button>
        </el-popover>
        <el-popover
            class="ml-10"
            placement="bottom"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
            <el-button slot="reference">click 激活</el-button>
        </el-popover>

        <el-popover
            class="ml-10"
            ref="popover"
            placement="right"
            title="标题"
            width="200"
            trigger="focus"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        ></el-popover>
        <el-button v-popover:popover>focus 激活</el-button>

        <el-popover
            class="ml-10"
            placement="bottom"
            title="标题"
            width="200"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            v-model="visibleA"
        >
            <el-button slot="reference" @click="visibleA = !visibleA">手动激活</el-button>
        </el-popover>
        <el-popover class="ml-10" placement="top" width="160" v-model="visible">
            <p>这是一段内容这是一段内容确定删除吗？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
            visible: false,
            visibleA: false,
        };
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {},
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
