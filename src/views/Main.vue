<template>
  <el-container>
    <el-aside width="auto">
      <com-aside></com-aside>
    </el-aside>
    <el-container>
      <el-header>
        <com-header></com-header>
      </el-header>
      <com-tag></com-tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ComAside from "../components/ComAside.vue";
import ComHeader from "../components/ComHeader.vue";
import ComTag from "../components/ComTag.vue";

export default {
  name: "YangyuDemoHome",
  components: {
    ComAside,
    ComHeader,
    ComTag,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #333;
}

.el-main {
  padding: 0;
}
</style>