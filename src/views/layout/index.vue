<template>
  <div class="home">
    <el-container>
      <left-menu />
      <Header/>
      <el-container>
        <el-main>
          <div class="main-content">
            <router-view />
          </div>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>

import LeftMenu from '@/views/layout/components/LeftMenu'
import Header from '@/views/layout/components/Header'
export default {
  name: "Layout",
  components: {
    LeftMenu,
    Header
  }
}
</script>
<style lang="scss" scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 0;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    /* line-height: 160px; */
    padding: 0;
    position: absolute;
    left: 230px;
    right: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    .main-content{
      margin:20px;
      background: #fff;
      border-radius: 6px;
      min-height: calc(100vh - 100px);
    }
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

