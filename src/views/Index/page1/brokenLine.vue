<template>
    <div class="brokenLine"></div>
</template>

<script>
const echarts = require('echarts')
export default {
    name: '',

    data() {
        return {
            selectRangeDate: [
                [2022, 2, 8],
                [2022, 2, 9]
            ]
        }
    },
    methods: {
        // 上网行为分析
        setChart() {
            var fontColor = '#30eee9'
            let option = {
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '10%',
                    bottom: '5%',
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: 'item'
                },
                legend: {
                    show: true,
                    x: 'center',
                    y: '35',
                    icon: 'stack',
                    itemWidth: 10,
                    itemHeight: 10,
                    textStyle: {
                        color: '#1bb4f6'
                    },
                    data: ['生产指标异常统计']
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            color: fontColor
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#397cbc'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#195384'
                            }
                        },
                        data: [
                            '1月',
                            '2月',
                            '3月',
                            '4月',
                            '5月',
                            '6月',
                            '7月',
                            '8月',
                            '9月',
                            '10月',
                            '11月',
                            '12月'
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '（个）',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#186afe'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#186afe'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#11366e'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '已发布',
                        type: 'line',
                        stack: '总量',
                        symbol: 'circle',
                        symbolSize: 8,

                        itemStyle: {
                            normal: {
                                color: '#00d4c7',
                                lineStyle: {
                                    color: '#00d4c7',
                                    width: 1
                                },
                                areaStyle: {
                                    //color: '#94C9EC'
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                        {
                                            offset: 0,
                                            color: 'rgba(7,44,90,0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(0,212,199,0.9)'
                                        }
                                    ])
                                }
                            }
                        },
                        data: [220, 182, 500, 234, 290, 330, 310, 201, 154, 190, 330, 410]
                    }
                ]
            }
            let myChart = this.$echarts(this.$el)
            myChart.clear()
            myChart.resize()
            myChart.setOption(option)
        }
    },
    watch: {
        selectRangeDate: function() {
            // 检测selectRangeDate 数据变化
            this.setChart()
        }
    },
    mounted() {
        this.setChart()
    }
}
</script>

<style lang="less" scoped>
.brokenLine {
    width: 100%;
    height: 100%;
}
</style>
