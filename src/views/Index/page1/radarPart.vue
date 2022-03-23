<template>
    <div class="main">
        <svg
            class="guideLine"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 783 500"
        >
            <!-- <image x="5%" y="20" :xlink:href="$images.center" width="90%" height="100%" /> -->

            <template v-if="isIE">

            </template>
            <template v-else>

            </template>
        </svg>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        // selectRangeDate: Array,
        _width: Number
    },
    data() {
        return {
			selectRangeDate:[
				[2022, 2, 8],[2022, 2, 9]
			],
            psychology: '',
            showPsychology: false,
            psychologyPercent: '',
            speech: '',
            showSpeech: false,
            speechPercent: '',
            showBisexual: false,
            showViolate: false,
            showIdeology: false,
            risk: '',
            showRisk: false,
            riskPercent: '',
            existOutOfControl: false,
            existRoot: false,
            existViolations: false,
            makeFriend: '',
            showMakeFriend: false,
            makeFriendPercent: '',
            timer1: null,
            entertainmentPreference: '',
            showEntertainmentPreference: false,
            entertainmentPreferencePercent: '',
            entertainmentPreferenceContent: '',
            internetPreference: '',
            showInternetPreference: false,
            internetPreferencePercent: '',
            internetPreferenceUrl: [],
            consumptionCharacteristics: '',
            showConsumptionCharacteristics: false,
            consumptionCharacteristicsPercent: '',
            status: false,
            timer: null,
            rid: null,
            index: 0,
            number: 0,
            length: 0,
            frames: 0,
            isIE: false,
            psychologicalRate: 0,
            speechRate: 0,
            internetPreferenceRate: 0,
            riskRate: 0,
            makeFriendRate: 0,
            entertainmentPreferenceRate: 0,
            consumptionCharacteristicsRate: 0,
            psychologicalStatus: false,
            speechStatus: false,
            internetPreferenceStatus: false,
            riskStatus: false,
            entertainmentPreferenceStatus: false,
            makeFriendStatus: false,
            consumptionCharacteristicsStatus: false,
            lineType: 'psychological'
        }
    },
    methods: {
        // mouseenter
        onmouseenter(e) {
            document.querySelectorAll('.text').forEach(item => (item.style.opacity = 0))
            document.querySelectorAll('.swap1').forEach(item => (item.style.strokeDashoffset = 130))
            document.querySelectorAll('.swap2').forEach(item => (item.style.strokeDashoffset = 190))
            document.querySelectorAll('.swap3').forEach(item => (item.style.strokeDashoffset = 240))
            document.querySelectorAll('.swap4').forEach(item => (item.style.strokeDashoffset = 295))
            cancelAnimationFrame(this.rid)
            this.rid = null
            clearTimeout(this.timer)
            this.timer = null
            this.animation(
                Number(e.currentTarget.id.substr(e.currentTarget.id.length - 1, 1)),
                true
            )
        },
        //mouseleave
        onmouseleave() {
            this.animation(1, false)
        },
        frame() {
            cancelAnimationFrame(this.rid)
            this.rid = null
            this.rid = requestAnimationFrame(this.frame)
            let line = document.querySelector('#line_' + this.index)
            line.style.strokeDashoffset = this.frames
            line.getPointAtLength(this.length - this.frames)
            line.getPointAtLength((this.length - this.frames + 2) % this.length)
            if (this.index > 1) {
                line = document.querySelector('#line_' + (this.index - 1))
                this.$refs['text_' + (this.index - 1)].style.opacity = 0
                line.style.strokeDashoffset = line.style.strokeDasharray
            }
            if (this.index == 1) {
                for (let i = 2; i < 8; i++) {
                    line = document.querySelector('#line_' + i)
                    this.$refs['text_' + i].style.opacity = 0
                    line.style.strokeDashoffset = line.style.strokeDasharray
                }
            }
            this.$refs['text_' + this.index].style.opacity = this.number
            this.number += 5 / this.length
            this.frames -= 5
            if (this.frames <= -5) {
                cancelAnimationFrame(this.rid)
                this.rid = null
            }
        },
        animation(i, boolean) {
            clearTimeout(this.timer)
            cancelAnimationFrame(this.rid)
            this.rid = null
            this.timer = null
            if (i > 7) {
                i = 1
            }
            this.psychologicalStatus = false
            this.speechStatus = false
            this.internetPreferenceStatus = false
            this.riskStatus = false
            this.entertainmentPreferenceStatus = false
            this.makeFriendStatus = false
            this.consumptionCharacteristicsStatus = false
            switch (i) {
                case 1:
                    this.psychologicalStatus = true
                    this.lineType = 'psychological'
                    break
                case 2:
                    this.speechStatus = true
                    this.lineType = 'speech'
                    break
                case 3:
                    this.internetPreferenceStatus = true
                    this.lineType = 'internet'
                    break
                case 4:
                    this.riskStatus = true
                    this.lineType = 'risk'
                    break
                case 5:
                    this.entertainmentPreferenceStatus = true
                    this.lineType = 'entertainment'
                    break
                case 6:
                    this.makeFriendStatus = true
                    this.lineType = 'social'
                    break
                case 7:
                    this.consumptionCharacteristicsStatus = true
                    this.lineType = 'consumption'
                    break
                default:
                    break
            }
            const line = document.querySelector('#line_' + i)
            this.length = line.getTotalLength()
            line.style.strokeDasharray = this.length
            line.style.strokeDashoffset = this.length
            this.frames = this.length
            this.index = i
            this.number = 0
            this.frame()
            if (boolean) {
                return
            } else {
                clearTimeout(this.timer)
                this.timer = null
                this.timer = setTimeout(() => {
                    this.animation(i + 1, boolean)
                }, 5000)
            }
        },
        // 中心图
        setChart() {
            clearTimeout(this.timer1)
            clearTimeout(this.timer)
            cancelAnimationFrame(this.rid)
            this.frames = 0
            this.rid = null
            this.timer = null
            this.timer1 = null
            this.timer1 = setTimeout(() => {
                this.animation(1, false)
            }, 10000)
        }
    },
    watch: {
        selectRangeDate: function() {
            this.setChart()
        }
    },
    created() {
        if (!window.SVGForeignObjectElement) {
            this.isIE = true
        }
    },
    beforeDestroy() {
        // 离开页面动画初始化
        document.querySelectorAll('.text').forEach(item => (item.style.opacity = 0))
        document.querySelectorAll('.swap1').forEach(item => (item.style.strokeDashoffset = 130))
        document.querySelectorAll('.swap2').forEach(item => (item.style.strokeDashoffset = 190))
        document.querySelectorAll('.swap3').forEach(item => (item.style.strokeDashoffset = 240))
        document.querySelectorAll('.swap4').forEach(item => (item.style.strokeDashoffset = 295))
        cancelAnimationFrame(this.rid)
        this.rid = null
        clearTimeout(this.timer)
        clearTimeout(this.timer1)
        this.timer = null
        this.timer1 = null
        this.psychologicalStatus = false
        this.speechStatus = false
        this.internetPreferenceStatus = false
        this.riskStatus = false
        this.entertainmentPreferenceStatus = false
        this.makeFriendStatus = false
        this.consumptionCharacteristicsStatus = false
    },
    mounted() {
        this.setChart()
    }
}
</script>


