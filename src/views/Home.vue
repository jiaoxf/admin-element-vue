<template>
  <div class="home">
    <Header/>
    <el-container>
      <left-menu />
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

import LeftMenu from '@/components/layout/LeftMenu'
import Header from '@/components/layout/Header.vue'
export default {
  name: "Home",
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
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    .main-content{
      padding: 20px;
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

