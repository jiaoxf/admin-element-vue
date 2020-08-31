<template>
  <div>
    <el-dialog
      :title="newFormEditType === 'edit' ? '编辑' :(newFormEditType === 'add' ? '新增' : '设置')"
      :visible.sync="dialogFormVisible"
      :before-close="handleFormModalCancel"
      :width="formWidth === 'line' ? '460px' : '800px'"
      customClass="modalClass roleClass"
      class="dialogClass"
    >
      <el-form
        :size="size"
        inline
        :label-width="labelWidth"
        :model="searchData"
        ref="searchData"
        :rules="rules"
        class="formClass"
      >
        <template v-for="item in formLabel">
          <el-form-item
            v-if="item.isFormItemShow"
            :label="item.label"
            :key="item.prop"
            :prop="item.prop"
            :label-width="item.width"
          >
            <!-- input -->
            <el-input
              v-if="item.type==='Input'"
              v-model="searchData[item.prop]"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            ></el-input>
            <!-- select -->
            <el-select
              v-if="item.type==='Select'"
              v-model="searchData[item.prop]"
              :placeholder="item.placeholder"
              size="small"
              @change="item.change(searchData[item.prop])"
            >
              <el-option
                v-for="i in item.props"
                :label="i.label"
                :value="i.value"
                :key="i.value"
              ></el-option>
            </el-select>
            <el-radio-group
              v-if="item.type==='Radio'"
              v-model="searchData[item.prop]"
              >
              <el-radio 
                v-for="r in item.props"
                :label="r.value"
                :key="r.value">
                {{ r.label }}
              </el-radio>
            </el-radio-group>
            <!-- textarea-->
            <el-input
              v-if="item.type==='TextArea'"
              v-model="searchData[item.prop]"
              type="textarea"
              size="small"
              :placeholder="item.placeholder"
              :disabled="item.disabled"
            ></el-input>
            <!--tree-->
            <!-- <el-tree
              v-if="item.type==='Tree'"
              ref="tree"
              :data="item.props"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current
              :props="defaultProps"
              :default-checked-keys="checkedDedault"
              @check-change="getCheckedKeys"
            /> -->
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleFormModalCancel('searchData')">取 消</el-button>
        <el-button size="small" type="primary" @click="handleFormModalOk('searchData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    rules: {
      type: Object,
      default: () => {
        return Object
      }
    },
    formWidth:  {
      type: String,
      default: 'line'
    },
    labelWidth: {
      type: String,
      default: "120px"
    },
    size: {
      type: String,
      default: "small"
    },
    formLabel: {
      type: Array,
      default: () => {
        return Array
      }
    },
    searchData: {
      type: Object,
      default: () => {
        return Object
      }
    },
    formEditType: {
      type: String,
      default: "add"
    },
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    checkedDedault: {
      type: Array
    }
  },
  data() {
    return {
      newDialogFormVisible: false,
      newFormEditType: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    formEditType: {
      handler(newVal) {
        this.newFormEditType = newVal;
      }
    },

    dialogFormVisible: {
      handler(newVal) {
        this.newDialogFormVisible = newVal;
      }
    }
  },

  methods: {
    handleFormModalOk() {
      this.$refs.searchData.validate(valid => {
        if (valid) {
          this.$emit("validateTrue", this.searchData);
          // this.$refs.searchData.resetFields();
        } else {
          this.$emit("validateFalse", this.searchData);
        }
      });
    },
    handleFormModalCancel() {
      this.newDialogFormVisible = false;
      this.$refs.searchData.resetFields();
      this.$emit("closeDialogFunc", this.newDialogFormVisible);
    },
    /* getCheckedKeys() {
      var roleTemp = [];
      var roleArr = this.$refs.tree[0]
        .getHalfCheckedKeys()
        .concat(this.$refs.tree[0].getCheckedKeys());
      for (var i = 0; i < roleArr.length; i++) {
        roleTemp.push({ id: roleArr[i] });
      }
      this.$emit("getCheckedKeys", roleTemp);
    } */
  }
};
</script>
<style lang="scss">
.dialogClass{
  text-align: left;
}
.el-input__inner {
  width: 220px;
}
.el-dialog{
  border-radius: 12px;
}
.el-textarea__inner{
  width: 220px;
}

</style>