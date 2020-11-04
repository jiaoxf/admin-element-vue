<template>
  <el-row :gutter="20" style="width:100%;">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class='tree-div'>
      <div class="leftTree comp-tree">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          @check-change="handleCheckChange"
          :props="defaultProps">
        </el-tree>
        <div class="text-div">
          <span>
            选中的节点：{{ checkTree }}
          </span>
        </div>
        <div class="button-div">
          <el-button type="primary" size="small" @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button type="primary" size="small" @click="getCheckedKeys">通过 key 获取</el-button>
          <el-button type="primary" size="small" @click="setCheckedNodes">通过 node 设置</el-button>
          <el-button type="primary" size="small" @click="setCheckedKeys">通过 key 设置</el-button>
          <el-button type="primary" size="small" @click="resetChecked">清空</el-button>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
      <div class="json-div">
        <pre>{{ JSON.stringify(data, null, 2)  }}</pre>
      </div>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'SimplenessTree',
  props: {

  },
  components: {},
  data() {
    return {
      checkTree: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {

  },
  mounted() {

  },
  computed: {},
  watch: {},
  methods: {
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
      this.getCheckedNodes()
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes()); 
      this.checkTree = this.$refs.tree.getCheckedNodes();
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        }, 
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    }
  },
}
</script>
<style lang='scss' scoped>
@import './complex.scss'; // 引入公共css类

</style>