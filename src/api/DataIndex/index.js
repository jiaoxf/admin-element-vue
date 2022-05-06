import service from '@/utils/http/axios'

const dataIndex = {
    homeDirectiveList: data => {
        return service({
            url: 'web/home/directive/list',
            method: 'post',
            data: data
        })
    },
    homeAlarmList: data => {
        return service({
            url: 'web/home/alarm/list',
            method: 'post',
            data: data
        })
    }
}
export default dataIndex


