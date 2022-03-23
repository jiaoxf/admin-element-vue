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
	}

}
export default productionYear
