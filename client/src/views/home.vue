<template>
  <div>
    <headTop/>
    <h1>数据堂后台管理中心</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bookCount: 0,
      bookshelfCount: 0,
      genreCount: 0,
      userCount: 0
    };
  },
  created() {
    // this.initData();
  },
  activated() {
    // this.initData();
  },
  watch: {},
  methods: {
    async initData() {
      let bookCount = await this.$fetch("book/count");
      let bookshelfCount = await this.$fetch("bookshelf/count");
      let genreCount = await this.$fetch("genre/count");
      let userCount = await this.$fetch("user/count");
      this.bookCount = bookCount.data;
      this.bookshelfCount = bookshelfCount.data;
      this.genreCount = genreCount.data;
      this.userCount = userCount.data;
    }
  }
};
</script>