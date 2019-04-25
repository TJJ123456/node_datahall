<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manager' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        style="color:white;"
        v-for="(item, index) in $route.meta"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <a class="logout" @click="logout">退出</a>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    async logout() {
      const result = await this.$fetch("managerlogout");
      if (result.status === "ok") {
        this.$state.manager = false;
        localStorage.removeItem("manager");
        this.$router.replace("/managerlogin");
      }
    }
  }
};
</script>
<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #474747;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}

.logout {
  line-height: 60px;
  height: 60px;
  width: 80px;
  color: white;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
}
</style>
<style lang="less" scoped>
</style>
