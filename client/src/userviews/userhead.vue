<template>
  <div>
    <el-row class="head">
      <el-col :span="16" :offset="1">
        <div class="head-logo">
          <router-link :to="{name: 'userindex'}">数据所</router-link>
        </div>
      </el-col>
      <div class="search">
        <el-input class="searchInput" placeholder="请输入搜索内容"></el-input>
        <el-button class="searchBtn" icon="el-icon-search">搜索</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    test() {
      // console.log("111");
      this.$router.push({ path: "/home/login" });
    },
    async logout() {
      await this.$fetch("user/logout");
      this.$state.user = false;
      localStorage.removeItem("user");
      this.$router.replace("/");
      this.$message({
        showClose: true,
        message: "退出成功",
        type: "success"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.head {
  height: 280px;
  color: white;
  background: #ffd84d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  border-bottom: 0.5px solid #ffd84d;
}
.head-logo {
  width: 160px;
  height: 40px;
  display: inline-block;
}
.head-logo a {
  display: block;
  // float: left;
  width: 160px;
  font-size: 28px;
  color: white;
  text-align: center;
  overflow: hidden;
}
.search {
  width: 400px;
  margin: 120px auto auto auto;
}
.searchInput {
  width: 310px;
  display: inline-block;
}
.searchBtn {
  position: relative;
  left: 5px;
  top: -40px;
  left: 310px;
  width: 90px;
}
</style>
