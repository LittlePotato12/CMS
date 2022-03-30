<template>
  <div ref="echart"></div>
</template>


<script>
import * as echarts from "echarts";

export default {
  props: {
    //表格类型，是折线柱状，还是饼图
    isAxisChart: {
      type: Boolean,
      default: true,
    },
    //定义参数类型
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series:[],
        };
      },
    },
  },
  data() {
    return {
      //柱状图数据
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      //饼状图数据
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
    };
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
        this.initChartData()
        if(this.echart){
            this.echart.setOption(this.options);
        }else{
            this.echart = echarts.init(this.$refs.echart);
            this.echart.setOption(this.options);
        }
    },
    initChartData(){
        if(this.isAxisChart){
            this.axisOption.xAxis.data = this.chartData.data;
            this.axisOption.series = this.chartData.series;
        }else{
            this.normalOption.series = this.chartData.series;
        }
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
};
</script>