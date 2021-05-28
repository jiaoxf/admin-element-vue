<template>
    <div class="icon-font" :style="{ padding: paddingSize }">
        <svg class="icon" aria-hidden="true" :style="[iconStyle]">
            <use :xlink:href="iconTag"></use>
            <!-- <use xlink:href="#icon-caidan"></use> -->
        </svg>
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {
        name: {
            type: String,
            default: '',
        },
        paddingSize: {
            type: String,
        },
        iconStyle: {
            type: Object,
            default: () => {
                return {
                    width: '2rem',
                    height: '2rem',
                };
            },
        },
    },
    components: {},
    data() {
        return {};
    },
    //监听属性 类似于data概念
    computed: {
        iconTag() {
            return `#icon-${this.name}`;
        },
    },
    //监控data中的数据变化
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.icon-font {
    display: inline-block;
    padding: 20px;
    .icon {
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
}
</style>
