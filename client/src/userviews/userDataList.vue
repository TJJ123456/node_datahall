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
      <p class="p2">
        <span>数据名称: {{buyItem.name}}</span>
      </p>
      <p class="p2">
        <span>数据价格: {{buyItem.price}}</span>
      </p>
      <p class="p3">
        <input @click="confirmBuy()" type="button" class="zxtc_btn" value="确定购买">
      </p>
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
      buyItem: {}
    };
  },
  computed: {
    showList() {
      return this.dataList.slice(this.offset, this.offset + 10);
    }
  },
  methods: {
    getImgpath(path) {
      return 'http://localhost:3000/' + path;
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
        this.dialogFormVisible = false;
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
}
</style>

