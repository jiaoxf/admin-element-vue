<template>
    <div class="doubleArea"></div>
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
            let option = {
                grid: {
                    top: '15%',
                    right: '3%',
                    left: '10%',
                    bottom: '25%'
                },
                xAxis: [
                    {
                        type: 'category',
                        color: '#fff',
                        data: [
                            '饲料级磷酸氢钙',
                            '粉状磷酸一铵',
                            '肥料级磷酸氢钙',
                            '工业级磷酸氢钙',
                            '水溶性磷铵',
                            '班级满班率',
                            '复合肥',
                            '大量元素水溶肥'
                        ],
                        axisPointer: {
                            type: 'line'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            margin: 40,
                            color: '#fff',
                            textStyle: {
                                fontSize: 10
                            }
                        },
                        axisLabel: {
                            //展示角度
                            rotate: 45
                        }
                    }
                ],
                yAxis: [
                    {
                        min: 0,
                        max: 100,
                        axisLabel: {
                            formatter: '{value}',
                            color: '#fff'
                        },
                        axisLine: {
                            show: false
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#001961'
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        data: [100, 90, 10, 90, 90, 20, 56, 89],
                        barWidth: '12px',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: '#41E1D4' // 0% 处的颜色
                                        },
                                        {
                                            offset: 1,
                                            color: '#10A7DB' // 100% 处的颜色
                                        }
                                    ],
                                    false
                                ),
                                barBorderRadius: [30, 30, 0, 0],
                                shadowColor: 'rgba(0,255,225,1)',
                                shadowBlur: 4
                            }
                        },
                        label: {
                            normal: {
                                show: true, //开启显示
                                position: 'top', //在上方显示
                                textStyle: {
                                    //数值样式
                                    color: '#10A7DB',
                                    fontSize: 14
                                }
                            }
                        }
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
.doubleArea {
    width: 100%;
    height: 100%;
}
</style>
