<template>
  <div class="home-container">
    <el-row :gutter="20" style="margin: 20px">
      <el-col :span="8">
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" class="userImg" />
            <div class="userInfo">
              <p class="ft-s24">洋芋果果</p>
              <p>系统管理员</p>
            </div>
          </div>
          <div class="loginInfo ft-color">
            <p>上次登录时间：<span>2021-3-21</span></p>
            <p>上次登录地点：<span>重庆</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px" shadow="hover">
          <el-table :data="tableData" style="height: 480px">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
            class="billCard"
          >
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
          <el-card style="height: 280px; width: 98%; margin-bottom: 10px">
            <echart style="height: 280px" :chartData="echartData.order" />
          </el-card>
          <div class="graph">
            <el-card style="height: 260px">
              <echart style="height: 240px" :chartData="echartData.user" />
            </el-card>
            <el-card style="height: 260px; margin-left: 20px">
              <echart
                style="height: 240px"
                :chartData="echartData.video"
                :isAxisChart="false"
              />
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../../../api/data.js";
import Echart from "../../components/Echarts.vue";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/head.png"),
      tableData: [],
      tableLabel: {
        name: "品类",
        todayBuy: "今日销量",
        monthBuy: "本月销量",
        totalBuy: "总计销量",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 897,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 891,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        //表格
        this.tableData = data.tableData;

        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });
        //折线图
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        //柱状图
        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        //饼图
        this.echartData.video.series = {
          data: data.videoData,
          type: "pie",
        };
      }
    });
  },
};
</script>


<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  .user {
    display: flex;
    border-bottom: 1px solid lightgray;
    padding-bottom: 10px;
    .userInfo {
      margin-left: 20px;
    }
  }
}
.userImg {
  width: 120px;
  height: 120px;
  border-radius: 7%;
}
.ft-s24 {
  font-size: 24px;
}
.ft-b {
  font-weight: bold;
}
.ft-color {
  color: #524c4c;
}
.num {
  .billCard {
    width: 32%;
    height: 75px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .icon {
    width: 75px;
    height: 75px;
    text-align: center;
    line-height: 75px;
    color: #fff;
    font-size: 27px;
  }
  .detail p {
    margin: 5px;
  }
  .detail .num {
    font-size: 24px;
  }
  .graph {
    width: 100%;
    height: 260px;
    .el-card {
      width: 48%;
      float: left;
    }
  }
}
</style>