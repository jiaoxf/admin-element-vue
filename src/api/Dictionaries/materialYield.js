import service from '@/utils/http/axios'

const materialYield = {
    materialYieldList: data => {
        return service({
            url: 'web/materialsYield/query',
            method: 'post',
            data: data
        })
    },
    materialYieldAdd: data => {
        return service({
            url: 'web/materialsYield/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialYieldEdit: data => {
        return service({
            url: 'web/materialsYield/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialYieldDel: data => {
        return service({
            url: 'web/materialsYield/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
	materialYieldOption: data => {
		return service({
            url: 'web/materialsYield/materials/options',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	}
}
export default materialYield
