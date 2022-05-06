import service from '@/utils/http/axios'

const reportConfig = {
    reportConfigList: data => {
        return service({
            url: 'web/alarmConfig/sc/list',
            method: 'post',
            data: data
        })
    },
    reportConfigAdd: data => {
        return service({
            url: 'web/alarmConfig/sc/new/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    reportConfigEdit: data => {
        return service({
            url: 'web/alarmConfig/sc/edit/save',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    reportConfigDel: data => {
        return service({
            url: 'web/alarmConfig/sc/delete',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    alarmLocationOption: data => {
        return service({
            url: 'web/alarmConfig/sc/position/option',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    },
    alarmPointOption: data => {
        return service({
            url: 'web/alarmConfig/sc/point/option',
            method: 'post',
            data: data
            // contentType: 'multipart'
        })
    }
}
export default reportConfig
