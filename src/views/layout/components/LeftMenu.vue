<template>
    <div class="left-aside">
        <el-aside width="100%" height="100%" class="sidebar-container">
            <el-scrollbar wrap-class="scrollbar-wrapper">
                <el-menu
                    v-if="menuList"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    :default-active="activeMenu"
                    background-color="#0062ab"
                    text-color="#fff"
                    active-text-color="#0099FF"
                    @close="handleClose"
                    :collapse-transition="false"
                    mode="vertical"
					unique-opened
                    :collapse="$store.state.app.foldMenu"
                >
                    <div class="header-title">
                        <div class="header-title-logo">
                            <img src="../../../assets/logo.png" alt="" />
                        </div>
                        <span class="header-title-text">龙蟒大地MES系统</span>
                    </div>
                    <sidebar-item
                        v-for="(route, index) in permission_routes"
                        :key="index"
                        :item="route"
                        :base-path="route.path"
                    />
                </el-menu>
            </el-scrollbar>
        </el-aside>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem.vue'

export default {
    name: 'name',
    props: {},
    components: {
        SidebarItem
    },
    data() {
        return {
            // isCollapse: true,
            menuList: []
        }
    },
    computed: {
        ...mapGetters(['permission_routes']),
        /* routes() {
            return this.$store.getters.permission_routes
        }, */
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        }
    },

    watch: {
        '$router.options.routes': function(options) {
            console.log(n)
        }
    },
    //方法集合
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath)
        }
    },
    created() {},
    mounted() {
        let list = [
            {
                id: 1000100020002,
                pid: 100010002,
                path: '/productionPlanMgmt',
                name: 'ProductionPlanMgmt',
                component: 'layout',
                redirect: '',
                hidden: 'false',
                meta: {
                    title: '生产计划管理',
                    icon: 'shengchanjihua'
                },
                children: [
                    {
                        id: 10001000200020000,
                        pid: 1000100020002,
                        path: '/productionYear',
                        name: 'ProductionYear',
                        component: 'ProductionMgmt/ProductionPlan/Year',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '年生产计划',
                            icon: 'yewuniandu'
                        },
                        children: [
                            {
                                path: '/productionYear',
                                name: 'ProductionYear',
                                component: 'ProductionMgmt/ProductionPlan/Year',
                                redirect: '',
                                hidden: 'false',
                                meta: {
                                    title: '年生产计划',
                                    icon: 'yewuniandu'
                                }
                            }
                        ]
                    },
                    {
                        id: 10001000200020002,
                        pid: 1000100020002,
                        path: 'productionMonth',
                        name: 'ProductionMonth',
                        component: 'ProductionMgmt/ProductionPlan/Month',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '月生产计划',
                            icon: 'yue'
                        },
                        children: []
                    }
                ]
            },
            {
                id: 1000100020003,
                pid: 100010002,
                path: '/commandDispatch',
                name: 'CommandDispatch',
                component: 'layout',
                redirect: '/commandDispatch/instruct',
                hidden: 'false',
                meta: {
                    title: '生产指挥调度',
                    icon: 'zhihuitiaodu'
                },
                children: [
                    {
                        id: 10001000200030000,
                        pid: 1000100020003,
                        path: 'classify',
                        name: 'Classify',
                        component: 'ProductionMgmt/CommandDispatch/Classify',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '指令分类',
                            icon: 'fenlei'
                        },
                        children: []
                    },
                    {
                        id: 10001000200030002,
                        pid: 1000100020003,
                        path: 'instruct',
                        name: 'Instruct',
                        component: 'ProductionMgmt/CommandDispatch/Instruct',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '调度指令',
                            icon: 'zhilingguanli'
                        },
                        children: []
                    }
                ]
            },
            {
                id: 1000100020004,
                pid: 100010002,
                path: '/statistics',
                name: 'Statistics',
                component: 'layout',
                redirect: '',
                hidden: 'false',
                meta: {
                    title: '生产统计',
                    icon: 'tubiao_shengchantongji'
                },
                children: [
                    {
                        id: 10001000200040000,
                        pid: 1000100020004,
                        path: 'yield',
                        name: 'Yield',
                        component: 'ProductionMgmt/Statistics/Yield',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '日产量统计',
                            icon: 'shengchanliangtongji'
                        },
                        children: []
                    },
                    {
                        id: 10001000200040002,
                        pid: 1000100020004,
                        path: 'tendency',
                        name: 'Tendency',
                        component: 'ProductionMgmt/Statistics/Tendency',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '统计趋势',
                            icon: 'qushi'
                        },
                        children: []
                    }
                ]
            },
            {
                id: 1000100020005,
                pid: 100010002,
                path: '/reportMgmt',
                name: 'ReportMgmt',
                component: 'layout',
                redirect: '',
                hidden: 'false',
                meta: {
                    title: '报警管理',
                    icon: 'alarm'
                },
                children: [
                    {
                        id: 10001000200050000,
                        pid: 1000100020005,
                        path: 'information',
                        name: 'Information',
                        component: 'ProductionMgmt/ReportMgmt/Information',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '指标报警信息',
                            icon: 'baojingxinxi'
                        },
                        children: []
                    },
                    {
                        id: 10001000200050002,
                        pid: 1000100020005,
                        path: 'record',
                        name: 'Record',
                        component: 'ProductionMgmt/ReportMgmt/Record',
                        redirect: '',
                        hidden: 'false',
                        meta: {
                            title: '指标报警记录',
                            icon: 'baojingjilu'
                        },
                        children: []
                    }
                ]
            }
        ]
        // this.menuList = this.$store.state.user.leftMenu
    },
    beforeCreate() {},
    beforeMount() {},
    updated() {},
    activated() {}
}
</script>
<style lang="scss" scoped>
@import '@/scss/variables.scss';
.header-title-logo {
    display: inline-block;
    width: 30px;
    height: 30px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.header-title-text {
    color: #fff;
}
</style>
