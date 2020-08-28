<template>
  <div class="">
    <el-table
      ref="table"
      v-loading="isLoading"
      element-loading-text="Loading"
      :data="tableData"
      :header-cell-style="{background:'#ccc'}"
      stripe
      style="width:100%">
      <el-table-column v-for="(item,index) in tableLabel" :width="item.width ? item.width : ''" :key="index" :align="item.align" :label="item.label" :prop="item.param" :sortable="item.sortable ? 'custom' : false">
        <template slot-scope="scope">
          <span v-if="item.render">
            {{item.render(scope.row)}}
          </span>
          <span v-else>{{scope.row[item.param]}}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="tableOption.label" :width="tableOption.width" :label="tableOption.label" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  v-for="(item,index) in tableOption.options" :key="index" :type="item.type" :icon="item.icon" @click="handleButton(item.methods, scope.row)" size="mini">
            {{item.label}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="pagination"
      background
      :total="pagination.total"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      style="padding: 20px;"
    ></el-pagination>
  </div>
</template>
<script>

export default {
  name: 'name',
  props:{
    isLoading:{
      type: Boolean,
      default: false
    },
    tableData:{
      type:Array,
      default: () => {
        return []
      }
    },
    tableLabel:{
      type:Array,
      default: () => {
        return []
      }
    },
    tableOption:{
      type:Object,
      default: () => {
        return {}
      }
    },
    pagination: Object,
  },
  components: {},
  data() {
    return {

    };
  },
  computed: {},
  watch: {},
  methods: {
    handleSizeChange(){
      console.log(2)
    },
    handleIndexChange(){
      console.log(1)
    },
    handleButton(methodName, row){
      console.log(methodName, row)
      // this.$emit(methodName)
      this.$emit(methodName, row)
    }
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

</style>