<template>
  <div class="wrap kfsj_05">
    <div class="wrap_c">
      <ul>
        <li>
          <div class="fl">
            <img src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg" alt>
          </div>
          <div class="fr"></div>
        </li>
        <li>
          <div class="fl">
            <img src="http://localhost:3000/public/img/datatang_tuxiang_default.jpg" alt>
          </div>
          <div class="fr"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {};
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
  list-style-type: disc;
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
</style>

