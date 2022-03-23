<template>
    <div class="">
        <vue-seamless-scroll :data="listData" class="warp" :class-option="classOption">
            <ul class="item">
                <li v-for="(item, index) in listData" :key="index">
                    <span class="title-text" v-text="item.title" @click="push()"></span>
                    <span class="date-text" v-text="item.date"></span>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>
<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
    name: 'name',
    props: {},
    components: {
        vueSeamlessScroll
    },
    data() {
        return {
            listData: [
                {
                    title: '无缝滚动第一行无缝滚动第一行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第二行无缝滚动第二行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第三行无缝滚动第三行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第四行无缝滚动第四行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第五行无缝滚动第五行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第六行无缝滚动第六行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第七行无缝滚动第七行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第八行无缝滚动第八行',
                    date: '2017-12-16'
                },
                {
                    title: '无缝滚动第九行无缝滚动第九行',
                    date: '2017-12-16'
                }
            ],
            classOption: {
                singleHeight: 30
            }
        }
    },
    created() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        push() {
            window.open('https://baidu.com')
        }
    },
    activated() {}
}
</script>
<style lang='scss' scoped>
/* @import ''; // 引入公共css类*/
.warp {
    height: 270px;
    width: 400px;
    margin: 0 auto;
    overflow: hidden;
    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;
        li {
            background: rgb(17, 39, 76);
			height: 30px;
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
        color: rgb(154, 168, 212);
        font-size: 14px;
    }
    .date-text {
        background: rgb(17, 39, 76);
        color: rgb(154, 168, 212);
        font-size: 14px;
    }
}
</style>
