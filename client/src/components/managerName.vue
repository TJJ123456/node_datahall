<template>
  <a @click="logout">退出</a>
</template>
<script>
export default {
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
<style lang="stylus" scoped>
a {
  line-height: 60px;
  color: white;
  text-decoration: none;
}
</style>

