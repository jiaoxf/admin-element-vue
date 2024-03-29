import service from '@/utils/http/axios'

const reportMgmtInformation = {
    alarmInfoList: data => {
        return service({
            url: 'web/alarmInfo/list',
            method: 'post',
            data: data
        })
    },
    alarmInfoView: data => {
        return service({
            url: 'web/alarmInfo/view',
            method: 'post',
            data: data
        })
    }
}
export default reportMgmtInformation
