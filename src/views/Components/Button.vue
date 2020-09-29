<template>
  <div class="element-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16" class="component-content">
        <div class="content-box">
          <el-divider content-position="left">
            Button 按钮
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/button"
            >
              文档
            </a>
          </el-divider>
          <el-button>默认按钮</el-button>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
          <el-button plain>朴素按钮</el-button>
          <el-button type="primary" plain>主要按钮</el-button>
          <el-button type="success" plain>成功按钮</el-button>
          <el-button type="info" plain>信息按钮</el-button>
          <el-button type="warning" plain>警告按钮</el-button>
          <el-button type="danger" plain>危险按钮</el-button>
          <el-button round>圆角按钮</el-button>
          <el-button type="primary" round>主要按钮</el-button>
          <el-button type="success" round>成功按钮</el-button>
          <el-button type="info" round>信息按钮</el-button>
          <el-button type="warning" round>警告按钮</el-button>
          <el-button type="danger" round>危险按钮</el-button>
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
          <el-button type="info" icon="el-icon-message" circle></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button disabled>默认按钮</el-button>
          <el-button type="primary" disabled>主要按钮</el-button>
          <el-button type="success" disabled>成功按钮</el-button>
          <el-button type="info" disabled>信息按钮</el-button>
          <el-button type="warning" disabled>警告按钮</el-button>
          <el-button type="danger" disabled>危险按钮</el-button>
          <el-button type="primary" icon="el-icon-edit"></el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          

          <el-button type="primary">
            上传
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
          <el-button type="primary" :loading="true">加载中</el-button>
          <el-button type="text">纯文本按钮</el-button>
          <el-button type="text" disabled>纯文本按钮</el-button>
          <el-row>
            <el-button round>默认按钮</el-button>
            <el-button size="medium" round>中等按钮</el-button>
            <el-button size="small" round>小型按钮</el-button>
            <el-button size="mini" round>超小按钮</el-button>
          </el-row>
          <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
          <el-button-group style="margin-left: 20px;">
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-share"></el-button>
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-button-group>
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            Tag 标签
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/tag"
            >
              文档
            </a>
          </el-divider>
          <el-tag>标签一</el-tag>
          <el-tag type="success">标签二</el-tag>
          <el-tag type="info">标签三</el-tag>
          <el-tag type="warning">标签四</el-tag>
          <el-tag type="danger">标签五</el-tag>
          <el-tag closable>默认标签</el-tag>
          <el-tag size="medium" closable>中等标签</el-tag>
          <el-tag size="small" closable>小型标签</el-tag>
          <el-tag size="mini" closable>超小标签</el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'my-button',
  components: {
    // MyButton
  },
  data() {
    return {
      // buttonName:'添加'
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
.element-container {
  padding: 20px;
  .component-content{
    .content-box{
      display: flex;
      flex-wrap: wrap;
      margin:10px 0;
    }
  }
  ::v-deep {
    .el-dialog__wrapper {
      position: fixed;
      top: 20px;
      right: 20px;
      bottom: 20px;
      left: 20px;
    }

    .el-tag,
    .el-button,
    {
      margin: 5px;
    }
    .el-button-group{
      margin:5px;
      .el-button{
        margin: 0;
      }
    }
  }
}
</style>