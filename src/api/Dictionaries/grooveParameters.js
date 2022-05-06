import service from '@/utils/http/axios'

const groove = {
    grooveList: data => {
        return service({
            url: 'web/groove/list',
            method: 'post',
            data: data
        })
    },
    grooveAdd: data => {
        return service({
            url: 'web/groove/new/save',
            method: 'post',
            data: data
        })
    },
    grooveEdit: data => {
        return service({
            url: 'web/groove/edit/save',
            method: 'post',
            data: data
        })
    },
    grooveDel: data => {
        return service({
            url: 'web/groove/delete',
            method: 'post',
            data: data
        })
    }
}
export default groove
