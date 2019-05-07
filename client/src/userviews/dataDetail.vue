<template>
  <div>
    <div class="wrap sitefr">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="wrap_c">
      <div class="cpxq_01_cell cpxq_01_l" id="titleimg">
        <div class="cpxq_01">
          <div class="cpxq_01_cell cpxq_01_l">
            <img
              src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg"
              height="330px"
              width="540px"
            >
          </div>
          <div class="cpxq_01_cell cpxq_01_r">
            <p class="p1" id="dataname">{{item.name}}</p>
            <p class="p2" id="datatag">{{item.keyword}}</p>
            <p class="p3" id="datainfo">{{item.desc}}</p>
            <p class="p4">
              <a v-if="checkBuy">获取数据</a>
              <a v-else @click="buy(item)">我要购买</a>
            </p>
          </div>
        </div>
      </div>
      <div class="cpxq_02">
        <div class="cpxq_02_t">相关推荐</div>
        <div class="cpxq_02_c">
          <div class="cpxq_02c_slide swiper-container-horizontal">
            <div class="swiper-wrapper">
              <div
                style="width: 237.5px; margin-right: 20px;"
                class="swiper-slide swiper-slide-active"
              >
                <a>
                  <em>
                    <img src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg" alt>
                  </em>
                  <span>哈哈哈</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cpxq_xx"></div>
      <div class="cpxq_03">
        <div class="cpxq_03_t">
          <span>数据介绍</span>
        </div>
        <div class="cpxq_03_c">
          <div class="cpxq_03c_c">
            <p id="datainfo1">{{item.desc}}</p>
          </div>
        </div>
      </div>
      <div class="cpxq_03">
        <div class="cpxq_03_t">
          <span>版权归属</span>
        </div>
        <div class="cpxq_03_c1">
          <div class="cpxq_03c_c1">
            <table cellpadding="0" cellspacing="0">
              <tbody>
                <tr>
                  <td class="td1">版权归属</td>
                  <td>数据所</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="购买数据" :visible.sync="dialogFormVisible">
      <p class="p2">
        <span>数据名称: {{item.name}}</span>
      </p>
      <p class="p2">
        <span>数据价格: {{item.price}}</span>
      </p>
      <p class="p3">
        <input @click="confirmBuy()" type="button" class="zxtc_btn" value="确定购买">
      </p>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      require: true
    }
  },
  data() {
    return {
      item: {},
      mylist: [],
      dialogFormVisible: false
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  computed: {
    checkBuy() {
      return this.mylist.find(item => item.dataid === this.id);
    }
  },
  methods: {
    async initData() {
      let data = await this.$fetch("data/data", {
        method: "POST",
        body: JSON.stringify({
          id: this.id
        })
      });
      this.item = data.data;
      this.getuserlist();
    },
    async getuserlist() {
      if (this.$state.user) {
        let data = await this.$fetch("order/userlist");
        if (data.err) {
          if (data.msg === "请登录") {
            this.$router.replace("/login", "");
          }
        } else {
          this.mylist = data.data;
        }
      }
    },
    buy(item) {
      this.dialogFormVisible = true;
    },
    async confirmBuy() {
      let data = await this.$fetch("order/create", {
        method: "POST",
        body: JSON.stringify({
          dataid: this.id,
          price: this.item.price
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
        this.getuserlist();
        this.dialogFormVisible = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sitefr {
  overflow: hidden;
  padding-top: 60px;
  font-size: 14px;
  color: #999;
}
.wrap {
  width: 100%;
  margin-top: 20px;
  margin-left: 60px;
  padding: 0px;
}

.wrap_c {
  overflow: hidden;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 40px 0px;
}
.wrap_c {
  width: 94%;
  margin: 0px auto;
  padding: 0px;
  max-width: 1200px;
}

.cpxq_01 {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 0px;
  display: table;
}

.cpxq_01 .cpxq_01_l {
  overflow: hidden;
}
.cpxq_01 .cpxq_01_cell {
  display: table-cell;
  overflow: hidden;
  vertical-align: middle;
  width: 50%;
}
.cpxq_01 .cpxq_01_cell {
  display: table-cell;
  overflow: hidden;
  vertical-align: middle;
  width: 50%;
}

.cpxq_01 .cpxq_01_r p {
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
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.cpxq_01 .cpxq_01_r p.p1 {
  font-size: 20px;
  color: #000;
  line-height: 40px;
}

.cpxq_01 .cpxq_01_r p.p2 {
  font-size: 16px;
  color: #000;
  line-height: 24px;
}

.cpxq_01 .cpxq_01_r p.p3 {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  line-height: 24px;
  margin-top: 10px;
}

.cpxq_01 .cpxq_01_r p.p4 {
  margin-top: 40px;
}

.cpxq_01 .cpxq_01_r p.p4 a {
  display: inline-block;
  line-height: 36px;
  padding: 0px 40px;
  margin-right: 30px;
  border-radius: 20px;
  border: 1px solid #e3e3e3;
  font-size: 14px;
  color: #333;
  &:hover {
    background-color: #eb991e;
    color: white;
    cursor: pointer;
  }
}

.cpxq_02 {
  width: 100%;
  overflow: hidden;
  margin-top: 40px;
}
.cpxq_02_t {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 0px;
  font-size: 18px;
  color: #000;
  line-height: 30px;
}

.cpxq_02_c {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
  position: relative;
}

.cpxq_02c_slide {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 0px;
  position: relative;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.cpxq_02c_slide .swiper-slide {
  width: 25%;
  overflow: hidden;
  float: left;
}
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.cpxq_02c_slide .swiper-slide a {
  width: 100%;
  display: block;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
}

.cpxq_02c_slide .swiper-slide em {
  width: 100%;
  display: block;
  overflow: hidden;
}

.cpxq_02c_slide .swiper-slide em img {
  width: 100%;
  display: block;
  transition: 0.3s ease-in-out;
  -webkit-transition: 0.3s ease-in-out;
  -o-transition: 0.3s ease-in-out;
  -moz-transition: 0.3s ease-in-out;
}

.cpxq_02c_slide .swiper-slide a:hover span {
  color: #f5a21b;
}

.cpxq_02c_slide .swiper-slide a:hover img {
  color: #f5a21b;
  transform: scale(1.2);
}

.cpxq_02c_slide .swiper-slide span {
  width: 100%;
  display: block;
  overflow: hidden;
  font-size: 14px;
  color: #000;
  line-height: 24px;
  margin-top: 5px;
  text-align: center;
}

.cpxq_xx {
  width: 90%;
  overflow: hidden;
  height: 1px;
  margin: 0px auto;
  margin-top: 60px;
  padding: 0px;
  background-color: #e3e3e3;
}

.cpxq_03 {
  overflow: hidden;
  width: 90%;
  margin: 0px auto;
  padding: 0px;
  margin-top: 40px;
}
.cpxq_03_t span {
  display: inline-block;
  line-height: 40px;
  font-size: 20px;
  color: #333;
  background-size: 26px;
  padding-left: 40px;
}
.cpxq_03_c {
  width: 96%;
  margin-left: 4%;
  overflow: hidden;
  position: relative;
  margin-top: 30px;
}

.cpxq_03c_c {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 20px 0px;
  border: 2px solid;
  border-radius: 25px;
}

.cpxq_03_c1 {
  width: 96%;
  margin-left: 4%;
  overflow: hidden;
  position: relative;
  margin-top: 30px;
}
.cpxq_03c_c1 {
  width: 90%;
  overflow: hidden;
  margin: 0px auto;
  padding: 40px 0px;
  border: #e3e3e3 1px solid;
}
.cpxq_03c_c1 table {
  width: 100%;
  overflow: hidden;
}
table {
  display: table;
  border-collapse: separate;
  border-spacing: 2px;
  border-color: grey;
}
tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}
.cpxq_03c_c1 table tr td.td1 {
  color: #000;
  width: 100px;
}

.cpxq_03c_c1 table tr td {
  border-bottom: 1px solid #e3e3e3;
  font-size: 14px;
  color: #666;
  line-height: 24px;
  padding: 10px;
  text-align: left;
  vertical-align: top;
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
}
</style>

