import router from './index'
import store from '@/store'
import { resetRouter } from './resetRouter'
/**
 * @desc: 解析原始路由信息（路由之间通过pid确定上下级）并动态添加路由及跳转页面
 * @param {Array} menus - (从后端获取的)菜单路由信息
 * @param {String} to - 解析成功后需要跳转的路由路径
 * @example
 * // 引入parse_routes
 * const menus = [ // 由后端传入
 *  { "id": 1, "pid": 0, "path": "/receipt", "name": "", "component": "layout/Layout", "redirect": "", "hidden": "false", "meta": "" },
 *  { "id": 2, "pid": 1, "path": "index", "name": "Receipt", "component": "receipt/index", "redirect": "","hidden": "false", "meta": "{\"title\": \"收款管理\", \"icon\": \"receipt\"}" },
 *  { "id": 3, "pid": 0, "path": "/payment", "name": "", "component": "layout/Layout", "redirect": "", "hidden": "false", "meta": "" },
 *  { "id": 4, "pid": 3, "path": "index", "name": "Payment", "component": "payment/index", "redirect": "", "hidden": "false", "meta": "{\"title\": \"付款管理\", \"icon\": \"payment\"}" },
 *  { "id": 5, "pid": 0, "path": "/crm", "name":"", "component": "layout/Layout", "redirect": "", "hidden": "false", "meta": "" },
 *  { "id": 6, "pid": 5, "path": "index","name": "Crm", "component": "crm/index", "redirect": "","hidden": "false", "meta": "{\"title\": \"客户管理\", \"icon\": \"people\"}" },
 *  { "id": 7, "pid": 0, "path": "/upload_product", "name":"", "component": "layout/Layout", "redirect": "", "hidden": "false", "meta": ""},
 *  { "id": 8, "pid": 7, "path": "index","name": "productUpload", "component": "productUpload/index", "redirect": "","hidden": "false", "meta": "{\"title\": \"测评商品上传\", \"icon\": \"upload\"}" }
 * ]
 * ParseRoutes(menus, '/payment/index')
 */
/* const menus = [
    {
        id: 1,
        pid: 0,
        path: '/productionPlanMgmt',
        name: 'ProductionPlanMgmt',
        component: 'layout',
        redirect: '',
        hidden: 'false',
        meta: { title: '生产计划管理', icon: 'shengchanjihua' }
    },
    {
        id: 2,
        pid: 1,
        path: '/productionYear',
        name: 'ProductionYear',
        component: 'ProductionMgmt/ProductionPlan/Year',
        redirect: '',
        hidden: 'false',
        meta: { title: '年生产计划', icon: 'yewuniandu' }
    },
    {
        id: 3,
        pid: 1,
        path: 'productionMonth',
        name: 'ProductionMonth',
        component: 'ProductionMgmt/ProductionPlan/Month',
        redirect: '',
        hidden: 'false',
        meta: { title: '月生产计划', icon: 'yue' }
    },

    {
        id: 4,
        pid: 0,
        path: '/commandDispatch',
        name: 'CommandDispatch',
        component: 'layout',
        redirect: '/commandDispatch/instruct',
        hidden: 'false',
        meta: { title: '生产指挥调度', icon: 'zhihuitiaodu' }
    },
    {
        id: 5,
        pid: 4,
        path: 'instruct',
        name: 'Instruct',
        component: 'ProductionMgmt/CommandDispatch/Instruct',
        redirect: '',
        hidden: 'false',
        meta: { title: '调度指令', icon: 'zhilingguanli' }
    },
    {
        id: 6,
        pid: 4,
        path: 'classify',
        name: 'Classify',
        component: 'ProductionMgmt/CommandDispatch/Classify',
        redirect: '',
        hidden: 'false',
        meta: { title: '调度指令分类', icon: 'fenlei' }
    },
    {
        id: 7,
        pid: 0,
        path: '/statistics',
        name: 'Statistics',
        component: 'layout',
        redirect: '',
        hidden: 'false',
        meta: { title: '生产统计', icon: 'tubiao_shengchantongji' }
    },
    {
        id: 8,
        pid: 7,
        path: 'yield',
        name: 'Yield',
        component: 'ProductionMgmt/Statistics/Yield',
        redirect: '',
        hidden: 'false',
        meta: { title: '产量统计（日）', icon: 'shengchanliangtongji' }
    },
    {
        id: 9,
        pid: 7,
        path: 'tendency',
        name: 'Tendency',
        component: 'ProductionMgmt/Statistics/Tendency',
        redirect: '',
        hidden: 'false',
        meta: { title: '统计趋势', icon: 'qushi' }
    },
    {
        id: 10,
        pid: 0,
        path: '/reportMgmt',
        name: 'ReportMgmt',
        component: 'layout',
        redirect: '',
        hidden: 'false',
        meta: { title: '报警管理', icon: 'alarm' }
    },
    {
        id: 11,
        pid: 10,
        path: 'information',
        name: 'Information',
        component: 'ProductionMgmt/ReportMgmt/Information',
        redirect: '',
        hidden: 'false',
        meta: { title: '指标报警信息', icon: 'baojingxinxi' }
    },
    {
        id: 12,
        pid: 10,
        path: 'record',
        name: 'Record',
        component: 'ProductionMgmt/ReportMgmt/Record',
        redirect: '',
        hidden: 'false',
        meta: { title: '指标报警记录', icon: 'baojingjilu' }
    }
] */
export default (menus, to = '/') => {
    // 初始路由
    const defRoutes = [
        {
            path: '/login',
            component: () => import('@/views/Login/index'),
            hidden: true
        }
        /* {
            path: '/404',
            name: '404',
            component: () => import('@/views/404'),
            hidden: true
        },
        {
            path: '*',
            redirect: '/404',
            hidden: true
        } */
    ]

    // 初始化路由信息对象
    const menusMap = {}
    menus.map(v => {
        const { path, name, component, redirect, hidden, meta } = v
        // 重新构建路由对象
        const item = {
            path,
            name,
            component: () => import(`@/views/${component}`),
            redirect: '',
            hidden: hidden != '' ? JSON.parse(hidden) : ''
        }
        meta.length !== 0 && (item.meta = meta)
        // 判断是否为根节点
        if (
            v.pid == '100010002' ||
            v.pid == '100010003' ||
            v.pid == '100010004' ||
            v.pid == '100010005' ||
            v.pid == '100010006'
        ) {
            menusMap[v.id] = item
        } else {
            !menusMap[v.pid].children && (menusMap[v.pid].children = [])
            menusMap[v.pid].children.push(item)
        }
    })
    const notFoundRoutes = [
        { path: '/404', name: '404', component: () => import('@/views/404'), hidden: true },
        { path: '*', redirect: '/404', hidden: true }
    ]
    // 将生成数组树结构的菜单并拼接404路由
    const routes = Object.values(menusMap).concat(notFoundRoutes)
    // 默认路由拼接生成的路由（注意顺序）
    const integralRoutes = defRoutes.concat(routes)
    router.options.routes = integralRoutes
    router.addRoutes(integralRoutes)
    /* console.log(to)
	console.log(store.state.user.menuActive) */
    router.push({ path: to })
}
