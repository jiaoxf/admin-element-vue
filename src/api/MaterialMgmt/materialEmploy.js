import service from '@/utils/http/axios'

const materialEmploy = {
    materialEmployList: data => {
        return service({
            url: 'web/materialsUse/list',
            method: 'post',
            data: data
        })
    },
    materialEmployAdd: data => {
        return service({
            url: 'web/materialsUse/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialEmployEdit: data => {
        return service({
            url: 'web/materialsUse/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialEmployDel: data => {
        return service({
            url: 'web/materialsUse/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsOptions: data => {
        return service({
            url: 'web/materialsYield/materials/options',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsData: data => {
        return service({
            url: 'web/materialsUse/material',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default materialEmploy
