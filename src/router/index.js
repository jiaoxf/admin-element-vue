import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* () => import('@/views/layout') */
export const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/index'),
        hidden: true
    },
    /* {
		path: '/',
		component: () => import('@/views/layout'),
		redirect: '/index',
		children: [
			{
				path: 'index',
				name: 'index',
				component: () => import('@/views/Index/index'),
				meta: { title: '控制台', icon: 'zujian' }
			}
		]
	}, */
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/Index/index')
    },
    {
        path: '/edit',
        component: () => import('@/views/layout'),
        name: 'edit',
        meta: {
            title: '修改密码',
            icon: 'tubiao_shengchantongji'
        },
        children: [
            {
                path: '/editPassword',
                name: 'editPassword',
                component: () => import('@/views/Login/EditPassword')
            }
        ]
    },
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/views/Index/demo')
    },
    {
        path: '/detail',
        component: () => import('@/views/layout'),
        name: 'detail',
        meta: {
            title: '生产统计详情',
            icon: 'tubiao_shengchantongji'
            // permissions: ['admin']  // 权限
        },
        children: [
            {
                path: '/yearDetail',
                name: 'YearDetail',
                component: resolve =>
                    require(['@/views/ProductionMgmt/ProductionPlan/YearDetail'], resolve),
                meta: { title: '年计划详情', icon: 'shengchanliangtongji' }
            },
            {
                path: '/monthDetail',
                name: 'MonthDetail',
                component: resolve =>
                    require(['@/views/ProductionMgmt/ProductionPlan/MonthDetail'], resolve),
                meta: { title: '统计趋势', icon: 'qushi' }
            }
        ]
    }
    /* {
		path: '/productionPlanMgmt',
		component: () => import('@/views/layout'),
		redirect: '/productionYear',
		name: 'ProductionPlanMgmt',
		meta: {
			title: '生产计划管理',
			icon: 'shengchanjihua'
			// operationPermissions: ['edit']  // 权限
		},
		children: [
			{
				path: 'productionYear',
				name: 'ProductionYear',
				component: () => import('@/views/ProductionMgmt/ProductionPlan/Year'),
				meta: { title: '年生产计划', icon: 'yewuniandu' }
			},
			{
				path: 'productionMonth',
				name: 'ProductionMonth',
				component: () => import('@/views/ProductionMgmt/ProductionPlan/Month'),
				meta: { title: '月生产计划', icon: 'yue' }
			}
		]
	},
	{
		path: '/commandDispatch',
		component: () => import('@/views/layout'),
		redirect: '/commandDispatch/instruct',
		name: 'CommandDispatch',
		meta: {
			title: '生产指挥调度',
			icon: 'zhihuitiaodu'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'instruct',
				name: 'Instruct',
				component: () => import('@/views/ProductionMgmt/CommandDispatch/Instruct'),
				meta: { title: '调度指令', icon: 'zhilingguanli' }
			},
			{
				path: 'classify',
				name: 'Classify',
				component: () => import('@/views/ProductionMgmt/CommandDispatch/Classify'),
				meta: { title: '调度指令分类', icon: 'fenlei' }
			}
		]
	},
	{
		path: '/statistics',
		component: () => import('@/views/layout'),
		redirect: '/statistics',
		name: 'Statistics',
		meta: {
			title: '生产统计',
			icon: 'tubiao_shengchantongji'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'yield',
				name: 'Yield',
				component: () => import('@/views/ProductionMgmt/Statistics/Yield'),
				meta: { title: '产量统计（日）', icon: 'shengchanliangtongji' }
			},
			{
				path: 'tendency',
				name: 'Tendency',
				component: () => import('@/views/ProductionMgmt/Statistics/Tendency'),
				meta: { title: '统计趋势', icon: 'qushi' }
			}
		]
	},
	{
		path: '/reportMgmt',
		component: () => import('@/views/layout'),
		redirect: '/reportMgmt/information',
		name: 'ReportMgmt',
		meta: {
			title: '报警管理',
			icon: 'alarm'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'information',
				name: 'Information',
				component: () => import('@/views/ProductionMgmt/ReportMgmt/Information'),
				meta: { title: '指标报警信息', icon: 'baojingxinxi' }
			},
			{
				path: 'record',
				name: 'Record',
				component: () => import('@/views/ProductionMgmt/ReportMgmt/Record'),
				meta: { title: '指标报警记录', icon: 'baojingjilu' }
			}
		]
	},
	{
		path: '/materialRecord',
		component: () => import('@/views/layout'),
		redirect: '/reportMgmt/information',
		name: 'MaterialRecord',
		meta: {
			title: '原料记录',
			icon: 'yuanliaoguanli'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'materialenterArena',
				name: 'MaterialenterArena',
				component: () => import('@/views/MaterialMgmt/MaterialRecord/EnterArena'),
				meta: { title: '进厂记录', icon: 'kucunpandian-' }
			},
			{
				path: 'materialEmploy',
				name: 'MaterialEmploy',
				component: () => import('@/views/MaterialMgmt/MaterialRecord/Employ'),
				meta: { title: '使用记录', icon: 'shiyongjilu' }
			}
		]
	},
	{
		path: '/ingredients',
		component: () => import('@/views/layout'),
		redirect: '/ingredients/ingredientsEnterArena',
		name: 'Ingredients',
		meta: {
			title: '辅料记录',
			icon: 'fuliao'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'ingredientsEnterArena',
				name: 'IngredientsEnterArena',
				component: () => import('@/views/MaterialMgmt/Ingredients/Enter'),
				meta: { title: '进厂记录', icon: 'kucunpandian-' }
			},
			{
				path: 'materialEmploy',
				name: 'MaterialEmploy',
				component: () => import('@/views/MaterialMgmt/Ingredients/Employ'),
				meta: { title: '使用记录', icon: 'shiyongjilu' }
			}
		]
	},
	{
		path: '/rawMaterial',
		component: () => import('@/views/layout'),
		redirect: '/rawMaterial/originalData',
		name: 'RawMaterial',
		meta: {
			title: '原料盘存',
			icon: 'yuanliaocangfengbao'
			// permissions: ['admin']  // 权限
		},
		children: [
			{
				path: 'originalData',
				name: 'OriginalData',
				component: () => import('@/views/MaterialMgmt/RawMaterial/OriginalData'),
				meta: { title: '原始数据', icon: 'yuanshichaxun' }
			},
			{
				path: 'adjustment',
				name: 'Adjustment',
				component: () => import('@/views/MaterialMgmt/RawMaterial/Adjustment'),
				meta: { title: '调整数据', icon: 'tiaozheng' }
			},
			{
				path: 'materialYield',
				name: 'MaterialYield',
				component: () => import('@/views/MaterialMgmt/RawMaterial/MaterialYield'),
				meta: { title: '物料收率', icon: 'wuliaocaigou' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/qualityControl/Qacdiloprttuuy',
				name: 'ProductQuality',
				component: () => import('@/views/QualityControl/ProductQuality'),
				meta: { title: '产品质量记录', icon: 'zhiliangpingjiaxitong' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/qualityControl/Qaaaeiillmrttuy',
				name: 'MaterialQuality',
				component: () => import('@/views/QualityControl/MaterialQuality'),
				meta: { title: '原料质量记录', icon: 'zhiliangguanlixitong' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/qualityControl/Qadeegiiilnnrsttuy',
				name: 'IngredientsQuality',
				component: () => import('@/views/QualityControl/IngredientsQuality'),
				meta: { title: '辅料质量记录', icon: 'zhiliangdangan' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/environmentalProtection/Maabilmnnooorrt',
				name: 'AbnormalMonitor',
				component: () => import('@/views/EnvironmentalProtection/AbnormalMonitor'),
				meta: { title: '指标异常检测', icon: 'zhibiao' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/environmentalProtection/Raabcdelmnoorr',
				name: 'AbnormalRecord',
				component: () => import('@/views/EnvironmentalProtection/AbnormalRecord'),
				meta: { title: '指标异常记录', icon: 'fabu' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/productIndex',
				name: 'ProductIndex',
				component: () => import('@/views/Dictionaries/ProductIndex.vue'),
				meta: { title: '产品指标', icon: 'wuliuchanpin' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/materialIndex',
				name: 'MaterialIndex',
				component: () => import('@/views/Dictionaries/MaterialIndex.vue'),
				meta: { title: '原料指标', icon: 'yuanliaocangbaocaishangjia' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/supplementaryIndex',
				name: 'SupplementaryIndex',
				component: () => import('@/views/Dictionaries/SupplementaryIndex.vue'),
				meta: { title: '辅料指标', icon: 'fuliao2' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/materialYield',
				name: 'MaterialYield',
				component: () => import('@/views/Dictionaries/MaterialYield.vue'),
				meta: { title: '物料收率', icon: 'RectangleCopy' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/productSample',
				name: 'ProductSample',
				component: () => import('@/views/Dictionaries/ProductSample.vue'),
				meta: { title: '产品样编码', icon: 'bianmashengchengqix' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/productCode',
				name: 'ProductCode',
				component: () => import('@/views/Dictionaries/ProductCode.vue'),
				meta: { title: '产品编码', icon: 'bianma' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/productData',
				name: 'ProductData',
				component: () => import('@/views/Dictionaries/ProductData.vue'),
				meta: { title: '产品数据', icon: 'chanpinshuju' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/rawData',
				name: 'RawData',
				component: () => import('@/views/Dictionaries/RawData.vue'),
				meta: { title: '原料数据', icon: 'dazongwuziyuanliaoyanshou' }
			}
		]
	},
	{
		path: '',
		component: () => import('@/views/layout'),
		children: [
			{
				path: '/dictionaries/materialData',
				name: 'MaterialData',
				component: () => import('@/views/Dictionaries/MaterialData.vue'),
				meta: { title: '辅料数据', icon: 'fuliaocang' }
			}
		]
	}, */
]

const createRouter = () =>
    new Router({
        // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
