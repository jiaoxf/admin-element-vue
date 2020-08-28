<template>
  <div class="table">
    <el-table
    id='iTable'
    v-loading='mTable.loading'
    :data.sync='data'
    :stripe='mTable.stripe'
    >
      <!-- 1.复选框表头 -->
      <el-table-column
        v-if="mTable.mutiSelect"
        type="selection"
        width="55">
      </el-table-column>
      <!-- 2.select表头 -->
      <div  v-for="items in column" :key="items">
        <el-table-column 
          :prop='items.prop'
          :label="items.label" 
          v-if="items.slectList"
          >
          <template slot="header" slot-scope="scope">
            <el-select v-model="items.prop" placeholder="状态" @change="selectChange(scope.row)">
                <el-option v-for="item1 in items.slectList" :key="item1.value" :label="item1.label" :value="item1.value">
                </el-option>
            </el-select>
          </template>
          <template slot-scope="scope">
            {{ scope.row.status === '0' ? '面包' : (scope.row.status === '1' ?'蛋挞' : '牛奶卷')}}
          </template>
        </el-table-column>
      </div>
        <!-- 3.普通/正常表头 -->
      <div v-for="item in column" :key="item">
        <!-- v-if 假如有select选择下拉框的话 表头不显示（上面已经显示）默认显示 -->
        <el-table-column
          v-if="item.slectList ? false : true"
          :prop="item.prop"
          :label="item.label"
          :width="mTable.width">
          <template slot-scope='scope'>
            <!-- 1. 假如需要对数据处理  // render是一个函数 父组件params里面要接收参数scope.row-->
            <span v-if="item.render">
                {{ item.render(scope.row) }}
            </span>
            <!-- 2. 对数据状态处理以及样式设置 -->
            <span v-else-if="item.formatter" v-html="item.formatter(scope.row,column)" @click="operationClick(scope.row)">
            </span>
            <!-- 3. 按钮组 -->
            <span v-else-if="item.eventList">
                <div v-for="items in item.eventList" :key="items">
                    <el-button size="mini" :type="items.type" @click="buttonClick(items.text)">
                        {{items.text}}
                    </el-button>
                </div>
            </span>
            <span v-else-if="item.slectList">
              <span v-show="false">

              </span>
            </span>
            <span v-else>
              {{scope.row[item.prop]}}
            </span>
          </template>
        </el-table-column>
      </div>
    </el-table>
  </div>
</template>
<script>
export default {
  props:{
    data: Array,
    column: Array,
    option:{
      type:Object,
      default:()=>{
        return{
          loading:false,
          stripe:false,
          mutiSelect:true,
          width:'', //表格单个column表头配置
        }
      }
    },
  },
  data(){
    return{

    }
  },
  methods:{
    // 按钮组 点击事件
    buttonClick(params){
      if(params == '新增'){
          this.$parent.add();
      }else{
          this.$parent.edit();
      }
    },
    // 状态operation 点击事件（删除/编辑）
    operationClick(params){
      switch(params.operation){
        case '0':
          this.$message.error('删除成功');
          break;
        case '1':
          return this.$message.warning('编辑成功')
      }
    },
    // select change事件
    selectChange(params){
        this.$parent.selectChange(params)
    }
  },
  computed: {
    mTable() {
      return Object.assign({
        loading:false,
        stripe:false,
        mutiSelect:false,
        width:'',
      }, this.option);
    },
  },
  mounted(){

  }
  
}
</script>
<style>
    
</style>