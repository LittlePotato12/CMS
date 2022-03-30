<template>
  <div class="main-container">
    <div class="l-content">
      <button
        class="el-icon-menu buttonTop"
        size="mini"
        @click="handleMenu"
      ></button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          class="myColor"
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini">
        <img :src="headImg" class="headImg" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      headImg: require("../assets/head.png"),
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    loginOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.Tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .l-content {
    display: flex;
    align-items: center;
    color: #fff;
    .buttonTop {
      margin-right: 20px;
    }
   
  }
}
//重写面包屑的字体颜色
.myColor /deep/ .el-breadcrumb__inner {
  color: #fff ;
}
.headImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
