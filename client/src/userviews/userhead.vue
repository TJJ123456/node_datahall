<template>
  <el-row class="head">
    <el-col :span="16" :offset="4">
      <div class="head-logo">
        <router-link :to="{name: 'userindex'}">图书馆</router-link>
      </div>
      <ul class="head-nav">
        <li>
          <router-link :to="{name: 'userindex'}">书架</router-link>
        </li>
        <li class="search">
          <el-form>
            <el-form-item label>
              <input type="search" class="key">
              <el-button class="go" type="primary" icon="el-icon-search">搜索</el-button>
            </el-form-item>
          </el-form>
        </li>
      </ul>
    </el-col>
    <el-col :span="4">
      <ul class="head-nav">
        <template v-if="$state.user">
          <li>
            <a>{{$state.user.username}}</a>
          </li>
          <li>
            <a @click="logout">登出</a>
          </li>
        </template>
        <li v-else>
          <a @click="test">登陆</a>
        </li>
      </ul>
    </el-col>
  </el-row>
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
  height: 60px;
  line-height: 60px;
  color: white;
  background: #3b5998;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  border-bottom: 0.5px solid #344e86;
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
ul,
ol {
  list-style: none;
}

.head-nav {
  vertical-align: top;
  display: inline-block;
}

.head-nav > li {
  display: inline-block;
  width: 76px;
}

.head-nav > li > a {
  display: inline-block;
  padding: 0 20px;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #fff;
  &:hover {
    background-color: #344e86;
    text-decoration: none;
    cursor: pointer;
  }
}
.key {
  width: 250px;
  height: 34px;
  padding: 1px 34px 0 12px;
  border: none;
  background: #cbd9f5;
  border-radius: 4px;
  font-size: 16px;
  padding-top: 0;
}
.go {
  position: absolute;
  right: -120px;
  top: -3px;
  z-index: 2;
  width: 40px;
  height: 38px;
  border: 0;
  font-size: 18px;
  color: #3b5998;
  opacity: 0.3;
  background-color: transparent;
}
</style>
