<template>
  <div class="tag-container">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name != 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(tag, index) {
      //当前关闭项，不是当前打开项，则无需跳转
      let tagLength = this.tags.length - 1;
      this.close(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      if (index === tagLength) {
        //如果是最后一项，焦点向左移动
        this.$router.push({ name: this.tags[index - 1].name });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
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
.tag-container {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
