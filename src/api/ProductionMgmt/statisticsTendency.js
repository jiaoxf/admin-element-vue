import service from '@/utils/http/axios'
import qs from 'qs'
const statisticsYield = {
    statisticsYieldList: data => {
        return service({
            url: 'web/statistic/list',
            method: 'post',
            data: data
        })
    }
}
export default statisticsYield
