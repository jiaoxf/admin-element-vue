<template>
  <div class='header'>
    <el-header>
      <div class="unfold" >
        <i class="unfold-icon" :class="[ $store.state.foldMenu ? 'el-icon-s-unfold': 'el-icon-s-fold']" @click="flagFold"></i>
      </div>
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect" 
      background-color="#fff" 
      text-color="#3D80FF" 
      active-text-color="#3D80FF"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
    </el-header>
  </div>
</template>
<script>

export default {
  name: 'Header',
  props: {

  },
//import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    return {
      activeIndex: '1',
      isCollapse: true,
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    flagFold(){
      this.$store.commit('flodMenu')
    }
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
@import '@/scss/_var';
::v-deep.el-header{
  display: flex;
  padding:0;
}
.header{
  background: #fff;
  
  .unfold{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    .unfold-icon{
      /* color: #fff; */
      font-size: 1.5em;
      cursor: pointer;
    }
  }
}
</style>