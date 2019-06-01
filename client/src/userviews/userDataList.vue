<template>
  <div class="wrap kfsj_05">
    <div class="wrap_c">
      <ul>
        <li class="fl" v-for="(item, index) in showList" :key="index">
          <div class="fl">
            <img :src="getImgpath(item.imgpath)" alt>
            <!-- <img src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg" alt> -->
          </div>
          <div class="fr">
            <em class="em1">
              <span class="sp1">
                <a @click="toDetail(item._id)">{{item.name}}</a>
              </span>
              <span class="sp2">{{shortDesc(item.desc)}}</span>
              <span class="sp3">
                <a>{{item.keyword}}</a>
              </span>
            </em>
            <em class="em2">
              <span class="sp1">
                <el-button class="btn" @click="buy(item)" round>我要购买</el-button>
              </span>
            </em>
          </div>
        </li>
      </ul>
      <div class="Pagination" style="margin-top:20px">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="dataList.length"
        ></el-pagination>
      </div>
    </div>

    <el-dialog title="购买数据" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="10" :offset="7">
          <p class="p2">
            <span>数据名称: {{buyItem.name}}</span>
          </p>
          <p class="p2">
            <span>数据价格: {{buyItem.price}}</span>
          </p>
          <p class="p2">
            <span v-if="$state.user">
              账户余额: {{$state.user.money}}
              <span
                v-if="checkmoney()"
                style="color:#f11;font-size:12px"
              >(账户余额不足)</span>
            </span>
          </p>
          <p class="p3">
            <input
              v-if="checkmoney()"
              @click="charge()"
              type="button"
              class="zxtc_btn"
              value="我要充值"
            >
            <input v-else @click="confirmBuy()" type="button" class="zxtc_btn" value="确定购买">
          </p>
        </el-col>
      </el-row>
    </el-dialog>
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
export default {
  data() {
    return {
      currentPage: 1,
      offset: 0,
      limit: 10,
      dialogFormVisible: false,
      chargeVisible: false,
      buyItem: {},
      chargeArr: [100, 200, 500, 1000],
      selectIndex: 0
    };
  },
  computed: {
    showList() {
      return this.dataList.slice(this.offset, this.offset + 10);
    }
  },
  mounted() {
    this.$on("handleCharge", () => {
      console.log("监听到了");
      this.chargeVisible = false;
    });
  },
  methods: {
    getImgpath(path) {
      return "http://localhost:3000" + path;
    },
    checkmoney() {
      return this.$state.user && this.$state.user.money < this.buyItem.price;
    },
    shortDesc(desc) {
      if (desc.length < 73) {
        return desc;
      }
      let str = desc.slice(0, 70);
      str += "...";
      return str;
    },
    toDetail(id) {
      this.$router.push({ name: "detail", params: { id: id } });
    },
    buy(item) {
      this.dialogFormVisible = true;
      this.buyItem = item;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
    },
    charge() {
      this.dialogFormVisible = false;
      this.chargeVisible = true;
    },
    async confirmBuy() {
      let data = await this.$fetch("order/create", {
        method: "POST",
        body: JSON.stringify({
          dataid: this.buyItem._id,
          price: this.buyItem.price
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
          message: "购买成功",
          type: "success"
        });
        this.$state.user = data;
        this.dialogFormVisible = false;
      }
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
  },
  props: {
    dataList: {
      require: true
    }
  }
};
</script>
<style lang="less" scoped>
.kfsj_05 {
  overflow: hidden;
}
.wrap {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
}
.wrap_c {
  width: 94%;
  margin: 0px auto;
  padding: 0px;
  max-width: 1200px;
}
div {
  display: block;
}
ul {
  display: block;
  /* list-style-type: disc; */
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  margin: 0px;
  padding: 0px;
  list-style: none;
}

.kfsj_05 ul li {
  width: 100%;
  overflow: hidden;
  margin-top: 40px;
  position: relative;
  background-color: #fff;
  -moz-box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.04);
  -webkit-box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.04);
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.1);
}

.kfsj_05 ul li .fl {
  width: 32%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0px;
  top: 0px;
  float: left;
}
.kfsj_05 ul li .fr {
  width: 64%;
  margin-right: 2%;
  overflow: hidden;
  padding: 40px 0px;
  display: table;
  float: right;
}

ul li {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
}

.kfsj_05 ul li .fl img {
  width: 100%;
  height: 100%;
  display: block;
}

.kfsj_05 ul li .fr em.em1 span {
  width: 80%;
  display: block;
  overflow: hidden;
}

.kfsj_05 ul li .fr em.em1 span.sp1 {
  font-size: 20px;
  color: #333;
  line-height: 40px;
  &:hover {
    cursor: pointer;
  }
}

.kfsj_05 ul li .fr em.em1 span.sp2 {
  margin-top: 10px;
  font-size: 14px;
  color: #888;
  line-height: 24px;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 10px;
}

.kfsj_05 ul li .fr em {
  display: table-cell;
  font-style: normal;
  vertical-align: top;
}

a {
  color: #343434;
  text-decoration: none;
  outline: none;
}

a,
img {
  border: 0px;
}

.kfsj_05 ul li .fr em.em1 span.sp3 {
  margin-top: 15px;
}

.kfsj_05 ul li .fr em.em1 span.sp3 a {
  display: inline-block;
  line-height: 30px;
  background-color: #f8f8f8;
  border-radius: 30px;
  padding: 0px 15px;
  font-size: 14px;
  color: #888;
  margin-right: 10px;
  float: left;
}
.kfsj_05 ul li .fr em.em2 {
  width: 120px;
  position: relative;
}

.kfsj_05 ul li:hover .btn {
  background-color: #eb991e;
  color: white;
}

p.p3 {
  text-align: center;
  margin-top: 40px;
}
p {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 0px;
}
p {
  margin: 0px;
  padding: 0px;
  line-height: 20px;
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

input,
select,
textarea {
  font-family: "Microsoft Yahei";
  outline: none;
}

p.p2 {
  line-height: 35px;
  margin-top: 10px;
  font-size: 18px;
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
</style>

