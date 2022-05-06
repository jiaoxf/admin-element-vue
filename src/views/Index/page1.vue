<template>
    <div class="page1">
        <div class="listTop" :span="8">
            <el-col :span="8">
                <div class="leftTop">
                    <span class="title"><span class="title-6">生产统计</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <div class="left1">
                        <double-area :selectRangeDate="selectRangeDate" ref="chart1"></double-area>
                    </div>
                </div>
                <div class="leftTop1">
                    <span class="title"><span class="title-6">盘库情况</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <div class="left1">
                        <line-bar :selectRangeDate="selectRangeDate" ref="chart2"></line-bar>
                    </div>
                </div>
                <div class="leftTop2">
                    <span class="title"><span class="title-6">生产指标异常统计</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <div class="left1">
                        <broken-line :selectRangeDate="selectRangeDate" ref="chart3"></broken-line>
                    </div>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="leftCenter">
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <div class="left1"></div>
                </div>
                <!-- <radar-part ref="chart6"></radar-part> -->
                <div class="center-img">
                    <img src="../../assets/background.png" alt="" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="rightTop-1">
                    <span class="title"><span class="title-8">产品完成率</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <web-pies ref="chart7"></web-pies>
                    <web-pies ref="chart7"></web-pies>
                </div>
                <div class="rightTop-2">
                    <span class="title"><span class="title-6">调度指令信息</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <ring ref="chart9" :myData="data5"></ring>
                </div>
                <div class="rightTop-3">
                    <span class="title"><span class="title-8">视频监控</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
					<iframe class="iframe-vedio" src="http://172.28.1.1:3000/?%E8%A7%86%E9%A2%91" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="rightTop-4">
                    <span class="title"><span class="title-8">指标报警信息</span></span>
                    <span class="angle1"></span>
                    <span class="angle2"></span>
                    <span class="angle3"></span>
                    <span class="angle4"></span>
                    <environmental ref="chart10" :myData="alarmData"></environmental>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>
