<template>
    <div class="ring">
        <div class="ring-title">
            <span>报警点位</span>
            <span>触发时间</span>
        </div>
        <vue-seamless-scroll :data="dataList" class="warp" :class-option="classOption">
            <ul class="item">
                <li v-for="(item, index) in dataList" :key="index">
                    <span class="title-text" v-text="item.alarmPoint" @click="push()"></span>
                    <span class="date-text" v-text="item.triggerTime"></span>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    name: 'name',
    props: {
        myData: {
            type: Array
        }
    },
    components: {
        vueSeamlessScroll
    },
    data() {
        return {
            dataList: [],
            classOption: {
                singleHeight: 30,
                step: 1
            }
        }
    },
    created() {},
    mounted() {
    },
    computed: {},
    watch: {
        myData(n, o) {
            this.dataList = n
            console.log(n)
        }
    },
    methods: {
        push() {
            window.open('https://baidu.com')
        }
    },
    activated() {}
}
</script>


<style lang="less" scoped>
.ring {
    width: 100%;
    height: 100%;
}
.ring-title {
    display: flex;
    justify-content: space-between;
    margin: 4% 4% 0 4%;
    color: #fff;
    padding: 0 20px;
    background: rgba(8, 90, 111, 0.2);
    height: 30px;
    line-height: 30px;
}
.warp {
    height: 58%;
    width: 92%;
    margin: 0 4%;
    overflow: hidden;
    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        li {
            display: flex;
            justify-content: space-between;
            height: 30px;
            line-height: 30px;
            padding: 0 20px;
        }
        li:nth-child(odd) {
            background: rgba(14, 86, 241, 0.08);
        }
        a {
            display: block;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
        }
    }
    .title-text {
        width: 200px;
        color: rgb(154, 168, 212);
        font-size: 14px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
    }
    .date-text {
        color: rgb(154, 168, 212);
        font-size: 14px;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
    }
}
</style>
