<template>
  <div>
    <genreNav v-if="banByDetail()" @changeSelect="changeGenreSelect"/>
    <userDataList :dataList="showlist"/>
  </div>
</template>
  
<script>
import genreNav from "./genreNav";
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
  computed: {
    showlist() {
      if (this.genreSelectId === 999) return this.dataList;
      if (this.genreSelectId === 0) {
        return this.dataList.filter(item => item.type === 0);
      } else if (this.genreSelectId === 1) {
        return this.dataList.filter(item => item.type === 1);
      }
      return this.dataList.filter(item => {
        console.log(item.genre, this.genreSelectId);
        item.genre === this.genreSelectId;
      });
    }
  },
  components: { genreNav, userDataList },
  methods: {
    banByDetail() {
      return this.$route.name !== "detail";
    },
    async initData() {
      // this.getList();
      let data = await this.$fetch("data/list");
      this.dataList = data.data;
      // this.GetListCount();
    },
    changeGenreSelect(id) {
      this.genreSelectId = id;
    }
  }
};
</script>
