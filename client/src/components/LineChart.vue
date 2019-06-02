<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from "echarts";
import dtime from "time-formater";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
const sevenDay = [];
for (let i = 6; i > -1; i--) {
  const date = dtime(new Date().getTime() - 86400000 * i).format("YYYY-MM-DD");
  sevenDay.push(date);
}
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: sevenDay,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ["每日变化"]
        },
        series: [
          {
            name: "每日变化",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2
                },
                areaStyle: {
                  color: "#f3f8ff"
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: "quadraticOut"
          }
        ]
      });
    }
  }
};
</script>
