import service from '@/utils/http/axios'

const materialEnter = {
    materialEnterList: data => {
        return service({
            url: 'web/materialsPurchased/list',
            method: 'post',
            data: data
        })
    },
    materialEnterAdd: data => {
        return service({
            url: 'web/materialsPurchased/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialEnterEdit: data => {
        return service({
            url: 'web/materialsPurchased/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialEnterDel: data => {
        return service({
            url: 'web/materialsPurchased/delete',
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
    materialsEnterData: data => {
        return service({
            url: 'web/materialsPurchased/material',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    marterialsEnterIndex: data => {
        return service({
            url: 'web/materialsPurchased/index',
            method: 'post',
            data: data
        })
    }
}
export default materialEnter
