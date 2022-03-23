import service from '@/utils/http/axios'

const productQuality = {
    productQualityList: data => {
        return service({
            url: 'web/productQuality/list',
            method: 'post',
            data: data
        })
    },
    productQualityAdd: data => {
        return service({
            url: 'web/productQuality/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productQualityEdit: data => {
        return service({
            url: 'web/productQuality/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productQualityDel: data => {
        return service({
            url: 'web/productQuality/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    productQualityIndex: data => {
        return service({
            url: '/web/productQuality/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getSampleData: data => {
        return service({
            url: '/web/sampleCode/sample/options',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default productQuality
