import service from '@/utils/http/axios'
import qs from 'qs'
const statisticsYield = {
    statisticsYieldListApi: data => {
        return service({
            url: 'web/dailyOutput/query',
            method: 'post',
            data: data
        })
    },
    statisticsYieldAdd: data => {
        return service({
            url: 'web/dailyOutput/new/save',
            method: 'post',
            data: data
        })
    },
    statisticsYieldEdit: data => {
        return service({
            url: 'web/dailyOutput/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    statisticsYieldDel: data => {
        return service({
            url: 'web/dailyOutput/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    statisticsYieldDecision: data => {
        return service({
            url: 'web/dailyOutput/decision',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    statisticsYieldProductTest: data => {
        return service({
            url: 'web/dailyOutput/testIndex',
            method: 'post',
            data: data
        })
	},
	generationBatchNumber: data => {
		return service({
			url: 'web/dailyOutput/batchNum',
			method: 'post',
			data: data
		})
	}
}
export default statisticsYield
