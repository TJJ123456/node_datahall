<template>
  <div>
    <userhead/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import userLogin from "./login";
import userhead from "./userhead";
import navMenu from "./navMenu";
export default {
  components: { userhead, navMenu }
};
</script>
