<template>
  <el-row class="nav">
    <el-col :span="6" :offset="6">
      <el-menu :default-active="defaultActive" mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/home/userPlanList">计划列表</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" :offset="8">
      <template v-if="$state.user">
        <el-menu :default-active="defaultActive" mode="horizontal" router>
          <el-menu-item index="/home/myOrder">我的订单</el-menu-item>
          <el-menu-item @click="logout()">登出</el-menu-item>
        </el-menu>
      </template>
      <el-menu v-else :default-active="defaultActive" mode="horizontal" router>
        <el-menu-item index="/home/login">登录</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  computed: {
    defaultActive: function() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
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
<style scoped>
.nav {
  border-bottom: solid 1px #e6e6e6;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
