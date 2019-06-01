<template>
  <div class="fillcontain">
    <headTop/>
    <div style="margin-top:10px;">
      <input v-model="search" type="text" class="searchbox" placeholder="输入用户名称">
      <p style="color:gray; margin-left:20px; font-size: 14px;">输入用户名称快速检索用户</p>
    </div>
    <div class="table_container">
      <el-table v-loading="loading" :data="showList" style="width: 100%">
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="ordercount" label="订单数量"></el-table-column>
        <el-table-column prop="bookList" label="充值金额"></el-table-column>
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
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
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
  computed: {
    showList() {
      let list = this.tableData;
      let regex = new RegExp(this.search);
      list = list.filter(item => item.username.match(regex));
      return list.slice(this.offset, this.offset + 10);
    }
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
      let data = await this.$fetch("user/list");
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
      // this.getList();
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
.searchbox {
  border: 1px solid #8c939d;
  height: 30px;
  width: 200px;
  margin-left: 20px;
}
</style>
