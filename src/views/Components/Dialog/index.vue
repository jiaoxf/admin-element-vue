<template>
  <div class="element-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="16" class="component-content">
        <div class="content-box">
          <el-divider content-position="left">
            常用对话框
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/dialog"
            >
              文档
            </a>
          </el-divider>
          <el-button type="primary" @click="openDialog('add')">新增</el-button>
          <el-button type="primary" @click="openDialog('edit')">编辑</el-button>
          <form-dialog
            ref="dialog"
            :rules="rules"
            :dialogFormVisible="dialogFormVisible"
            :formEditType="formEditType"
            :formWidth="formWidth"
            :searchData="formData"
            :formLabel="formLabel"
            @validateTrue="validateTrue"
            @validateFalse="validateFalse"
            @closeDialogFunc="closeDialog"
          ></form-dialog>
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            Message 弹框
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/message-box"
            >
              文档
            </a>
          </el-divider>
          <el-button type="primary" @click="openMessage()">常用</el-button>
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            消息提示
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/message"
            >
              文档
            </a>
          </el-divider>
          <message-prompt />
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            消息通知
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/notification"
            >
              文档
            </a>
          </el-divider>
          <message-prompt />
        </div>
        <div class="content-box">
          <el-divider content-position="left">
            弹出框
            <a
              target="_blank"
              href="https://element.eleme.cn/#/zh-CN/component/popover"
            >
              文档
            </a>
          </el-divider>
          <popover-prompt />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import FormDialog from './Dialog'
import MessagePrompt from './Message'
import PopoverPrompt from './Popover'
export default {
  name: 'name',
  props: {
    
  },
  components: {
    FormDialog,
    MessagePrompt,
    PopoverPrompt
  },
  data() {
    var checkAge = (rule, value, callback) => {
      console.log(value)
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }else {
        callback()
      }
    };
    return {
      dialogFormVisible: false,  
      formEditType:'edit',
      formWidth: 'line', // line: 竖排布局    不传参则是并列排版
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" }
        ],
        userIdentity: [
          { required: true, message: "请输入用户身份", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        userPermissions: [
          { required: true, message: "请输入用户权限", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择用户群组", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "请输入用户手机号", trigger: "blur" }
        ],
        ageNum: [
          { validator: checkAge, trigger: 'blur', required: true }
        ]
      },
      formData: {
        userName: "",
        userIdentity: "",
        userPassword: "",
        userPermissions: "",
        userGroup: "",
        phoneNumber: "",
        description: "",
        ageNum:"",
      },
      formLabel: [
        {
          type: "Input",
          label: "用户姓名",
          prop: "userName",
          width: "120px",
          disabled: false,
          isFormItemShow: true
        },
        {
          type: "Input",
          label: "用户身份",
          prop: "userIdentity",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "Input",
          label: "用户密码",
          prop: "userPassword",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "Input",
          label: "用户权限",
          prop: "userPermissions",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "Select",
          label: "用户分组",
          prop: "userGroup",
          width: "120px",
          props: [],
          change: row => {
            this.selectVal(row);  // 请求下拉框接口数据
          },
          isFormItemShow: true
        },
        {
          type: "Input",
          label: "用户手机号",
          prop: "phoneNumber",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "Input",
          label: "年龄",
          prop: "ageNum",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "TextArea",
          label: "文件描述",
          prop: "description",
          width: "120px",
          isFormItemShow: true
        },
        {
          type: "Radio",
          label: "性别",
          prop: "sex",
          width: "120px",
          props:[
            {
              label: '男',
              value: '1'
            },
            {
              label: '女',
              value: '2'
            }
          ],
          isFormItemShow: true
        }
      ],
    };
  },
  created() {

  },
  mounted() {
    this.selectVal()
    console.log(this.$refs.dialog)
    console.log(this.$children)
  },
  computed: {},
  watch: {},
  methods: {
    openDialog(text){
      this.formEditType = text;
      this.dialogFormVisible = true;
    },
    selectVal(row){
      console.log(row)
      let selectList = [
        {
          label:'第一项',
          value: 1
        },
        {
          label:'第二项',
          value: 2
        }
      ]
      this.roleList = selectList;
        this.formLabel.forEach(item => {
          if (item.props && item.props.length === 0) {
            item.props = this.roleList;
          }
        });
    },
    validateTrue(data) {
      if (this.formEditType === "add") {
        this.$message({
          message: '这是表单提交的数据' + JSON.stringify(data),
          type: 'success'
        });
        this.addInfo(data)
      } else if (this.formEditType === "edit") {
        this.$message({
          message: '这是表单提交的数据' + JSON.stringify(data),
          type: 'success'
        });
        this.editInfo(data)
      }
      this.dialogFormVisible = false;
    },
    addInfo(infoData){
      console.log(infoData)
      console.log(this.$children)
    },
    editInfo(infoData){
      console.log(infoData)
    },
    validateFalse() {
      this.dialogFormVisible = true;
    },
    closeDialog(newDialogFormVisible) {
      this.dialogFormVisible = newDialogFormVisible;
    },
    openMessage(){
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类

</style>