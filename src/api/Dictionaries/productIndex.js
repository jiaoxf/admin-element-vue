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
	}
}
export default productIndex
