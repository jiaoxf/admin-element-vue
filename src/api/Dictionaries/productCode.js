import service from '@/utils/http/axios'

const productCode = {
	productCodeList: (data) => {
		return service({
			url: 'web/productCode/query',
			method: 'post',
			data: data
		})
	},
	productCodeAdd: (data) => {
		return service({
			url: 'web/productCode/new/save',
			method: 'post',
			data: data
			// contentType: 'multipart'
		})
	},
	productCodeEdit: (data) => {
		return service({
			url: 'web/productCode/edit/save',
			method: 'post',
			data: data
			// contentType: 'multipart'
		})
	},
	productCodeDel: (data) => {
		return service({
			url: 'web/productCode/delete',
			method: 'post',
			data: data
			// contentType: 'multipart'
		})
	}
}
export default productCode

