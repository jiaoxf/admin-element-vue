<template>
  <div class='left-aside'>
    <el-aside width="100%" height="100%">
      
      <el-menu
        class="el-menu-vertical-demo"
        @open="handleOpen" 
        background-color="#3D80FF"
        text-color="#fff"
        active-text-color="#ffd04b"
        @close="handleClose" 
        :collapse-transition="false"
        :collapse="$store.state.foldMenu"
      >
        <div class="header-title">
          <icon-font name="vue" style="padding:0" :iconStyle="{ width: '1.5rem', 'height': '1.5rem'}"/>
          XX科技xxxxx
        </div>
        <template v-for="item in $router.options.routes">
          <router-link v-if="item.children.length===1 && !item.children[0].children && !item.alwaysShow" :to="'/'+item.children[0].path" :key="item.children[0].name">
            <el-menu-item index="2">
                <i :class="item.children[0].meta.icon"></i>
                <span slot="title" v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-else :index="item.name||item.path" :key="item.name">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span slot="title" v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group v-for="(child, i) in item.children" :key="i">
              <sidebar-menu :is-nest="true" class="nest-menu" v-if="child.children && child.children.length>0" :routes="[child]" :key="child.path"></sidebar-menu>
              <router-link :to="item.path+'/'+child.path" :key="child.name">
                <el-menu-item :index="item.path+'/'+child.path">
                  <span slot="title" v-if="child.meta && child.meta.title">{{ child.meta.title }}</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
// import SideMenu from '@/views/layout/components/SideMenu'
import IconFont from '@/components/component/IconFont'
export default {
  name: 'name',
  props: {

  },
  components: {
    // SideMenu
    IconFont
  },
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
    // console.log(this.$router.options.routes)
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
  min-height: calc(100vh - 60px);
  text-align: left;
}
.el-menu--collapse{
  width: 64px;
  height:100vh;
}
.left-aside{
  /* height: calc(100vh - 60px) ; */
  background: #3D80FF;
  .header-title{
    position: relative;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
    /* width: $aside-width; */
    background: #3D80FF;
    line-height: 60px;
    height: 60px;
    overflow: hidden;
    text-align: left;
    padding: 0 20px;
  }
  .el-menu{
    border-right: none;
  }
  .el-menu-vertical-demo{
    
    ::v-deep.el-menu-item{
      a{
        display: inline-block;
        height: 100%;
        width: 90%;
      }
    }
  }
  .el-menu-item.is-active {
    border-left: 6px solid #ffd04b;
    background: #6681FA!important;
  }
}
</style>