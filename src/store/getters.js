const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
	name: state => state.user.name,
	permission_routes: state => state.user.leftMenu
}
export default getters
