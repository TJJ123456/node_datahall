<template>
  <div class="fillcontain" v-loading="loading">
    <headTop/>
    <div class="table_container">
      <el-row style="margin-top: 20px;">
        <el-col :span="14" :offset="4">
          <header class="form_header">{{title}}</header>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="110px"
            class="form food_form"
          >
            <el-form-item label="数据名称" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数据描述" prop="desc">
              <el-input v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="ruleForm.keyword"></el-input>
            </el-form-item>
            <el-form-item label="数据分类" prop="genre">
              <el-select v-model="ruleForm.genre" placeholder="请选择数据分类">
                <el-option
                  v-for="(item, index) in genreList"
                  :key="index"
                  :label="item.name"
                  :value="item._id"
                >{{item.name}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传数据文件" prop="filepath">
              <el-upload
                ref="upload"
                action="http://localhost:3000/posts/img"
                :auto-upload="false"
                :before-upload="beforeUpload"
                :on-success="uploadSuccess"
                :limit="1"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload"
                >上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10m</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="数据价格" prop="price">
              <el-input v-model.number="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-button type="primary" @click="onSubmit('ruleForm')">创建数据</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: { type: { type: Number, required: true } },
  data() {
    return {
      genreList: [],
      loading: false,
      ruleForm: {
        name: "",
        desc: "",
        genre: "",
        filepath: "",
        keyword: "",
        price: ""
      },
      rules: {
        name: [{ required: true, message: "请输入数据名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入数据描述", trigger: "blur" }],
        genre: [{ required: true, message: "选择数据类型", trigger: "blur" }],
        price: [{ required: true, message: "输入价格", trigger: "blur" }],
        keyword: [{ required: true, message: "输入关键字", trigger: "blur" }],
        filepath: [{ required: true, message: "请上传文件", trigger: "blur" }]
      }
    };
  },
  deactivated() {
    // console.log("1111");
    this.removeUploadFile();
    this.resetForm("ruleForm");
    this.$refs.upload.clearFiles();
  },
  activated() {
    this.initData();
  },
  created() {
    this.initData();
  },
  computed: {
    title() {
      switch (this.type) {
        case 0:
          return "添加图片数据";
          break;
        case 1:
          return "添加文本数据";
          break;
        default:
          break;
      }
    }
  },
  methods: {
    async removeUploadFile() {
      if (this.ruleForm.filepath !== "") {
        let data = await this.$fetch("posts/remove", {
          method: "POST",
          body: JSON.stringify({
            filepath: this.ruleForm.filepath
          })
        });
      }
    },
    async initData() {
      this.loading = true;
      let genreList = await this.$fetch("genre/list");
      // let bookshelfList = await this.$fetch("bookshelf/list");
      this.genreList = genreList.data.filter(item => item.type === this.type);
      // this.bookshelfList = bookshelfList.data;
      this.loading = false;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.create();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async create() {
      this.ruleForm.type = this.type;
      let data = await this.$fetch("data/create", {
        method: "POST",
        body: JSON.stringify(this.ruleForm)
      });
      if (data.err) {
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "创建种类成功",
          type: "success"
        });
        this.resetForm("ruleForm");
        if (this.type === 0) this.$router.push({ path: "/imgDataList" });
        else if (this.type === 1) this.$router.push({ path: "/txtDataList" });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    beforeUpload(file) {
      if (this.type === 0) {
        console.log(file.type);
        const isJPGorPng =
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/jpeg";
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isJPGorPng) {
          this.$message.error("上传图片只能是 JPG/jpeg/png 格式!");
        }
        if (!isLt10M) {
          this.$message.error("上传图片大小不能超过 10MB!");
        }
        return isJPGorPng && isLt10M;
      } else if (this.type === 1) {
        const isDoc =
          file.type === "text/plain" ||
          file.type === "application/msword" ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

        const limit = file.size / 1024 / 1024 < 10;
        if (!isDoc) {
          this.$message.error("上传文本只能是 txt/doc/docx 格式!");
        }
        if (!limit) {
          this.$message.error("上传文本大小不能超过 10MB!");
        }
        return isDoc && limit;
      }

      return false;
    },
    uploadSuccess(res, file) {
      this.ruleForm.filepath = res.filepath;
      //   console.log(res, file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.form {
  min-width: 400px;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border-radius: 6px;
    transition: all 400ms;
  }
}
.food_form {
  border: 1px solid #eaeefb;
  padding: 10px 10px 0;
}
.form_header {
  text-align: center;
  margin-bottom: 10px;
}
</style>
