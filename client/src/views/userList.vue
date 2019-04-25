<template>
  <div class="fillcontain">
    <headTop/>
    <div class="table_container">
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="bookList" label="借书数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editIndex: 0,
      currentPage: 1,
      offset: 0,
      limit: 10,
      count: 0,
      tableData: [],
      dialogFormVisible: false,
      loading: false
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
    async initData() {
      // this.getList();
      this.GetListCount();
    },
    async GetListCount() {
      let data = await this.$fetch("user/count");
      if (data.data !== this.count) {
        this.getList();
        this.count = data.data;
      }
    },
    async getList() {
      let data = await this.$fetch("user/list", {
        method: "POST",
        body: JSON.stringify({
          limit: this.limit,
          offset: this.offset
        })
      });
      this.tableData = data.data;
    },
    handleEdit(index, row) {
      this.editIndex = index;
      this.dialogFormVisible = true;
      this.dialogForm = JSON.parse(JSON.stringify(this.tableData[index]));
    },
    async handleDelete(index, row) {
      let data = await this.$fetch("user/delete", {
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
          message: "删除用户成功",
          type: "success"
        });
        this.tableData.splice(index, 1);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getList();
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
