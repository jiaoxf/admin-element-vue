<template>
  <div class='index-content'>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div class="first-box">
          销售额
          22222
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div class="second-box">
          销售额
          22222
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div class="three-box">
          销售额
          22222
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <div class="four-box">
          销售额
          22222
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" :offset="4">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 class="medium">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    
  </div>
</template>
<script>

export default {
  name: 'name',
  props: {

  },
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {

    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {

  },
  created() {

  },
  mounted() {

  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  updated() {}, //生命周期 - 更新之后
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.index-content{
  padding: 0;
  margin: 0;
  .first-box, .second-box, .three-box, .four-box{
    border-radius: 10px;
    margin: 10px 0;
    height: 160px;
  }
  .first-box{
    background: #659999;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f4791f, #659999);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f4791f, #659999); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .second-box{
    background: #56CCF2;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .three-box{
    background: #BE93C5;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #7BC6CC, #BE93C5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #7BC6CC, #BE93C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  }
  .four-box{
    background: #ff4b1f;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff9068, #ff4b1f);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff9068, #ff4b1f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .el-carousel__item{
    border-radius: 10px;
    height: 220px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 220px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}

</style>