const doubleArea = () => import('./page1/doubleArea.vue')
const webPies = () => import('./page1/webPies.vue')
const ring = () => import('./page1/ring')
const lineBar = () => import('./page1/lineBar')
const brokenLine = () => import('./page1/brokenLine')
const environmental  = () => import('./page1/environmental.vue')
export default {
    name: 'page1',
    props: {
        selectRangeDate: Array
    },
    components: {
        doubleArea, // 面积图
        webPies, // 世界地图
        ring, // 圆环
        lineBar, //柱图
        brokenLine,
		environmental // 环保
    },
    data() {
        return {
            data1: {
                // 柱图数据1
                name: '柱图数据1',
                number: '100次',
                data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
                color: '192,35,42',
                value: [60, 50, 40, 30, 20]
            },
            data2: {
                // 饼图数据1
                title: '饼图数据1分类占比',
                color: '#BE232A',

                data: [
                    {
                        value: 60,
                        name: '分类1',
                        itemStyle: {
                            color: '#a262f2'
                        }
                    },
                    {
                        value: 20,
                        name: '分类2',
                        itemStyle: {
                            color: '#2ca8fe'
                        }
                    },
                    {
                        value: 80,
                        name: '分类3',
                        itemStyle: {
                            color: '#feac2c'
                        }
                    },
                    {
                        value: 40,
                        name: '分类4',
                        itemStyle: {
                            color: '#c0232a'
                        }
                    },
                    {
                        value: 40,
                        name: '分类5',
                        itemStyle: {
                            color: '#2cd9fe'
                        }
                    },
                    {
                        value: 40,
                        name: '分类6',
                        itemStyle: {
                            color: '#ff787e'
                        }
                    },
                    {
                        value: 30,
                        name: '其他',
                        itemStyle: {
                            color: '#252448'
                        }
                    }
                ]
            },
            data3: {
                // 柱图数据2
                name: '柱图数据2',
                number: '100次',
                data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
                color: '40,112,232',
                value: [6, 5, 4, 3, 2]
            },
            // 饼图数据2
            data4: {
                title: '饼图数据2分类占比',
                color: '#2C7BFE',
                data: [
                    {
                        value: 20,
                        name: '分类1',
                        itemStyle: {
                            color: '#feed2c'
                        }
                    },
                    {
                        value: 20,
                        name: '分类2',
                        itemStyle: {
                            color: '#2ca8fe'
                        }
                    },
                    {
                        value: 40,
                        name: '分类3',
                        itemStyle: {
                            color: '#feac2c'
                        }
                    },
                    {
                        value: 40,
                        name: '分类4',
                        itemStyle: {
                            color: '#2c7bfe'
                        }
                    },
                    {
                        value: 100,
                        name: '其他',
                        itemStyle: {
                            color: '#252448'
                        }
                    }
                ]
            },
            // 环形图数据
            data5: [],
            // 环形数据2
            data6: {
                title: '热词传播次数',
                data: [
                    {
                        value: 335,
                        name: '模拟1',
                        itemStyle: {
                            color: '#69f262'
                        }
                    },
                    {
                        value: 310,
                        name: '模拟2',
                        itemStyle: {
                            color: '#c0232a'
                        }
                    },
                    {
                        value: 234,
                        name: '模拟3',
                        itemStyle: {
                            color: '#2cfcfe'
                        }
                    },
                    {
                        value: 135,
                        name: '其他',
                        itemStyle: {
                            color: '#252448'
                        }
                    },
                    {
                        value: 200,
                        name: '模拟4',
                        itemStyle: {
                            color: '#a262f2'
                        }
                    }
                ]
            },
            data7: {
                title: '收支笔数及占比',
                data: [
                    {
                        value: 70,
                        name: '收入',
                        itemStyle: {
                            color: '#c0232a'
                        }
                    },
                    {
                        value: 60,
                        name: '支出',
                        itemStyle: {
                            color: '#2870e8'
                        }
                    }
                ],
                data1: [
                    {
                        value: 40,
                        name: '红包',
                        itemStyle: {
                            color: '#c0232a'
                        }
                    },
                    {
                        value: 60,
                        name: '转账',
                        itemStyle: {
                            color: '#2870e8'
                        }
                    }
                ]
            },
            data8: {
                title: '收支金额及占比',
                data: [
                    {
                        value: 80,
                        name: '收入',
                        itemStyle: {
                            color: '#c0232a'
                        }
                    },
                    {
                        value: 60,
                        name: '支出',
                        itemStyle: {
                            color: '#2870e8'
                        }
                    }
                ],
                data1: [
                    {
                        value: 40,
                        name: '红包',
                        itemStyle: {
                            color: '#c2232a'
                        }
                    },
                    {
                        value: 60,
                        name: '购物',
                        itemStyle: {
                            color: '#fe672c'
                        }
                    },
                    {
                        value: 40,
                        name: '旅游',
                        itemStyle: {
                            color: '#a262f2'
                        }
                    },
                    {
                        value: 20,
                        name: '其他',
                        itemStyle: {
                            color: '#2870e8'
                        }
                    },
                    {
                        value: 80,
                        name: '交通',
                        itemStyle: {
                            color: '#feed2c'
                        }
                    }
                ]
            },
            // 交友分析面积图
            configData9: {
                title: '【交友分析】',
                color: '#75deef',
                name: ['（人）', '（人）'],
                data: [
                    {
                        name: '新增好友数',
                        color: ['#feed2c', '#353103'],
                        data: [240, 132, 101, 134, 90, 170, 110]
                    },
                    {
                        name: '好友总数',
                        color: ['#2871ea', '#0a1b41'],
                        data: [20, 102, 101, 134, 190, 150, 120]
                    },
                    {
                        name: '新增群数',
                        color: ['#935adf', '#230f3e'],
                        data: [100, 32, 101, 134, 150, 110, 180]
                    },
                    {
                        name: '群总数',
                        color: ['#e65f2d', '#551f0b'],
                        data: [120, 122, 141, 144, 60, 220, 120]
                    }
                ]
            },
            // 交友方式柱图
            colorsData: [
                {
                    itemStyle: {
                        color: '#2c7bfe'
                    },
                    name: '漂流瓶',
                    value: 255
                },
                {
                    itemStyle: {
                        color: '#c2232a'
                    },
                    name: '附近的人',
                    value: 212
                },
                {
                    itemStyle: {
                        color: '#feed2c'
                    },
                    name: '雷达',
                    value: 155
                },
                {
                    itemStyle: {
                        color: '#a262f2'
                    },
                    name: '摇一摇',
                    value: 55
                },
                {
                    itemStyle: {
                        color: '#62d5f2'
                    },
                    name: '搜索',
                    value: 80
                },
                {
                    itemStyle: {
                        color: '#fe672c'
                    },
                    name: '群聊',
                    value: 160
                },
                {
                    itemStyle: {
                        color: '#69f262'
                    },
                    name: '扫一扫',
                    value: 114
                },
                {
                    itemStyle: {
                        color: '#2ca8fe'
                    },
                    name: '其他',
                    value: 20
                }
            ],
			alarmData:[],
            resizeFn: null
        }
    },
    methods: {
		getHomeDirectiveList(){
			this.$api.homeDirectiveList().then(res => {
                if (res.code == 'SUCCESS') {
					this.data5 = res.data
                }
            })
		},
		getHomeAlarmList(){
			this.$api.homeAlarmList().then(res => {
                if (res.code == 'SUCCESS') {
					this.alarmData = res.data
                }
            })
		}
	},
    watch: {
        selectRangeDate: function() {
            for (let i = 1; i < 18; i++) {
                this.$refs['chart' + i].setChart()
            }
        }
    },
    mounted() {
        this.resizeFn = this.$debounce(() => {
            // 通过捕获系统的onresize事件触发我们需要执行的事件
            for (let i = 1; i < 18; i++) {
                this.$refs['chart' + i].setChart()
            }
        }, 500)
        window.addEventListener('resize', this.resizeFn)
		this.getHomeDirectiveList() // 调度指令
		this.getHomeAlarmList()  // 指标报警信息
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeFn)
    }
}
</script>

