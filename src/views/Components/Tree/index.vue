<template>
    <div class="">
        <div class="element-container">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="component-content">
                    <div class="content-box">
                        <el-divider content-position="left">
                            简单树形结构
                            <a
                                target="_blank"
                                href="https://element.eleme.cn/#/zh-CN/component/tree"
                            >
                                文档
                            </a>
                        </el-divider>
                        <SimplenessTree />
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="component-content">
                    <div class="content-box">
                        <el-divider content-position="left">
                            复杂树形结构
                            <a
                                target="_blank"
                                href="https://element.eleme.cn/#/zh-CN/component/tree"
                            >
                                文档
                            </a>
                        </el-divider>
                        <ComplexTree />
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import ComplexTree from './ComplexTree';
import SimplenessTree from './SimplenessTree';
export default {
    name: 'Tree',
    props: {},
    components: {
        ComplexTree,
        SimplenessTree,
    },
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="scss" scoped></style>
