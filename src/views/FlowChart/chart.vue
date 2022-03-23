<template>
    <div class="">
        <div class="act-form">
            <iframe :src="url" frameborder="0" allowfullscreen></iframe>
        </div>
    </div>
</template>
<script>
export default {
    name: 'name',
    props: {},
    components: {},
    data() {
        return {
            url: ''
        }
    },
    created() {},
    mounted() {
        console.log(this.$route.meta.iframePath)
		this.url = this.$route.meta.iframePath
    },
    computed: {},
    watch: {
        $route: function(n, o) {
            console.log(n.meta)
            setTimeout(() => {
                this.url = n.meta.iframePath
            }, 1000)
        }
    },
    methods: {},
    activated() {}
}
</script>
<style lang='scss' scoped>
/* @import ''; // 引入公共css类*/
.act-form {
    margin: 0 auto;
    text-align: center;
    /* padding: 20px; */
    iframe {
        width: 100%;
        height: calc(100vh - 100px);
    }
}
</style>
