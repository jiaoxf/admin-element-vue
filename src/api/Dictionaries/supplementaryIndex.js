import service from '@/utils/http/axios'

const supplementaryIndex = {
    supplementaryIndexList: data => {
        return service({
            url: 'web/accessoryIndex/query',
            method: 'post',
            data: data
        })
    },
    supplementaryIndexAdd: data => {
        return service({
            url: 'web/accessoryIndex/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    supplementaryIndexEdit: data => {
        return service({
            url: 'web/accessoryIndex/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    supplementaryIndexDel: data => {
        return service({
            url: 'web/accessoryIndex/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default supplementaryIndex
