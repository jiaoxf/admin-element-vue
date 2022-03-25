export function getAsyncRoutes(menus) {
    let res = []
    let newItem = {}
    menus.forEach(item => {
        const { pid, id, meta, path, redirect, name, children, component, hidden } = item
        newItem = {
            pid,
            id,
            path,
            meta: { ...meta, id },
            redirect,
            name,
            children,
            component:
                component != '' ? resolve => require([`@/views/${component}`], resolve) : undefined,
            hidden
        }
        if (component) {
            // newItem.component = () => import(`@/views/${component}`)
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
