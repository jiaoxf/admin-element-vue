import service from '@/utils/http/axios'
import qs from 'qs'
const commandDispatch = {
    commandDispatchList: data => {
        return service({
            url: 'web/directiveInfo/query',
            method: 'post',
            data: data
        })
    },
    commandDispatchAdd: data => {
        return service({
            url: 'web/directiveInfo/new/save',
            method: 'post',
            data: data,
            contentType: 'multipart'
        })
    },
    commandDispatchEdit: data => {
        return service({
            url: 'web/directiveInfo/edit/save',
            method: 'post',
            data: data,
            contentType: 'multipart'
        })
    },
    commandDispatchDel: data => {
        return service({
            url: 'web/directiveInfo/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commandGetUser: data => {
        return service({
            url: 'web/directiveInfo/receive/user',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commandDownfile: data => {
        return service({
            url: 'web/directiveInfo/file/download',
            method: 'post',
            data: data,
            contentType: 'multipart'
        })
    },
    commandCheckUser: data => {
        return service({
            url: 'web/directiveInfo/receive/user',
            method: 'post',
            data: data
        })
	},
	commandSaveStatus: data => {
        return service({
            url: 'web/directiveInfo/receive/state',
            method: 'post',
            data: data
        })
    }
}
export default commandDispatch
