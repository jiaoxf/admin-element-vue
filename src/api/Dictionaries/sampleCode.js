import service from '@/utils/http/axios'

const sampleCode = {
    sampleCodeList: data => {
        return service({
            url: 'web/sampleCode/query',
            method: 'post',
            data: data
        })
    },
    sampleCodeAdd: data => {
        return service({
            url: 'web/sampleCode/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    sampleCodeEdit: data => {
        return service({
            url: 'web/sampleCode/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    sampleCodeDel: data => {
        return service({
            url: 'web/sampleCode/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    sampleCodeTemplate: data => {
        return service({
            url: 'web/sampleCode/template',
            method: 'get',
            data: data
        })
    },
    sampleCodeImport: data => {
        return service({
            url: 'web/sampleCode/import',
            method: 'POST',
            data: data,
            contentType: 'multipart'
        })
    },
    sampleCodeExport: data => {
        return service({
            url: 'web/sampleCode/export',
            method: 'POST',
            data: data,
            responseType: 'blob'
        })
    }
}
export default sampleCode
