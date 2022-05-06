import service from '@/utils/http/axios'

const productIndex = {
    productIndexList: data => {
        return service({
            url: 'web/productIndex/query',
            method: 'post',
            data: data
        })
    },
    productIndexAdd: data => {
        return service({
            url: 'web/productIndex/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productIndexEdit: data => {
        return service({
            url: 'web/productIndex/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productIndexDel: data => {
        return service({
            url: 'web/productIndex/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getProductIndex: data => {
        return service({
            url: 'web/productIndex/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
	getProductIndexForm: data => {
		return service({
			url: 'web/product/query/index',
			method: 'post',
			data: data
			// contentType: 'multipart'
		})
	},
    productIndexTemplate: data => {
        return service({
            url: 'web/productIndex/template',
            method: 'get',
            data: data
        })
    },
    productIndexImport: data => {
        return service({
            url: 'web/productIndex/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    productIndexExport: data => {
        return service({
            url: 'web/productIndex/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default productIndex