<style lang="less">
@import url('./index.less');
.page1 {
    height: 100%;
    width: 100%;
    padding: 14px 20px 20px;
    background: #03044a;
    overflow: hidden;
    .listTop {
        height: 100%;

        .el-col {
            height: 100%;

            .leftTop {
                width: 100%;
                height: 33%;
                border: 1px solid #0d2451;
                position: relative;

                .left1 {
                    margin-top: 5%;
                    width: 100%;
                    height: 80%;
                }
            }
            .leftTop1 {
                width: 100%;
                height: 31%;
                border: 1px solid #0d2451;
                position: relative;
                margin-top: 5%;
                .left1 {
                    margin-top: 5%;
                    width: 100%;
                    height: 80%;
                }
            }
            .leftTop2 {
                width: 100%;
                height: 30%;
                border: 1px solid #0d2451;
                position: relative;
                margin-top: 4%;
                margin-bottom: 4%;
                .left1 {
                    margin-top: 5%;
                    width: 100%;
                    height: 80%;
                }
            }

            .rightTop-1 {
                width: 100%;
                height: 30%;
                border: 1px solid #0d2451;
                position: relative;
            }

            .rightTop-2 {
                width: 100%;
                margin-top: 5%;
                height: 20%;
                border: 1px solid #0d2451;
                position: relative;
                .rightTop-list {
                    width: 100%;
                    height: 100%;

                    .list {
                        width: 30%;
                        height: 100%;
                        float: left;

                        &:first-child {
                            width: 40%;
                        }
                    }
                }
            }
            .rightTop-3 {
                width: 100%;
                margin-top: 5%;
                height: 20%;
                border: 1px solid #0d2451;
                position: relative;
                .rightTop-list {
                    width: 100%;
                    height: 100%;

                    .list {
                        width: 30%;
                        height: 100%;
                        float: left;

                        &:first-child {
                            width: 40%;
                        }
                    }
                }
            }
            .rightTop-4 {
                width: 100%;
                margin-top: 5%;
                height: 20%;
                border: 1px solid #0d2451;
                position: relative;
                .rightTop-list {
                    width: 100%;
                    height: 100%;

                    .list {
                        width: 30%;
                        height: 100%;
                        float: left;

                        &:first-child {
                            width: 40%;
                        }
                    }
                }
            }
        }
    }

    .listBottom {
        height: 34%;

        .el-col-9 {
            width: 33.5%;
            margin-right: 0.6667%;
        }

        .el-col-4 {
            width: 17.66667%;
            margin-right: 0.6667%;
        }

        .el-col {
            height: 100%;

            .content {
                margin-top: 30px;
                height: calc(~'100% - 30px');
                height: 300px;
                border: 1px solid #0d2451;
                position: relative;

                .el-row {
                    &.topLine {
                        height: 55%;
                    }

                    &.bottomPie {
                        height: 45%;
                    }

                    .el-col {
                        height: 100%;

                        .charts-list {
                            height: 100%;
                            width: 100%;
                        }
                    }
                }

                .behavior {
                    width: 100%;
                    height: 100%;
                }

                .appUse {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .center-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90vh;
        padding: 0 40px;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    .video-box {
        width: 100%;
        height: 100%;
    }
	.iframe-vedio{
		width: 100%;
		height: 100%;
		padding-top: 20px;
	}
}
</style>
