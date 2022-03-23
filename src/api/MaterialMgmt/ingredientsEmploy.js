import service from '@/utils/http/axios'

const ingredientsEmploy = {
    ingredientsEmployList: data => {
        return service({
            url: 'web/accessoryUse/list',
            method: 'post',
            data: data
        })
    },
    ingredientsEmployAdd: data => {
        return service({
            url: 'web/accessoryUse/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    ingredientsEmployEdit: data => {
        return service({
            url: 'web/accessoryUse/edit/save',
            method: 'post',
            data: data
        })
    },
    ingredientsEmployDel: data => {
        return service({
            url: 'web/accessoryUse/delete',
            method: 'post',
            data: data
        })
    },
    materialsOptions: data => {
        return service({
            url: 'web/materialsYield/materials/options',
            method: 'post',
            data: data
        })
    },
    accessoryData: data => {
        return service({
            url: 'web/accessoryUse/accessory',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default ingredientsEmploy
