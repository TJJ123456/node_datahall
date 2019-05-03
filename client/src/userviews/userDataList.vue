<template>
  <div class="wrap kfsj_05">
    <div class="wrap_c">
      <ul>
        <li class="fl" v-for="(item, index) in dataList" :key="index">
          <div class="fl">
            <img src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg" alt>
          </div>
          <div class="fr">
            <em class="em1">
              <span class="sp1">
                <a>{{item.name}}</a>
              </span>
              <span class="sp2">{{item.desc}}</span>
              <span class="sp3">
                <a>{{item.keyword}}</a>
              </span>
            </em>
            <em class="em2">
              <span class="sp1">
                <el-button round>我要购买</el-button>
              </span>
            </em>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  methods: {
    async initData() {
      // this.getList();
      let data = await this.$fetch("data/list");
      this.dataList = data.data;
      // this.GetListCount();
    }
  }
};
</script>
<style scoped>
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
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.04);
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
</style>

