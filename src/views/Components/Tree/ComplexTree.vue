<template>
  <el-row :gutter="20" style="width:100%;">
    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" class='tree-div'>
      <div class="leftTree comp-tree" >
        <el-tree
          ref="SlotTree"
          :data="data"
          :props="defaultProps"
          :expand-on-click-node="false"
          highlight-current
          :node-key="NODE_KEY"
          default-expand-all
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          >
            <div class="comp-tr-node" slot-scope="{ node, data }">
              <span>
                <i class="el-icon-circle-plus"></i>
              </span>  
              <!-- 编辑状态 -->
              <template v-if="node.isEdit">
                <el-input v-model="data.label" 
                  autofocus
                  size="mini"
                  :ref="'slotTreeInput'+data[NODE_KEY]"
                  @blur.stop="handleInput(node, data)"
                  @keyup.enter.native="handleInput(node, data)">
                </el-input>
              </template>
              <!-- 非编辑状态 -->
              <template v-else>
                <!-- 名称： 新增节点增加class（is-new） -->
                <span :class="[data[NODE_KEY] < NODE_ID_START ? 'is-new' : '', 'comp-tr-node--name']">
                  {{ node.label }}
                </span>
                <!-- 按钮 -->
                <span class="comp-tr-node--btns">
                  <!-- 新增 -->
                  <el-button icon="el-icon-plus" 
                    size="mini"
                    circle 
                    type="primary"
                    @click="handleAdd(node, data)">
                  </el-button>
                  <!-- 编辑 -->
                  <el-button icon="el-icon-edit" 
                    size="mini"
                    circle 
                    type="info"
                    @click="handleEdit(node, data)">
                  </el-button>
                  <!-- 删除 -->
                  <el-button icon="el-icon-delete" 
                    size="mini"
                    circle 
                    type="danger"
                    @click="handleDelete(node, data)">
                  </el-button>
                </span>
              </template>
            </div>
        </el-tree>
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
  name: 'name',
  props: {

  },
  components: {},
  data() {
    return {
      dialogFormVisible: false,
      btnShow:true,
      filterText: '',
      data: [
        {
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
        }
      ],
      ruleForm:{
        name: '',
        region: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleSelection: [],
      isLoading: false,// 是否加载
      NODE_KEY: 'id',// id对应字段
      MAX_LEVEL: 3,// 设定最大层级
      NODE_ID_START: 0,// 新增节点id，逐次递减
      startId: null,
      initParam: {// 新增参数
        label: '新增节点',
        pid: 0,
        children: []
      },
    };
  },
  created() {
    this.startId = this.NODE_ID_START;
  },
  mounted() {

  },
  computed: {},
  watch: {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    personDeptList(a, b){
      console.log(a,b)
    },
    handleDragStart(node, ev) {
      console.log(ev)
      console.log('drag start', node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log(ev)
      console.log('tree drag enter: ', dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log(ev)
      console.log('tree drag leave: ', dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log(ev)
      console.log('tree drag over: ', dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log(ev)
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log(ev)
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner';
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
    },
    handleDelete(_node, _data){// 删除节点
      console.log(_node, _data)
      // 判断是否存在子节点
      if(_data.children && _data.children.length !== 0){
          this.$message.error("此节点有子级，不可删除！")
          return false;
      }else{
        // 删除操作
        let DeletOprate = () => {
          this.$nextTick(() => {
            if(this.$refs.SlotTree){
              this.$refs.SlotTree.remove(_data)
              this.$message.success("删除成功！")
            }
          })
        }
        // 二次确认
        let ConfirmFun = () => {
          this.$confirm("是否删除此节点？","提示",{
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            DeletOprate()
          }).catch(() => {})
        }
        // 判断是否新增： 新增节点直接删除，已存在的节点要二次确认
        _data[this.NODE_KEY] < this.NODE_ID_START ? DeletOprate() : ConfirmFun()
      }
    },
    handleInput(_node, _data){// 修改节点
      console.log(_node, _data)
      // 退出编辑状态
      if(_node.isEdit){
        this.$set(_node, 'isEdit', false)
      }
    },
    handleEdit(_node, _data){// 编辑节点
      // 设置编辑状态
      if(!_node.isEdit){
        this.$set(_node, 'isEdit', true)
      }
      // 输入框聚焦
      this.$nextTick(() => {
        if(this.$refs['slotTreeInput'+_data[this.NODE_KEY]]){
          this.$refs['slotTreeInput'+_data[this.NODE_KEY]].$refs.input.focus()
        }
      })
    },
    handleAdd(_node, _data){// 新增节点
      console.log(_node, _data)
      // 判断层级
      /* if(_node.level >= this.MAX_LEVEL){
          this.$message.warning("当前已达到"+ this.MAX_LEVEL + "级，无法新增！")
          return false;
      } */
      // 参数修改
      let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
      obj.pid = _data[this.NODE_KEY];// 父id
      obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
      // 判断字段是否存在
      if(!_data.children){
        this.$set(_data, 'children', [])
      }
      // 新增数据
      _data.children.push(obj)
      // 展开节点
      if(!_node.expanded){
        _node.expanded = true
      }
    },
    handleAddTop(){// 添加顶部节点
      let obj = JSON.parse(JSON.stringify(this.initParam));// copy参数
      obj[this.NODE_KEY] = --this.startId;// 节点id：逐次递减id
      this.data.push(obj)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
@import './complex.scss'; // 引入公共css类

</style>