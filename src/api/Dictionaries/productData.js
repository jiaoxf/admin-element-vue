import service from '@/utils/http/axios'

const productData = {
    productDataList: data => {
        return service({
            url: 'web/product/list/query',
            method: 'post',
            data: data
        })
    },
    productDataAdd: data => {
        return service({
            url: 'web/product/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productDataEdit: data => {
        return service({
            url: 'web/product/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productDataDel: data => {
        return service({
            url: 'web/product/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	},
    productInfo: data => {
        return service({
            url: '/web/product/single/query',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
	}
}
export default productData
