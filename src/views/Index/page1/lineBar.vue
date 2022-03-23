<template>
    <div style="height: 100%"></div>
</template>

<script>
const echarts = require('echarts')
export default {
    name: '',
    data() {
        return {}
    },
    methods: {
        // 应用使用行为
        setChart() {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '14%',
                    top: '16%',
                    containLabel: true
                },
                legend: {
                    data: ['硫磺','98%硫磺'],
                    right: 10,
                    top: 12,
                    textStyle: {
                        color: '#fff'
                    },
                    itemWidth: 12,
                    itemHeight: 10
                    // itemGap: 35
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        // interval: 0,
                        // rotate: 40,
                        textStyle: {
                            fontFamily: 'Microsoft YaHei'
                        }
                    }
                },

                yAxis: {
                    type: 'value',
                    max: '1200',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    },
                    axisLabel: {}
                },
                dataZoom: [
                    {
                        show: true,
                        height: 12,
                        xAxisIndex: [0],
                        bottom: '8%',
                        start: 10,
                        end: 90,
                        handleIcon:
                            'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'
                    },
                    {
                        type: 'inside',
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ],
                series: [
                    {
                        name: '硫磺',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#fccb05'
                                    },
                                    {
                                        offset: 1,
                                        color: '#f5804d'
                                    }
                                ]),
                                barBorderRadius: 12
                            }
                        },
                        data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
                    },
                   /*  {
                        name: '2',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#8bd46e'
                                    },
                                    {
                                        offset: 1,
                                        color: '#09bcb7'
                                    }
                                ]),
                                barBorderRadius: 11
                            }
                        },
                        data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
                    }, */
                    {
                        name: '98%硫磺',
                        type: 'bar',
                        barWidth: '15%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#248ff7'
                                    },
                                    {
                                        offset: 1,
                                        color: '#6851f1'
                                    }
                                ]),
                                barBorderRadius: 11
                            }
                        },
                        data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
                    }
                ]
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
</style>
