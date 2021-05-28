<template>
    <div class="header">
        <el-header>
            <div class="unfold">
                <i
                    class="unfold-icon"
                    :class="[$store.state.foldMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                    @click="flagFold"
                ></i>
            </div>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#fff"
                text-color="#3D80FF"
                active-text-color="#3D80FF"
            >
                <template v-for="item in $router.options.routes">
                    <router-link
                        v-if="
                            item.children.length === 1 &&
                                !item.children[0].children &&
                                !item.alwaysShow
                        "
                        :to="'/' + item.children[0].path"
                        :key="item.children[0].name"
                    >
                        <el-menu-item index="2">
                            <span
                                slot="title"
                                v-if="item.children[0].meta && item.children[0].meta.title"
                            >
                                {{ item.children[0].meta.title }}
                            </span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu v-else :index="item.name || item.path" :key="item.name">
                        <template slot="title">
                            <span slot="title" v-if="item.meta && item.meta.title">
                                {{ item.meta.title }}
                            </span>
                        </template>
                        <el-menu-item v-for="(child, i) in item.children" :key="i">
                            <span
                                slot="title"
                                :is-nest="true"
                                class="nest-menu"
                                v-if="child.children && child.children.length > 0"
                                :routes="[child]"
                                :key="child.path"
                            ></span>
                            <router-link :to="item.path + '/' + child.path" :key="child.name">
                                <el-menu-item :index="item.path + '/' + child.path">
                                    <span slot="title" v-if="child.meta && child.meta.title">
                                        {{ child.meta.title }}
                                    </span>
                                </el-menu-item>
                            </router-link>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-header>
    </div>
</template>
<script>
export default {
    name: 'Header',
    props: {},
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        return {
            activeIndex: '1',
            isCollapse: true,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        flagFold() {
            this.$store.commit('flodMenu');
        },
    },
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
@import '@/scss/_var';
::v-deep.el-header {
    display: flex;
    padding: 0;
    width: 100%;
    position: fixed;
    top: 0px;
    background: #fff;
    z-index: 999;
}
::v-deep.el-menu-demo {
    display: flex;
    justify-content: center;
}
::v-deep.el-menu--horizontal a {
    & > .el-menu-item {
        float: left;
        height: 60px;
        line-height: 60px;
        margin: 0;
    }
    & > .el-menu-item.is-active {
        border-bottom: 2px solid #1890ff;
    }
}

.header {
    background: #fff;

    .unfold {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
        .unfold-icon {
            /* color: #fff; */
            font-size: 1.5em;
            cursor: pointer;
        }
    }
}
</style>
