import service from '@/utils/http/axios'

const rawData = {
    rawDataList: data => {
        return service({
            url: 'web/material/query',
            method: 'post',
            data: data
        })
    },
    rawDataAdd: data => {
        return service({
            url: 'web/material/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    rawDataEdit: data => {
        return service({
            url: 'web/material/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    rawDataDel: data => {
        return service({
            url: 'web/material/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getMaterialIndexForm: data => {
        return service({
            url: 'web/material/query/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getMaterialIndex: data => {
        return service({
            url: 'web/materialsIndex/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default rawData
