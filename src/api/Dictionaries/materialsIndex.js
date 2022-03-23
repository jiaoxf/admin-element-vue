import service from '@/utils/http/axios'

const materialsIndex = {
    materialsIndexList: data => {
        return service({
            url: 'web/materialsIndex/query',
            method: 'post',
            data: data
        })
    },
    materialsIndexAdd: data => {
        return service({
            url: 'web/materialsIndex/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsIndexEdit: data => {
        return service({
            url: 'web/materialsIndex/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    materialsIndexDel: data => {
        return service({
            url: 'web/materialsIndex/delete',
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
    }
}
export default materialsIndex
