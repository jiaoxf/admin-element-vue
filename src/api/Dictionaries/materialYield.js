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
	},
    materialsYieldTemplate: data => {
        return service({
            url: 'web/materialsYield/template',
            method: 'get',
            data: data
        })
    },
    materialsYieldImport: data => {
        return service({
            url: 'web/materialsYield/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    materialsYieldExport: data => {
        return service({
            url: 'web/materialsYield/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default materialYield
