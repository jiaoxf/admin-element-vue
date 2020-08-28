<template>
  <div class="element-container">
    <el-row :gutter="20">
      <el-col class="component-content">
        <el-divider content-position="left">
          常用表单
          <a
            target="_blank"
            href="https://element.eleme.cn/#/zh-CN/component/table"
          >
            文档
          </a>
        </el-divider>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="添加图片" prop="file" ref="uploadElement">
            <el-upload
              action="#"
              list-type="picture-card"
              :auto-upload="false"
              :on-change="onChange">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                  >
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(file)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                      v-if="!ruleForm.disabled"
                      class="el-upload-list__item-delete"
                      @click="handleDownload(file)"
                    >
                      <i class="el-icon-download"></i>
                    </span>
                    <span
                      v-if="!ruleForm.disabled"
                      class="el-upload-list__item-delete"
                      @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
            </el-upload>
            <el-dialog :visible.sync="ruleForm.dialogVisible">
              <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="嘉宾" required>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item
                  v-for="(domain, index) in ruleForm.domains"
                  label-width="0px"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                    required: true, message: '域名不能为空', trigger: 'blur'
                  }"
                >
                  <el-input v-model="domain.value"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  label-width="0px"
                  class="second-box"
                  v-for="(domain, index) in ruleForm.domains"
                  :key="domain.key"
                  :prop="'domains.' + index + '.value1'"
                  :rules="{
                    required: true, message: 'xxxx不能为空', trigger: 'blur'
                  }"
                >
                  <el-row :gutter="10">
                    <el-col :span="20">
                      <el-input v-model="domain.value1"></el-input>
                      
                    </el-col>
                    <el-col :span="4">
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-col>
                  </el-row>
                  
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-button @click="addDomain">新增域名</el-button>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  name: 'name',
  props: {

  },
  components: {},
  data() {
    // 图片校验
    let valiImg = (rule, value, callback) => { 
      if (!this.hasFmt) {
        callback(new Error('请上传图片'));
      } else {
        callback()
      }
    };
    return {
      hasFmt: false,
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        domains: [{
          value: '',
          value1:''
        }],
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        file: [
          { required: true, validator: valiImg, trigger: "change" }
        ]
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.file = "";
      this.$refs.upload.clearFiles();
    },
    handleRemove(file) {
      console.log(file);
      for (let i = 0; i < this.ruleForm.file.length; i++) {
        if (file === this.ruleForm.file[i]) {
          this.ruleForm.file.splice(i, 1);
        }
      }
    },
    handlePictureCardPreview(file) {
      this.ruleForm.dialogImageUrl = file.url;
      this.ruleForm.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    onChange(file, fileList){
      console.log(file, fileList)
      if(fileList.length > 0){
        this.hasFmt = true;
      }
    },
    addDomain() {
      this.ruleForm.domains.push({
        value: '',
        value1:'',
        key: Date.now()
      });
    },
    removeDomain(item) {
      var index = this.ruleForm.domains.indexOf(item)
      if (index !== -1) {
        this.ruleForm.domains.splice(index, 1)
      }
    },
  },
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.demo-ruleForm{
  width: 580px;
  text-align: left;
  ::v-deep.el-upload--picture-card{
    width: 120px;
    height: 120px;
  }
  ::v-deep.el-upload-list--picture-card .el-upload-list__item{
    width: 120px;
    height: 120px;
  }
}

</style>