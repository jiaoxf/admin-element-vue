import service from '@/utils/http/axios'

const materialsQuality = {
    materialsQualityList: data => {
        return service({
            url: 'web/materialsQuality/list',
            method: 'post',
            data: data
        })
    },
    materialsQualityAdd: data => {
        return service({
            url: 'web/materialsQuality/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsQualityEdit: data => {
        return service({
            url: 'web/materialsQuality/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsQualityDel: data => {
        return service({
            url: 'web/materialsQuality/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsQualityData: data => {
        return service({
            url: '/web/materialsQuality/material',
            method: 'post',
            data: data
        })
    },
    materialsQualityIndex: data => {
        return service({
            url: '/web/materialsQuality/material/index',
            method: 'post',
            data: data
        })
    },
    getMaterialsIndex: data => {
        return service({
            url: '/web/materialsQuality/index',
            method: 'post',
            data: data
        })
    }
}
export default materialsQuality
