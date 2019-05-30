<template>
  <div>
    <userhead/>
    <keep-alive>
      <router-view></router-view>
      <!-- <userDataList/> -->
    </keep-alive>
    <userfoot/>
  </div>
</template>
<script>
import userLogin from "./login";
import userhead from "./userhead";
import userfoot from "./userfoot";
import navMenu from "./navMenu";
import userDataList from "./userDataList";
export default {
  components: { userhead, userDataList, userfoot },
  methods: {}
};
</script>
