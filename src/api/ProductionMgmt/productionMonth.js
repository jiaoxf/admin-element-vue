import service from '@/utils/http/axios'

const productionMonth = {
    monthPlanList: data => {
        return service({
            url: 'web/monthPlan/query',
            method: 'post',
            data: data
        })
    },
    monthPlanAdd: data => {
        return service({
            url: 'web/monthPlan/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    monthPlanEdit: data => {
        return service({
            url: 'web/monthPlan/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    monthPlanDel: data => {
        return service({
            url: 'web/monthPlan/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    monthPlanDetail: data => {
        return service({
            url: 'web/monthPlan/query/detail',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    monthPlanData: data => {
        return service({
            url: 'web/monthPlan/productAndIndex',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getTaskData: data => {
        return service({
            url: 'web/dict/option',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
	monthPlanTemplate: data => {
        return service({
            url: 'web/monthPlan/template',
            method: 'get',
            data: data
        })
    },
    monthPlanImport: data => {
        return service({
            url: 'web/monthPlan/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    monthPlanExport: data => {
        return service({
            url: 'web/monthPlan/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default productionMonth
