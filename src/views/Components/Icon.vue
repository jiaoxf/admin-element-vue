<template>
  <div class="element-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16" class="component-content">
        <div class="content-box">
          <el-divider content-position="left">
            图标
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/icon"
            >
              文档
            </a>
          </el-divider>
          <el-col>
            <el-icon iconName="el-icon-edit" iconSize="2rem" iconColor="#f90"/>
            <el-icon iconName="el-icon-edit" iconSize="2rem" iconColor="#03ccbb"/>
            <el-icon iconName="el-icon-edit" iconSize="2rem" iconColor="#ccc"/>
            <el-icon iconName="el-icon-share" iconSize="2rem" iconColor="#f90"/>
            <el-icon iconName="el-icon-delete" iconSize="2rem" iconColor="#E6A23C"/>
            <el-icon iconName="el-icon-platform-eleme" iconSize="2rem" iconColor="#67C23A"/>
            <el-icon iconName="el-icon-delete-solid" iconSize="2rem" iconColor="#F56C6C"/>
            <el-icon iconName="el-icon-s-tools" iconSize="2rem" iconColor="#909399"/>
            <el-icon iconName="el-icon-remove-outline" iconSize="2rem" iconColor="#EBEEF5"/>
            <el-icon iconName="el-icon-loading" iconSize="2rem" iconColor="#f90"/>
            <el-icon iconName="el-icon-video-camera-solid" iconSize="2rem" iconColor=""/>
            <el-icon iconName="el-icon-picture-outline" iconSize="2rem" iconColor="#f90"/>
            <el-icon iconName="el-icon-s-promotion" iconSize="2rem" iconColor="#f90"/>
            
          </el-col>
          <el-col>
            <el-icon iconName="el-icon-edit" iconSize="100px" />
            <el-icon iconName="el-icon-edit" iconSize="80px" />
            <el-icon iconName="el-icon-edit" iconSize="60px" />
            <el-icon iconName="el-icon-edit" iconSize="40px" />
            <el-icon iconName="el-icon-edit" iconSize="20px" />
            <el-icon iconName="el-icon-edit" iconSize="12px" />
            <el-icon iconName="el-icon-edit" iconSize="4rem" />
            <el-icon iconName="el-icon-edit" iconSize="2rem" />
            <el-icon iconName="el-icon-edit" iconSize="1rem" />
            <el-icon iconName="el-icon-edit" iconSize=".8rem" />
            <el-icon iconName="el-icon-edit" iconSize="4em" />
          </el-col>
          <el-col>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
            <el-button type="primary" icon="el-icon-plus">添加</el-button>
            <el-button type="primary" icon="el-icon-right" plain>下一步</el-button>
          </el-col>
          <el-col>
            <el-tooltip class="item" effect="dark" content="通过对象配置样式" placement="right">
              <el-icon iconName="el-icon-edit" iconSize="2rem" :iconStyle="iconObj"/>
            </el-tooltip>
          </el-col>
          
          
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            阿里图标
            <a
              target="_blank"
              href="https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.17&helptype=code"
            >
              文档
            </a>
          </el-divider>
          <el-col>
            <icon-font name="vue" :iconStyle="{ width: '2rem', 'height': '2rem'}"/>
            <icon-font name="putong" :iconStyle="{ width: '2rem', 'height': '2rem'}"/>
            <icon-font name="shezhi" :iconStyle="{ width: '2rem', 'height': '2rem'}"/>
            <icon-font name="qunzu1" :iconStyle="{ width: '2rem', 'height': '2rem'}"/>
            <icon-font name="tupian" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#f90'}"/>
            <icon-font name="Timemeter" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#f90'}"/>
            <icon-font name="c-" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#f90'}"/>
            <icon-font name="yonghu" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#f90'}"/>
            <icon-font name="rizhi" />
            <icon-font name="yonghu1" />
            <icon-font name="quanxian" />
            <icon-font name="qunzu" />
            <icon-font name="wenbenwendang"/>
            <icon-font name="table"/>
            <icon-font name="biaodan"/>
            <icon-font name="zujian" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#f90'}"/>
            <icon-font name="zujian" :iconStyle="{ width: '2rem', 'height': '2rem', color:'red'}"/>
            <icon-font name="zujian" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#03ccbb'}"/>
          </el-col>
          <el-col>
            <icon-font name="react" :iconStyle="{ width: '100px', 'height': '100px', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '80px', 'height': '80px', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '60px', 'height': '60px', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '40px', 'height': '40px', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '20px', 'height': '20px', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '4rem', 'height': '4rem', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '3rem', 'height': '3rem', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '2rem', 'height': '2rem', color:'#ccc'}"/>
            <icon-font name="react" :iconStyle="{ width: '1rem', 'height': '1rem', color:'#ccc'}"/>
          </el-col>
          <el-button type="primary">
            <icon-font name="zujian" paddingSize="0" :iconStyle="{ width: '1rem', 'height': '1rem'}"/>
            搜索
          </el-button>
          <el-button type="primary">
            <icon-font name="zujian" paddingSize="0" :iconStyle="{ width: '1rem', 'height': '1rem', 'color':'#f90'}"/>
            搜索
          </el-button>
          <el-button type="primary">
            <icon-font name="vue" paddingSize="0" :iconStyle="{ width: '1rem', 'height': '1rem' }"/>
            搜索
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import elIcon from '@/components/component/ELIcon'
import IconFont from '@/components/component/IconFont'
export default {
  name: 'name',
  props: {

  },
  components: {
    elIcon,
    IconFont
  },
  data() {
    return {
      iconObj:{
        'cursor': 'pointer',
        'background': '#ccc',
        'border': '1px solid #f90'
      }
    };
  },
//监听属性 类似于data概念
  computed: {},
//监控data中的数据变化
  watch: {},
  methods: {

  },
  created() {

  },
  mounted() {

  },
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.content-box{
  .el-col{
    text-align: left;
    margin:10px 0;
  }
}
</style>