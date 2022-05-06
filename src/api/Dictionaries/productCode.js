import service from '@/utils/http/axios'

const productCode = {
    productCodeList: data => {
        return service({
            url: 'web/productCode/query',
            method: 'post',
            data: data
        })
    },
    productCodeAdd: data => {
        return service({
            url: 'web/productCode/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productCodeEdit: data => {
        return service({
            url: 'web/productCode/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productCodeDel: data => {
        return service({
            url: 'web/productCode/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productCodeTemplate: data => {
        return service({
            url: 'web/productCode/template',
            method: 'get',
            data: data
        })
    },
    productCodeImport: data => {
        return service({
            url: 'web/productCode/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    productCodeExport: data => {
        return service({
            url: 'web/productCode/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default productCode
