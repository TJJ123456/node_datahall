<template>
  <div>
    <userhead/>
    <keep-alive>
      <router-view></router-view>
      <!-- <userDataList/> -->
    </keep-alive>
  </div>
</template>
<script>
import userLogin from "./login";
import userhead from "./userhead";
import navMenu from "./navMenu";
import userDataList from "./userDataList";
export default {
  components: { userhead, userDataList },
  methods: {

  }
};
</script>
