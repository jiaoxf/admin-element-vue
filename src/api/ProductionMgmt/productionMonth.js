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
    }
}
export default productionMonth
