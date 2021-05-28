<template>
    <div class="component-moudle">
        组件描述：
        <br />
        form 表单
        <br />
        table 表格
        <br />
        icon 图标
        <br />
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    updated() {}, //生命周期 - 更新之后
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
