<template>
  <div>
    <div class="genreNav">
      <div class="wrap_c">
        <ul>
          <li>
            <span>图像数据</span>
            <em>
              <a :class="{select: selectId === 0}" @click="setSelectId(0)">不限</a>
              <a
                @click="setSelectId(item._id)"
                :class="{select: selectId === item._id}"
                v-for="(item, index) in imgGenreList"
                :key="index"
              >{{item.name}}</a>
            </em>
          </li>
          <li>
            <span>文本数据</span>
            <em>
              <a :class="{select: selectId === 1}" @click="setSelectId(1)">不限</a>
              <a
                @click="setSelectId(item._id)"
                :class="{select: selectId === item._id}"
                v-for="(item, index) in txtGenreList"
                :key="index"
              >{{item.name}}</a>
            </em>
          </li>
        </ul>
      </div>
    </div>
    <div class="tab">
      <div class="wrap_c">
        <div class="fl">
          <a>默认排序</a>
          <b></b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectId: 999,
      genreList: []
    };
  },
  computed: {
    imgGenreList() {
      let list = this.genreList.filter(item => item.type === 0);
      return list;
    },
    txtGenreList() {
      let list = this.genreList.filter(item => item.type === 1);
      return list;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let data = await this.$fetch("genre/list");
      this.genreList = data.data;
    },
    test(index) {
      console.log(index);
    },
    setSelectId(id) {
      this.selectId = id;
      this.$emit("changeSelect", id);
    }
  }
};
</script>
<style lang="less" scoped>
.genreNav {
  overflow: hidden;
  background-color: #fff;
  padding: 40px 0px;
  width: 100%;
  margin: 0px auto;
}
.tab {
  width: 100%;
  margin: 0px auto;
  padding: 0px;
}
.fl {
  float: left;
}
.wrap_c {
  width: 94%;
  margin: 0px auto;
  padding: 0px;
  position: relative;
  max-width: 1200px;
}
ul {
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
.genreNav ul li {
  width: 100%;
  overflow: hidden;
  display: table;
  border-bottom: 1px dotted #e3e3e3;
  padding: 10px 0px;
}

.genreNav ul li em a {
  float: left;
  font-size: 15px;
  color: #888;
  line-height: 30px;
  margin-right: 30px;
  margin-top: 3px;
}
a {
  text-decoration: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
}
a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
  text-decoration: underline;
}

.genreNav ul li span {
  display: table-cell;
  width: 100px;
  font-size: 18px;
  color: #000;
  line-height: 30px;
  vertical-align: top;
}

.tab .fl a {
  display: inline-block;
  font-size: 15px;
  color: #f5a21b;
  margin-left: 25px;
  padding: 0px 10px 10px 10px;
  border-bottom: 2px solid #f5a21b;
  line-height: 40px;
}
.tab b {
  width: 100%;
  height: 1px;
  display: block;
  overflow: hidden;
  background-color: #e3e3e3;
  position: absolute;
  left: 0px;
  bottom: -52px;
}

.genreNav ul li em a.select {
  color: #f5a21b;
}
</style>
