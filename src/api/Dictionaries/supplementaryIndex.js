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
    },
    supplementaryIndexTemplate: data => {
        return service({
            url: 'web/accessoryIndex/template',
            method: 'get',
            data: data
        })
    },
    supplementaryIndexImport: data => {
        return service({
            url: 'web/accessoryIndex/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    supplementaryIndexExport: data => {
        return service({
            url: 'web/accessoryIndex/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default supplementaryIndex
