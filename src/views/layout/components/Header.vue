<template>
    <div class="header">
        <el-header>
            <div class="header-menu">
                <div class="unfold">
                    <i
                        class="unfold-icon"
                        :class="[$store.state.app.foldMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
                        @click="flagFold"
                    ></i>
                </div>
                <el-menu
                    :default-active="activeIndex"
                    class="menu-list"
                    mode="horizontal"
                    @select="handleSelect"
                >
                    <el-menu-item
                        v-for="item in $store.state.user.menuNav"
                        :key="item.index"
                        :index="item.id"
                        >{{ item.menuName }}</el-menu-item
                    >
                </el-menu>
            </div>

            <div class="header-information">
                <div class="right-menu">
                    <el-dropdown class="avatar-container" trigger="click">
                        <div class="avatar-wrapper">
                            <div class="avue-line">
                                <avue-avatar
                                    style="
                                        color: rgb(0, 98, 171);
                                        background-color: #eee;
                                        margin-right: 10px;
                                    "
                                    >U</avue-avatar
                                >
                            </div>
                            {{ $store.state.user.userInfo.userName }}
                        </div>
                        <el-dropdown-menu slot="dropdown" class="user-dropdown">
                            <router-link to="/editPassword">
                                <el-dropdown-item>
                                    <i class="el-icon-setting"></i>修改密码
                                </el-dropdown-item>
                            </router-link>
                            <el-dropdown-item divided @click.native="loginOut">
                                <span style="display: block"
                                    ><i class="el-icon-switch-button"></i>退出系统</span
                                >
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </el-header>
    </div>
</template>
<script>
import variables from '@/scss/variables.scss'
import GetRouter from '@/router/parse_routers'
import router from 'vue-router'

export default {
    name: 'Header',
    props: {},
    components: {},
    computed: {
        routes() {
            return this.$router.options.routes
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        variables() {
            return variables
        }
    },
    data() {
        return {
            activeIndex: '',
            isCollapse: true,
            input1: '',
            headerRouter: [],
            userNid: ''
        }
    },
    watch: {
        '$store.state.user.menuActive': function(n, o) {
            this.activeIndex = n
        },
        '$store.state.user.menuNav': function(n, o) {
            console.log(n)
        }
    },
    //方法集合
    methods: {
        flagFold() {
            this.$store.dispatch('app/toggleSideBar')
        },
        async loginOut() {
            await this.$store.dispatch('user/logout')
            this.$router.push('/login')
        },
        async handleSelect(key) {
            // console.log(key)
            // TODO 默认第一个菜单

            if (key == '100010007') {
                window.open(this.$store.state.user.menuNav[6].topath)
            } else if (this.$router && key == '100010001') {
                this.$router.push('/')
            } else {
                this.$store.commit('user/SET_MENUACTIVE', key)
                let list = await this.$store.dispatch('user/getLeftMenu')
                GetRouter(list)
                /* console.log(this.$store.state.user.leftMenu)
				console.log(this.$store.state.user.leftMenu[0].redirect)
				this.$router.push(this.$store.state.user.leftMenu[0].redirect) */
				this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // if (this.$router && key == '100010006') {
                //     // this.$router.push('/dictionaries/productCode')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // } else if (this.$router && key == '100010002') {
                //     // this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                //     this.$router.push('/productionYear')
                // } else if (this.$router && key == '100010003') {
                //     this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                //     // this.$router.push('/materialRecord/materialenterArena')
                // } else if (this.$router && key == '100010004') {
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                //     // this.$router.push('/qualityControl/productQuality')
                // } else if (this.$router && key == '100010005') {
                //     // this.$router.push('/environmentalProtection/abnormalMonitor')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // }
            }

            // this.getLeftMenu(key, this.$store.state.userInfo.userNid)
        },
        getTopNav() {
            if (this.$store.state.user.menuNav.length > 0) {
                this.headerRouter = this.$store.state.user.menuNav
            }
        }
    },
    created() {},
    mounted() {
        this.activeIndex = this.$store.state.user.menuActive
        this.getTopNav()
    }
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
@import '@/scss/variables';
::v-deep.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    flex: 0 0 auto;
    position: fixed;
    top: 0px;
    background: #fff;
    z-index: 999;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: width 0.3s;
}
::v-deep.el-menu-demo {
    display: flex;
    justify-content: center;
}

.header {
    background: #fff;

    .unfold {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20px;
        .unfold-icon {
            /* color: #fff; */
            font-size: 1.5em;
            cursor: pointer;
        }
    }
    .header-menu {
        display: flex;
    }
    .menu-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;
        margin-right: 10px;
        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            margin-right: 30px;

            .avatar-wrapper {
                display: flex;
                align-items: center;
                position: relative;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                .user-avatar {
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
