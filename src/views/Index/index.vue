<template>
    <div style="height: 100%">
        <div class="headerdata">
            <div class="headerdata-title">龙蟒大地MES系统</div>
            <div class="selectRange">
                <el-menu
                    :default-active="activeIndex"
                    class="menu-list"
                    mode="horizontal"
                    @select="handleSelectMenu"
                >
                    <el-menu-item
                        v-for="item in $store.state.user.menuNav"
                        :key="item.index"
                        :index="item.id"
                        >{{ item.menuName }}</el-menu-item
                    >
                </el-menu>
            </div>
        </div>
        <div class="page">
            <page1 />
        </div>
    </div>
</template>

<script>
import page1 from './page1'
import GetRouter from '@/router/parse_routers'
export default {
    name: '',
    components: {
        page1
    },
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
            userNid: '',
            activeName: 'month', // 默认显示近一月
            modal: false,
            flag: false,
            selectRangeDate: [],
            startTime: '',
            endTime: '',
            optionStart: {
                disabledDate(date) {
                    // 禁止选择今天之后的日期
                    return date && date.valueOf() > Date.now() - 86400000
                }
            },
            optionEnd: {},
            resizeFn: null
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeFn)
        this.handleSelect(this.activeName) // 默认显示近一个月
        const documentWidth = document.body.offsetWidth
        const ratio = documentWidth / 1920
        if (documentWidth > 1920) {
            document.body.style.transform = `scale(${ratio}, ${ratio})`
        }
        this.resizeFn = this.$debounce(function() {
            const documentWidth = document.body.offsetWidth
            const ratio = documentWidth / 1920
            if (documentWidth > 1920) {
                document.body.style.transform = `scale(${ratio}, ${ratio})`
            }
        }, 200)
        window.addEventListener('resize', this.resizeFn)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeFn)
    },
    methods: {
        async handleSelectMenu(key) {
            console.log(key)
            if (key == '100010007') {
                console.log(this.$store.state.user.menuNav[6].topath)
                window.open(this.$store.state.user.menuNav[6].topath)
            } else if (key == '100010001') {
                this.$router.push('/')
            } else {
                this.$store.commit('user/SET_MENUACTIVE', key)
                let list = await this.$store.dispatch('user/getLeftMenu')
                GetRouter(list)
				this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // if (this.$router && key == '100010006') {
                //     // this.$router.push('/dictionaries/productCode')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // } else if (this.$router && key == '100010002') {
                //     // this.$router.push('/productionYear')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // } else if (this.$router && key == '100010003') {
                //     // this.$router.push('/materialRecord/materialenterArena')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
                // } else if (this.$router && key == '100010004') {
                //     // this.$router.push('/qualityControl/productQuality')
				// 	this.$router.push(this.$store.state.user.leftMenu[0].redirect)
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
        },
        pickStartDate(date) {
            // 选择开始时间的回调
            this.startTime = date
            this.optionEnd = {
                disabledDate(d) {
                    // 禁止选择开始时间之前的日期
                    return d && d.valueOf() < new Date(date).valueOf() - 86400000
                }
            }
        },
        pickEndDate(date) {
            // 选择结束时间的回调
            this.endTime = date
        },
        getMonthBetween(start, end) {
            // 获取开始时间和结束时间之内的所有月份
            this.selectRangeDate = []
            let s = start.split('-') // 字符串装换数组
            let e = end.split('-')
            let date = new Date()
            let min = date.setFullYear(s[0], s[1] - 1) // 设置最小时间
            let max = date.setFullYear(e[0], e[1] - 1) // 设置最大时间
            let curr = min
            while (curr <= max) {
                // 循环添加月份
                var month = curr.getMonth()
                var arr = [curr.getFullYear(), month + 1]
                this.selectRangeDate.push(arr)
                curr.setMonth(month + 1)
            }
        },
        getDays(day) {
            // 获取天数
            let arr = []
            for (let i = -day; i < 0; i++) {
                // 循环添加天数
                let today = new Date() // 获取今天
                let targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * i
                today.setTime(targetday_milliseconds) //设置i天前的时间
                let tYear = today.getFullYear()
                let tMonth = today.getMonth()
                let tDate = today.getDate()
                let date = [tYear, tMonth + 1, tDate]
                arr.push(date)
            }
            return arr
        },
        handleSelect(name) {
            switch (name) {
                case 'day':
                    break
                case 'week':
                    this.selectRangeDate = this.getDays(7) // 获取近一周的天数
                    this.flag = true

                    break
                case 'month':
                    this.selectRangeDate = this.getDays(30) // 获取近一个月的天数
                    this.flag = true
                    break
                case 'filter':
                    this.modal = true
                    break
                default:
                    break
            }
        }
    },
    watch: {
        '$store.state.user.menuActive': function(n, o) {
            this.activeIndex = n
        },
        '$store.state.user.menuNav': function(n, o) {
            console.log(n)
        }
    }
}
</script>

<style lang="sass" scoped>
// @import './index.less';
.headerdata
	height: 80px
	background: #03044a
	display: flex
	justify-content: space-between
	align-items: center

	&-title
		color: #75deef
		font-size: 30px
		letter-spacing: 10px
		margin-left: 5%

	.selectRange
		height: 100%
		display: flex
		justify-content: center
		align-items: center
		.ivu-menu-horizontal
			background: rgba(255, 255, 255, 0)

			&::after
				height: 0

			.ivu-menu-item-active
				border-bottom: 2px solid #264e5e

			.ivu-menu-item,
			.ivu-menu-submenu
				color: #75deef

				&:hover
					border-bottom: 2px solid #264e5e

			.ivu-select-dropdown
				background: #09102e

				.ivu-menu-item
					color: #75deef

					&:hover
						border-bottom: 2px solid #264e5e
						background-color: rgba(255, 255, 255, 0)

			.ivu-menu-submenu-title
				i
					margin-right: 0

				.ivu-icon-ios-arrow-down
					display: none

.page
	height: calc(100% - 80px)

// @import '~iview/src/styles/index.less';

.angle1
	display: inline-block
	position: absolute
	width: 10px
	height: 10px
	top: 0
	left: 0
	border-top: 1px solid #1c5ab3
	border-left: 1px solid #1c5ab3

.angle2
	display: inline-block
	position: absolute
	width: 10px
	height: 10px
	top: 0
	right: 0
	border-top: 1px solid #1c5ab3
	border-right: 1px solid #1c5ab3

.angle3
	display: inline-block
	position: absolute
	width: 10px
	height: 10px
	bottom: 0
	left: 0
	border-bottom: 1px solid #1c5ab3
	border-left: 1px solid #1c5ab3

.angle4
	display: inline-block
	position: absolute
	width: 10px
	height: 10px
	bottom: 0
	right: 0
	border-bottom: 1px solid #1c5ab3
	border-right: 1px solid #1c5ab3

::v-deep .el-menu
	background: #03044a

::v-deep .el-menu--horizontal > .el-menu-item
	color: #75deef

::v-deep .el-menu.el-menu--horizontal
	border-bottom: none

::v-deep .el-menu--horizontal .el-menu-item:hover
	background-color: none !important
</style>
