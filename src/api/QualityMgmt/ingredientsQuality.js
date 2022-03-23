import service from '@/utils/http/axios'

const ingredientsQuality = {
    ingredientsQualityList: data => {
        return service({
            url: 'web/accessoryQuality/list',
            method: 'post',
            data: data
        })
    },
    ingredientsQualityAdd: data => {
        return service({
            url: 'web/accessoryQuality/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    ingredientsQualityEdit: data => {
        return service({
            url: 'web/accessoryQuality/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    ingredientsQualityDel: data => {
        return service({
            url: 'web/accessoryQuality/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    ingredientsQualityData: data => {
        return service({
            url: '/web/accessoryQuality/accessory',
            method: 'post',
            data: data
        })
    },
    ingredientsQualityIndex: data => {
        return service({
            url: '/web/accessoryQuality/index',
            method: 'post',
            data: data
        })
    },
    getAccessoryIndexApi: data => {
        return service({
            url: '/web/accessoryQuality/accessory/index',
            method: 'post',
            data: data
        })
    }
}
export default ingredientsQuality
