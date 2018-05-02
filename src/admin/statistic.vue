<template>
    <section>
        <div id="myChart"  >Here</div>
    </section>
</template>
<script>
import axios from "axios";
import qs from "qs";
import echarts from "echarts";
export default {
  data() {
    return {
      options: {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "60%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.draw(this.options);
  },
  methods: {
    draw(opts) {
      var myChart = this.$echarts.init(document.getElementById("myChart"));
      myChart.setOption(opts);
    },

  }
};
</script>
<style>
#myChart {
  width: 500px;
  height: 500px;
}
</style>