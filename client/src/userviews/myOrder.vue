<template>
  <div class="table_container">
    <div class="user_myprofile user_info_page" style="height:50px">
      <div class="togglebtn clearfix">
        <p class="fl">我的资料</p>
      </div>
    </div>
    <ul>
      <li>
        <span>用户名：{{$state.user.username}}</span>
      </li>
      <li>
        <span style="padding-right:20px">余额：{{$state.user.money}}</span>
        <el-button size="mini" type="Warning" @click="chargeVisible = true">充值</el-button>
      </li>
    </ul>
    <div style="margin-top:20px;">
      <h4>我的订单列表</h4>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="dataname" label="数据名"></el-table-column>
        <!-- <el-table-column prop="username" label="购买用户"></el-table-column> -->
        <el-table-column prop="price" label="购买价格"></el-table-column>
        <el-table-column prop="time" label="购买时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleDownload(scope.$index, scope.row)"
            >获取数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="充值" :visible.sync="chargeVisible">
      <div class="compay-num-list">
        <div class="compay-title">
          <span class="txt">充值项目</span>
        </div>
        <div class="compay-num-ul-wrap">
          <ul class="compay-num-ul J_union_list">
            <li
              :class="{cur:selectIndex===index}"
              class="item J_num_item"
              v-for="(item, index) in chargeArr"
              :key="index"
              @click="selectIndex = index"
            >
              <div class="item-con">
                <span class="yc">{{item}}元</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <el-row style="margin-top:20px">
        <el-col :span="10" :offset="7">
          <p class="p3">
            <input @click="confirmCharge()" type="button" class="zxtc_btn" value="确定充值">
          </p>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
  
<script>
import moment from "moment";
moment.locale("zh-cn");
export default {
  data() {
    return {
      loading: false,
      chargeArr: [100, 200, 500, 1000],
      selectIndex: 0,
      chargeVisible: false,
      tableData: []
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  computed: {
    money() {
      return this.$state.user.money;
    }
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
    },
    async handleDownload(index, row) {
      // console.log(this.tableData[index]._id);
      let data = await this.$downloadfetch("data/download", {
        method: "POST",
        body: JSON.stringify({
          id: this.tableData[index].dataid
        })
      });
    },
    async confirmCharge() {
      let data = await this.$fetch("user/charge", {
        method: "POST",
        body: JSON.stringify({
          money: this.chargeArr[this.selectIndex]
        })
      });
      if (data.err) {
        if (data.msg === "请登录") {
          this.$router.replace("/login", "");
        }
        this.$message({
          showClose: true,
          message: data.msg,
          type: "error"
        });
      } else {
        this.$message({
          showClose: true,
          message: "充值成功",
          type: "success"
        });
        this.$state.user = data;
        this.chargeVisible = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/mixin";
.table_container {
  padding: 30px 200px 0px 200px;
  min-height: 800px;
}
.el-form-item {
  margin-right: 0;
  margin-bottom: 20px;
}
.user_myprofile .togglebtn {
  margin-bottom: 34px;
  width: 100%;
  background: #f5f5f5;
}
.user_myprofile .togglebtn {
  margin-bottom: 10px;
}
.clearfix {
  display: block;
  min-height: 1%;
}
.user_myprofile .togglebtn p {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-left: 10px;
  color: #555555;
}
.fl,
.fr {
  display: inline;
  float: left;
}
.compay-num-list {
  position: relative;
  width: 672px;
  overflow: hidden;
  margin: -20px auto 0;
}
.compay-title {
  font-size: 12px;
  color: #333;
  margin: 14px 20px 10px;
}
.compay-title .txt {
  margin-left: 3px;
}

.compay-tab .tab-item,
.compay-title .icon,
.compay-title .txt {
  display: inline-block;
  vertical-align: middle;
}
.compay-num-ul-wrap {
  position: relative;
  width: 630px;
  height: 60px;
  padding-top: 20px;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
}
.compay-num-ul {
  position: absolute;
  left: 0;
}
.compay-num-list .item {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 58px;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  margin: 0 6px;
  background-color: #fff;
  width: 103px;
}
.compay-num-list .item-con {
  display: inline-block;
  vertical-align: middle;
  line-height: 1.3;
}
.compay-num-list .item .yc {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #f70;
}
.compay-num-list .item:after {
  display: inline-block;
  vertical-align: middle;
  content: "";
  width: 0;
  height: 100%;
}

.compay-num-list .item.cur {
  width: 101px;
  height: 56px;
  border: 2px solid #f50;
}
p.p3 input {
  border: 0px;
  cursor: pointer;
  height: 40px;
  padding: 0px 40px;
  background-color: #f5a21b;
  border: 0px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
  border-radius: 20px;
}
</style>