import service from '@/utils/http/axios'

const commonApi = {
    getUser: data => {
        return service({
            url: 'web/user/option',
            method: 'post',
            data: data
        })
    },
    getUserList: data => {
        return service({
            url: 'web/directiveInfo/user/option',
            method: 'post',
            data: data
        })
    }
}
export default commonApi
