import service from '@/utils/http/axios'

const accessoryData = {
    accessoryDataList: data => {
        return service({
            url: 'web/accessory/query',
            method: 'post',
            data: data
        })
    },
    accessoryDataAdd: data => {
        return service({
            url: 'web/accessory/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    accessoryDataEdit: data => {
        return service({
            url: 'web/accessory/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    accessoryDataDel: data => {
        return service({
            url: 'web/accessory/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getAccessoryIndexForm: data => {
        return service({
            url: 'web/accessory/query/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    getAccessoryIndex: data => {
        return service({
            url: 'web/accessoryIndex/index',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default accessoryData
