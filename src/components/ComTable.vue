<template>
  <div class="common-table">
    <el-table :data="tableData" style="height: 80%; width: 90%" stripe border>
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      :page-size="20"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      @current-change="changePages"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "ComTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {},
  methods: {
    //将选中行传递给父组件
    handleEdit(row) {
      this.$emit("edit", row);
      // console.log(this.tableData);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePages(page) {
      this.$emit("change", page);
    },
  },
};
</script>

<style lang="less" scoped>
</style>