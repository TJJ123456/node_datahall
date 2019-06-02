<template>
  <div>
    <headTop/>
    <h1>数据堂后台管理中心</h1>

    <div class="dashboard-editor-container">
      <panel-group
        @handleSetLineChartData="handleSetLineChartData"
        :userCount="userList.length"
        :orderCount="orderList.length"
        :chargeCount="chargeCount"
      />
      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
        <line-chart :chart-data="lineChartData"/>
      </el-row>
    </div>
  </div>
</template>
<script>
import PanelGroup from "../components/PanelGroup";
import LineChart from "../components/LineChart";
const lineChartData = {
  newVisitis: {
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
export default {
  data() {
    return {
      userList: [],
      orderList: [],
      chargeList: [],
      chargeCount: 0,
      lineChartData: lineChartData.newVisitis
    };
  },
  components: {
    PanelGroup,
    LineChart
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  watch: {},
  methods: {
    async initData() {
      let user = await this.$fetch("user/list");
      let order = await this.$fetch("order/list");
      let charge = await this.$fetch("user/chargelist");
      this.userList = user.data;
      this.orderList = order.data;
      this.chargeList = charge.data;

      this.chargeList.forEach(element => {
        this.chargeCount += element.money;
      });
      this.changeData();
    },
    changeData() {
      const start = new Date(new Date().toLocaleDateString()).getTime();
      lineChartData.newVisitis.actualData = [];
      lineChartData.messages.actualData = [];
      lineChartData.purchases.actualData = [];

      for (let i = 6; i > -1; i--) {
        let userArr = this.userList.filter(item => {
          if (item.createtime) {
            let begin = start - 86400000 * i;
            return (
              item.createtime > begin && item.createtime < begin + 86400000
            );
          } else {
            return false;
          }
        });
        lineChartData.newVisitis.actualData.push(userArr.length);

        let orderArr = this.orderList.filter(item => {
          if (item.createtime) {
            let begin = start - 86400000 * i;
            return (
              item.createtime > begin && item.createtime < begin + 86400000
            );
          } else {
            return false;
          }
        });
        lineChartData.messages.actualData.push(orderArr.length);

        let chargeArr = this.chargeList.filter(item => {
          if (item.createtime) {
            let begin = start - 86400000 * i;
            return (
              item.createtime > begin && item.createtime < begin + 86400000
            );
          } else {
            return false;
          }
        });
        let chargeCount = 0;
        chargeArr.forEach(item => {
          chargeCount += item.money;
        });
        lineChartData.purchases.actualData.push(chargeCount);
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>
<style lang="less" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
