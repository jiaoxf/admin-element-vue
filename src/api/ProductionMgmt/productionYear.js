import service from '@/utils/http/axios'

const productionYear = {
    productionYearList: data => {
        return service({
            url: 'web/yearPlan/query',
            method: 'post',
            data: data
        })
    },
    productionYearAdd: data => {
        return service({
            url: 'web/yearPlan/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productionYearEdit: data => {
        return service({
            url: 'web/yearPlan/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productionYearDel: data => {
        return service({
            url: 'web/yearPlan/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
	productionYearDetail: data => {
		return service({
            url: 'web/yearPlan/query/detail',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
	productionYearData: data => {
		return service({
            url: 'web/yearPlan/product',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
	yearPlanTemplate: data => {
        return service({
            url: 'web/yearPlan/template',
            method: 'get',
            data: data
        })
    },
    yearPlanImport: data => {
        return service({
            url: 'web/yearPlan/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    yearPlanExport: data => {
        return service({
            url: 'web/yearPlan/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }

}
export default productionYear
