<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "洋芋后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :index="item.index"
      :key="item.path"
      @click="changeMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-submenu-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
      >
        <el-menu-item  @click="changeMenu(subItem)" :index="subIndex">{{ subItem.label }}</el-menu-item>
      </el-submenu-group>
    </el-submenu>
  </el-menu>
</template>


<script>


export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit('selectMenu',item);
    },
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.Tab.isCollapse;
    },
    asyncMenu(){
      return this.$store.state.Tab.menu
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    line-height: 48px;
    text-align: center;
    color: #fff;
  }
}
</style>