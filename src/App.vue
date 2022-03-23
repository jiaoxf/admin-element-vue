<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
import router from 'vue-router'
import GetRouter from '@/router/parse_routers'
export default {
    created() {
        /* this.$store.dispatch('getTopNav')
        const unparseRoutes = JSON.parse(sessionStorage.getItem('_c_unparseRoutes'))
		if (this.$store.state.userInfo) {
			this.$router.push('/login')
		}
        if (unparseRoutes) {
            // const toPath = sessionStorage.getItem('_c_lastPath')
            ParseRouters(unparseRoutes) // 解析函数
        } */
        const unparseRoutes = JSON.parse(sessionStorage.getItem('_c_unparseRoutes'))
        if (unparseRoutes) {
            const toPath = sessionStorage.getItem('_c_lastPath')
			// console.log(unparseRoutes)
            GetRouter(unparseRoutes, toPath) // 解析函数
        }

        // 监听页面刷新
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('_c_lastPath', this.$router.currentRoute.path)
        })
    }
}
</script>
<style lang="scss">
#app {
    font-family: 'Helvetica Neue', Helvetica, Arial, 'Microsoft Yahei', 'Hiragino Sans GB',
        'Heiti SC', 'WenQuanYi Micro Hei', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
	height:100vh;
}

#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
