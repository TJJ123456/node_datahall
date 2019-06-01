<template>
  <el-dialog title="充值" :visible.sync="visible">
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
</template>
<script>
export default {
  props: { visible: { require: true } },
  data() {
    return {
      chargeArr: [100, 200, 500, 1000],
      selectIndex: 0
    };
  },
  methods: {
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
        console.log(data);
        this.visible = false;
        this.$emit("handleCharge");
      }
    }
  }
};
</script>
<style lang="less" scoped>
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

