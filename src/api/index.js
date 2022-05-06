// 基础代码
import layout from './Common/layout'
// 公共接口
import commonApi from './Common/commonApi'
// 产品编码
import productCode from './Dictionaries/productCode'
// 产品指标
import productIndex from './Dictionaries/productIndex'
// 原料编码
import materialsIndex from './Dictionaries/materialsIndex'
// 物料收率
import materialYield from './Dictionaries/materialYield'
// 辅料指标
import supplementaryIndex from './Dictionaries/supplementaryIndex'
// 原料数据
import rawData from './Dictionaries/rawData'
// 辅料数据
import accessoryData from './Dictionaries/accessoryData'
// 产品样编码
import sampleCode from './Dictionaries/sampleCode'
// 产品样编码
import productData from './Dictionaries/productData'
// 产品样编码
import common from './Dictionaries/common'
// 槽参数
import grooveParameters from './Dictionaries/grooveParameters'

/**
 * 生产管理
 */
// 月生产计划
import productionMonth from './ProductionMgmt/productionMonth'
// 年生产计划
import productionYear from './ProductionMgmt/productionYear'
// 指令分类
import commandType from './ProductionMgmt/commandType'
// 调度指令
import commandDispatch from './ProductionMgmt/commandDispatch'
// 日产量统计
import statisticsYield from './ProductionMgmt/statisticsYield'
// 统计趋势
import statisticsTendency from './ProductionMgmt/statisticsTendency'
// 报警信息
import reportMgmtInformation from './ProductionMgmt/reportMgmtInformation.js'
// 报警记录
import reportMgmtRecord from './ProductionMgmt/reportMgmtRecord'
// 报警配置
import reportConfig from './ProductionMgmt/reportConfig'


/**
 * 物料管理
 */
// 原料进场记录
import materialEnter from './MaterialMgmt/materialEnter'
// 原料使用记录
import materialEmploy from './MaterialMgmt/materialEmploy'
// 辅料进场记录
import ingredientsEnter from './MaterialMgmt/ingredientsEnter'
// 辅料使用记录
import ingredientsEmploy from './MaterialMgmt/ingredientsEmploy'
// 原料盘存-原始数据
import originalData from './MaterialMgmt/originalData'
// 运料盘存-调整数据
import adjustmentData from './MaterialMgmt/adjustmentData'


/**
 * 质量管理
 */

// 产品质量
import productQuality from './QualityMgmt/productQuality'
// 原料质量记录
import materialsQuality from './QualityMgmt/materialsQuality'
// 辅料质量记录
import ingredientsQuality from './QualityMgmt/ingredientsQuality'

/**
 * 环保管理
 */
// 指标异常检测
import abnormalMonitor from './EnvironmentalMgmt/abnormalMonitor'
// 指标异常记录
import abnormalRecord from './EnvironmentalMgmt/abnormalRecord'
// import reportConfig from './ProductionMgmt/reportConfig';


// 主页相关接口
import dataIndex from './DataIndex/index'

const api = {
	...layout,
	...commonApi,
	...productCode,
	...productIndex,
	...materialsIndex,
	...materialYield,
	...supplementaryIndex,
	...sampleCode,
	...productData,
	...common,
	...rawData,
	...accessoryData,
	...commandType,
	...productionYear,
	...productionMonth,
	...commandDispatch,
	...statisticsYield,
	...materialEnter,
	...materialEmploy,
	...ingredientsEmploy,
	...ingredientsEnter,
	...productQuality,
	...materialsQuality,
	...ingredientsQuality,
	...statisticsTendency,
	...reportConfig,
	...reportMgmtRecord,
	...reportMgmtInformation,
	...grooveParameters,
	...dataIndex
}

export default api