<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    position: relative;

    .guideLine {
        width: 100%;
        height: 100%;

        #textBox_1 {
            opacity: 0;
        }

        .title_1 {
            font-size: 15px;
            cursor: pointer;

            .title-text-box {
                background: rgba(0, 0, 0, 0);
                justify-content: center; //子元素水平居中
                align-items: center; //子元素垂直居中
                display: -webkit-flex;
                height: 100%;

                p {
                    width: 100%;
                    background: rgba(0, 0, 0, 0);
                    color: #a0e8ff;
                    font-size: 15px;
                    text-align: center;

                    .titleText {
                        margin-left: -5px;
                        font-size: 15px;
                        display: block;
                    }

                    /deep/ .ivu-rate {
                        font-size: 14px;

                        .ivu-rate-star {
                            margin-right: 6px;
                        }
                    }
                }
            }
        }

        .text {
            opacity: 0;
            color: #fff;
            font-size: 15px;
            text-align: center;

            .text-box {
                background: rgba(0, 0, 0, 0);
                justify-content: center; //子元素水平居中
                align-items: center; //子元素垂直居中
                display: -webkit-flex;

                .promptBox {
                    width: 100%;
                    height: 100%;
                    padding: 10px 20px;

                    .promptTitle {
                        color: #fff;
                        font-size: 16px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    p {
                        background: rgba(0, 0, 0, 0);
                        color: #a0e8ff;
                        font-size: 16px;
                        text-align: left;
                    }
                }

                .psychologyContent {
                    color: #afe5fb;
                    font-size: 16px;
                    text-align: left;

                    div {
                        line-height: 2em;

                        span {
                            &:first-child {
                                color: #fed723;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }

        .swap1 {
            stroke-dasharray: 130;
            stroke-dashoffset: 130;
        }

        .swap2 {
            stroke-dasharray: 190;
            stroke-dashoffset: 190;
        }

        .swap3 {
            stroke-dasharray: 240;
            stroke-dashoffset: 240;
        }

        .swap4 {
            stroke-dasharray: 295;
            stroke-dashoffset: 295;
        }

        .circle-point {
            &:hover {
                fill: #000;
            }
        }

        // .swap4{
        // stroke-dasharray: 110;
        // stroke-dashoffset: 110;
        // }
    }
}
</style>
