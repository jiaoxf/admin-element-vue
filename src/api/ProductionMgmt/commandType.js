import service from '@/utils/http/axios'

const commandType = {
    commandTypeList: data => {
        return service({
            url: 'web/directiveType/query',
            method: 'post',
            data: data
        })
    },
    commandTypeAdd: data => {
        return service({
            url: 'web/directiveType/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    commandTypeEdit: data => {
        return service({
            url: 'web/directiveType/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
	commandTypeDel: data => {
		return service({
			url: 'web/directiveType/delete',
			method: 'post',
			data: data
		})
	},
	commandDirectiveType: data => {
		return service({
			url: 'web/directiveType/options',
			method: 'post',
			data: data
		})
	}
}
export default commandType
