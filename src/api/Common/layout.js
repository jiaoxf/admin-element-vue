import service from '@/utils/http/axios'

const layout = {
    leftMenu: data => {
        return service({
            url: 'web/menus',
            method: 'post',
            data: data
        })
    },
    loginApi: data => {
        return service({
            url: 'web/login',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    topMenu: data => {
        return service({
            url: 'web/nav',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    loginOut: data => {
        return service({
            url: 'web/logout',
            method: 'post',
            data: data
        })
    },
    editPassword: data => {
        return service({
            url: 'web/change/pwd',
            method: 'post',
            data: data
        })
    }
}
export default layout
