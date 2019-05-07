<template>
  <div>
    <template v-if="showlist.length">
      <userDataList :dataList="showlist"/>
    </template>
    <el-row type="flex" justify="center">
      <h2>暂无搜索结果</h2>
    </el-row>
  </div>
</template>
  
<script>
import userDataList from "./userDataList";
export default {
  data() {
    return {
      dataList: [],
      genreSelectId: 999
    };
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  watch: {
    keyword(val) {
      this.initData();
    }
  },
  computed: {
    showlist() {
      return this.dataList;
    }
  },
  components: { userDataList },
  methods: {
    async initData() {
      console.log("刷新？");
      // this.getList();
      let data = await this.$fetch("data/searchlist", {
        method: "POST",
        body: JSON.stringify({
          keyword: this.keyword
        })
      });
      this.dataList = data.data;
      // this.GetListCount();
    }
  },
  props: {
    keyword: {
      require: true
    }
  }
};
</script>
