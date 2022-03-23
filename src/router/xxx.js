import router from './index'

// 初始化路由信息对象
export default function getAsyncRoutes(menus) {
    const res = []
    // 遍历路由数组去重组可用的路由
    menus.forEach(item => {
        const { pid, id, meta, path, redirect, name, children, component } = item

        let newItem = {}

        newItem = {
            pid,
            id,
            path,
            meta,
            redirect,
            name,
            children
        }
        if (component) {
            newItem.component = () => import(`@/views/${component}`)
            // newItem.component = resolve => require([`@/views/${component}`], resolve)
        }

        // 若遍历的当前路由存在子路由，需要对子路由进行递归遍历
        if (newItem.children && newItem.children.length > 0) {
            newItem.children = getAsyncRoutes(item.children)
        }
        res.push(newItem)
    })
    return res
}
