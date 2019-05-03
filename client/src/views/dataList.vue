<template>
  <div class="fillcontain">
    <headTop/>
    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="genrename" label="分类"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
      <el-dialog title="修改种类信息" :visible.sync="dialogFormVisible">
        <el-form :rules="dialogFormrules" :model="dialogForm" ref="dialogForm">
          <el-form-item label="数据名称" prop="name">
            <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="数据描述" prop="desc">
            <el-input v-model="dialogForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="关键字" prop="keyword">
            <el-input v-model="dialogForm.keyword"></el-input>
          </el-form-item>
          <el-form-item label="数据分类" prop="genre">
            <el-select v-model="dialogForm.genre" placeholder="请选择数据分类">
              <el-option
                v-for="(item, index) in genreList"
                :key="index"
                :label="item.name"
                :value="item._id"
              >{{item.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更换数据文件（可选）">
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
            <el-input v-model.number="dialogForm.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row type="flex" justify="center">
              <el-button type="primary" @click="onSubmit('ruleForm')">修改数据</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: { type: { type: Number, required: true } },
  data() {
    return {
      editIndex: 0,
      currentPage: 1,
      offset: 0,
      limit: 10,
      count: 0,
      tableData: [],
      genreList: [],
      dialogFormVisible: false,
      loading: false,
      dialogFormSelect: 0,
      dialogForm: {},
      dialogFormrules: {
        name: [{ required: true, message: "请输入数据名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入数据描述", trigger: "blur" }],
        genre: [{ required: true, message: "选择数据类型", trigger: "blur" }],
        price: [{ required: true, message: "输入价格", trigger: "blur" }],
        keyword: [{ required: true, message: "输入关键字", trigger: "blur" }],
        filepath: [{ required: true, message: "请上传文件", trigger: "blur" }]
      }
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  watch: {},
  methods: {
    getGenreName(id) {
      let doc = this.tableData.find(item => item._id === id);
      return doc.name;
    },
    async initData() {
      // this.getList();
      let genreList = await this.$fetch("genre/list");
      this.genreList = genreList.data;
      this.GetListCount();
    },
    async GetListCount() {
      let data = await this.$fetch("data/count");
      if (data.data !== this.count) {
        this.getList();
        this.count = data.data;
      }
    },
    async getList() {
      let data = await this.$fetch("data/list", {
        method: "POST",
        body: JSON.stringify({
          limit: this.limit,
          offset: this.offset
        })
      });
      this.tableData = data.data.filter(item => item.type === this.type);
    },
    handleEdit(index, row) {
      this.editIndex = index;
      this.dialogFormVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.tableData[index]));
      let genre = this.dialogForm.genre;
      console.log("种类", genre);
      this.dialogFormSelect = this.tableData.find(item => {
        console.log(item._id, genre, item._id === genre);
        return item._id === genre;
      });
    },
    async handleDelete(index, row) {
      let data = await this.$fetch("data/delete", {
        method: "POST",
        body: JSON.stringify({
          id: this.tableData[index]._id
        })
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
          message: "删除数据成功",
          type: "success"
        });
        this.tableData.splice(index, 1);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getList();
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.changeItem();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    beforeUpload(file) {
      if (this.type === 0) {
        console.log(file.type);
        const isJPGorPng =
          file.type === "image/jpg" ||
          file.type === "image/png" ||
          file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 10;
        console.log(isJPGorPng);
        if (!isJPGorPng) {
          this.$message.error("上传图片只能是 JPG/jpeg/png 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 10MB!");
        }
        return isJPGorPng && isLt2M;
      } else if (this.type === 1) {
        console.log(file.type);
      }
      return false;
    },
    uploadSuccess(res, file) {
      this.dialogForm.filepath = res.filepath;
      //   console.log(res, file);
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    async changeItem() {
      let data = await this.$fetch("data/change", {
        method: "POST",
        body: JSON.stringify(this.dialogForm)
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
          message: "修改数据信息成功",
          type: "success"
        });
        this.tableData[this.editIndex] = JSON.parse(
          JSON.stringify(this.dialogForm)
        );
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
.el-form-item {
  margin-right: 0;
  margin-bottom: 20px;
}
</style>
