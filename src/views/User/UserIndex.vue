<template>
  <div class="manage">
    <el-dialog
      :visible.sync="isShow"
      :title="opeartType === 'add' ? '新增用户' : '编辑用户'"
    >
      <com-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></com-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <com-form
        :formLabel="addFormLabel"
        :form="addForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(addForm.keyword)"> 搜索</el-button>
      </com-form>
    </div>

    <com-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></com-table>
  </div>
</template>

<script>
import ComForm from "../../components/ComForm.vue";
import ComTable from "../../components/ComTable.vue";
import { getUser } from "../../../api/data";

export default {
  name: "User",
  components: {
    ComForm,
    ComTable,
  },
  data() {
    return {
      isShow: false,
      opeartType: "add",
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      addFormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      addForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sex",
          label: "性别",
        },

        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "住址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    addUser() {
      this.isShow = true;
      this.opeartType = "add";
      operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      this.opeartType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除此文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .post("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
          });
      });
    },
    comfirm() {
      if (this.opeartType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          console.log(res);
          this.getList();
        });
      }
    },
    //获取表格数据
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";

      getUser({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        this.tableData = res.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>


<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
.manage {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>