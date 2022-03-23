<template>
    <div class="worldMap"></div>
</template>

<script>
// import 'echarts/map/js/world.js'

export default {
    name: 'webpies',
    data() {
        return {}
    },
    methods: {
        // 通讯行为分析
        setChart() {
            var data = [
                {
                    name: '硫酸',
                    value: 54
                },
                {
                    name: '工业MAP',
                    value: 44
                },
                {
                    name: '合成氢',
                    value: 35
                },
                {
                    name: '磷酸（AE%）',
                    value: 30
                }
            ]

            var titleArr = [],
                seriesArr = []
            let colors = [
                ['#389af4', '#dfeaff'],
                ['#357EDF', '#ffdcc3'],
                ['#08AEF7', '#aed7f5'],
                ['#0163E4', '#02A6F5']
            ]
            data.forEach(function(item, index) {
                titleArr.push({
                    text: item.name,
                    left: index * 20 + 20 + '%',
                    bottom: '0%',
                    textAlign: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: '12',
                        color: colors[index][0],
                        textAlign: 'center'
                    }
                })
                seriesArr.push({
                    name: item.name,
                    type: 'pie',
                    clockWise: false,
                    radius: [40, 32],
                    itemStyle: {
                        normal: {
                            color: colors[index][0],
                            shadowColor: colors[index][0],
                            shadowBlur: 0,
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    hoverAnimation: false,
                    center: [index * 20 + 20 + '%', '50%'],
                    data: [
                        {
                            value: item.value,
                            label: {
                                normal: {
                                    formatter: function(params) {
                                        return params.value + '%'
                                    },
                                    position: 'center',
                                    show: true,
                                    textStyle: {
                                        fontSize: '16',
                                        color: colors[index][0]
                                    }
                                }
                            }
                        },
                        {
                            value: 100 - item.value,
                            name: 'invisible',
                            itemStyle: {
                                normal: {
                                    color: colors[index][1]
                                },
                                emphasis: {
                                    color: colors[index][1]
                                }
                            }
                        }
                    ]
                })
            })
            let option = {
                title: titleArr,
                series: seriesArr
            }
            let myChart = this.$echarts(this.$el)

            myChart.clear()
            myChart.resize()
            myChart.setOption(option)
        }
    },
    mounted() {
        this.setChart()
    }
}
</script>

<style lang="less" scoped>
.worldMap {
    width: 100%;
    height: 50%;
}
</style>
