<template>
  <div>
    <el-row class="head" :class="{shorthead: checkMyView}">
      <el-col :span="16" :offset="1">
        <div class="head-logo">
          <a @click="toHome()" class="home">数据所</a>
        </div>
      </el-col>
      <el-col :span="4" :offset="3">
        <div class="head-logo">
          <template>
            <ul class="nav navbar-nav navbar-right">
              <li v-if="$state.user">
                <a style="color:white" @click="toMyview()">{{$state.user.username}}</a>
              </li>
              <li v-if="$state.user">
                <a style="color:white" @click="logout()">登出</a>
              </li>
              <li @click="toLogin()" v-if="!$state.user">
                <a style="color:white">登录</a>
              </li>
            </ul>
          </template>

          <!-- <router-link v-if="$state.user" :to="{path: '/home/myOrder'}">{{$state.user.username}}</router-link> -->
          <!-- <router-link v-else :to="{path: '/login'}">登陆</router-link> -->
        </div>
      </el-col>
      <div class="search" v-if="!checkMyView">
        <el-input class="searchInput" :value="keyword" v-model="keyword" placeholder="请输入搜索内容"></el-input>
        <el-button class="searchBtn" @click="toSearch()" icon="el-icon-search">搜索</el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      loading: false
    };
  },
  computed: {
    checkMyView() {
      return this.$route.path === "/home/myOrder";
    }
  },
  methods: {
    test() {
      // console.log("111");
      this.$router.push({ path: "/home/login" });
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    toMyview() {
      this.$router.push({ path: "/home/myOrder" });
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
    },
    banByDetail() {
      return this.$route.name !== "detail";
    },
    toSearch() {
      if (this.keyword === "") {
        return;
      }
      if (this.$route.name === "search") {
        this.$router.replace({
          name: "search",
          params: { keyword: this.keyword }
        });
      } else
        this.$router.push({
          name: "search",
          params: { keyword: this.keyword }
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
.home {
  display: block;
  // float: left;
  width: 160px;
  font-size: 28px;
  color: white;
  text-align: center;
  overflow: hidden;
}
a:hover {
  cursor: pointer;
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
.shorthead {
  height: 100px;
}
.navbar-right {
  float: right !important;
}

.navbar-nav {
  float: left;
  margin: 0;
}
.navbar-nav::before {
  content: " ";
  display: table;
}
.navbar-nav > li {
  float: left;
}
.nav > li {
  position: relative;
  display: block;
}
.main .nav.navbar-nav.navbar-right a {
  color: #fff;
}
.navbar-inverse .navbar-nav > li > a {
  color: #777;
}
.navbar-nav > li > a {
  padding-top: 15px;
  padding-right: 20px;
  padding-bottom: 15px;
  font-size: 24px;
}
</style>
