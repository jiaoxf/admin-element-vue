<template>
    <div class="step-component">
        <el-steps
            :active="stepActive"
            :direction="faDirection"
            :space="faSpace"
            :finish-status="faSuccess"
            :align-center="textAlign"
            :simple="faSimple"
        >
            <el-step
                :title="item.title"
                :description="item.description"
                :icon="item.icon"
                v-for="item in stepInfo"
                :key="item.title"
            ></el-step>
        </el-steps>
    </div>
</template>
<script>
export default {
    name: 'step-component',
    props: {
        stepActive: {
            type: Number,
            default: 1,
        },
        faDirection: {
            type: String,
            default: 'horizontal',
        },
        faSimple: {
            type: Boolean,
            default: false,
        },
        faSpace: {
            type: String,
            default: '',
        },
        textAlign: {
            type: Boolean,
            default: true,
        },
        faSuccess: {
            type: String,
            default: 'finish',
        },
        stepInfo: {
            type: Array,
            default: () => {
                return Array;
            },
        },
    },
    components: {},
    data() {
        return {
            active: 0,
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
.el-steps {
    margin: 20px 0;
}
</style>
