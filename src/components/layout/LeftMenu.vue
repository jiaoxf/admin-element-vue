<template>
  <div class='left-aside'>
    <el-aside width="100%">
      <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen" 
      @close="handleClose" 
      :collapse="$store.state.foldMenu">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">
            <router-link to="/">首页</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">
            <router-link to="components">组件</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">
            <router-link to="components">组件</router-link>
          </span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">表单</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">富文本</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title">权限</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
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
      // isCollapse: true,
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
//方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: $aside-width;
  min-height: 400px;
  text-align: left;
}
.left-aside{
  height: calc(100vh - 60px) ;
}
</style>