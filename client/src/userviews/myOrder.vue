<template>
  <div class="table_container">
    <h2>我的订单列表</h2>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="dataname" label="数据名"></el-table-column>
      <el-table-column prop="username" label="购买用户"></el-table-column>
      <el-table-column prop="price" label="购买价格"></el-table-column>
      <el-table-column prop="time" label="购买时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      loading: false,
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      this.getList();
    },
    async getList() {
      let data = await this.$fetch("order/userlist");
      if (data.err) {
        if (data.msg === "请登录") {
          this.$router.replace("/login", "");
        }
      } else {
        this.tableData = data.data;
        this.tableData.forEach(item => {
          item.time = this.formatTime(item.createTime);
        });
      }
    },
    formatTime(time) {
      return moment(time).format("LL");
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 30px 200px 0px 200px;
}
.el-form-item {
  margin-right: 0;
  margin-bottom: 20px;
}
</style>