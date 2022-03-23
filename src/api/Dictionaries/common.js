import service from '@/utils/http/axios'

const common = {
    commonFactory: data => {
        return service({
            url: 'web/factory',
            method: 'post',
            data: data
        })
    },
    commonDepartment: data => {
        return service({
            url: 'web/department',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commonProduct: data => {
        return service({
            url: 'web/productCode/product/options',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commonMaterial: data => {
        return service({
            url: 'web/materialsYield/materials/options',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commonDict: data => {
        return service({
            url: '/web/dict/option',
            method: 'post',
            data: data
        })
    }
}
export default common
