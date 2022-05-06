import service from '@/utils/http/axios'

const reportMgmtRecord = {
    alarmInfoHistoryRecordList: data => {
        return service({
            url: 'web/alarmInfo/history/list',
            method: 'post',
            data: data
        })
    }
}
export default reportMgmtRecord
