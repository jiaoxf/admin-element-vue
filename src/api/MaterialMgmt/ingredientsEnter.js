import service from '@/utils/http/axios'

const ingredientsEnter = {
    ingredientsEnterList: data => {
        return service({
            url: 'web/accessoryPurchased/list',
            method: 'post',
            data: data
        })
    },
    ingredientsEnterAdd: data => {
        return service({
            url: 'web/accessoryPurchased/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    ingredientsEnterEdit: data => {
        return service({
            url: 'web/accessoryPurchased/edit/save',
            method: 'post',
            data: data
        })
    },
    ingredientsEnterDel: data => {
        return service({
            url: 'web/accessoryPurchased/delete',
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
	accessoryEnterData: data => {
        return service({
            url: 'web/accessoryPurchased/accessory',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    accessoryEnterIndex: data => {
        return service({
            url: 'web/accessoryPurchased/index',
            method: 'post',
            data: data
        })
    }
}
export default ingredientsEnter
