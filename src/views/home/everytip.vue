<template>
  <div>
    <el-button class="btn" @click="handleAdd">+ 增加</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="创建日期" prop="gmdCreate" width="120px">
      </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>

      <el-table-column label="等级" prop="problemLevel" width="80px">
      </el-table-column>
      <el-table-column label="链接" prop="link" min-width="160px">
      </el-table-column>
      <el-table-column label="标签" prop="algorithmTag" width="120px">
      </el-table-column>
      <el-table-column align="right" width="250px">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setScore(scope.row)"
            >打分</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改题目" :visible.sync="dialogTableVisible">
      <el-form :model="formData" label-width="150px">
        <el-form-item label="题目名称" :label-width="formLabelWidth">
          <el-input v-model="formData.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目描述" :label-width="formLabelWidth">
          <el-input
            v-model="formData.problemDescribe"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目等级" :label-width="formLabelWidth">
          <el-input
            v-model="formData.problemLevel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目链接" :label-width="formLabelWidth">
          <el-input v-model="formData.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目标签" :label-width="formLabelWidth">
          <el-input
            v-model="formData.algorithmTag"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="formData.gmtCreate"
              align="right"
              type="date"
              @change="test"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm_table">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="增加题目" :visible.sync="isShow">
      <el-form :model="addTable">
        <el-form-item label="题目名称" :label-width="formLabelWidth">
          <el-input v-model="addTable.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目描述" :label-width="formLabelWidth">
          <el-input
            v-model="addTable.problemDescribe"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目等级" :label-width="formLabelWidth">
          <el-input
            v-model="addTable.problemLevel"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目链接" :label-width="formLabelWidth">
          <el-input v-model="addTable.link" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目答案链接" :label-width="formLabelWidth">
          <el-input v-model="addTable.answer" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题目标签" :label-width="formLabelWidth">
          <el-input
            v-model="addTable.algorithmTag"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker
              v-model="addTable.createTime"
              align="right"
              type="date"
              @change="test"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm_add">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="打分"
      :visible.sync="setScoreShow"
      width="50%"
      :close-on-click-modal="false"
    >
      <span>
        <div style="overflow: auto; height: 50vh">
          <el-table :data="scoreData" border stripe>
            <el-table-column prop="userName" label="昵称"> </el-table-column>
            <el-table-column label="链接" width="80">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  :title="scope.row.link"
                  @click="openNew(scope.row.link)"
                  >点击跳转</a
                >
              </template>
            </el-table-column>
            <el-table-column label="得分">
              <template slot-scope="scope">
                <el-row :gutter="10">
                  <el-col :span="15" :offset="0">
                    <el-input
                      v-model="scope.row.score"
                      placeholder="暂未打分"
                      size="small"
                    ></el-input>
                  </el-col>
                  <el-col :span="3" :offset="0">
                    <el-button
                      type="primary"
                      size="small"
                      @click="setScoreHandle(scope.row)"
                      >打分</el-button
                    ></el-col
                  >
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTip,
  changeTip,
  deleteTip,
  addTip,
  getBlogs,
  addScore,
} from "../../util/post";
export default {
  data() {
    return {
      setScoreShow: false,
      isShow: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      tableData: [],
      formData: {},
      addTable: {
        algorithmTag: "",
        answer: "",
        dataStructureTag: "",
        link: "",
        matrixUser: 8,
        problemDescribe: "",
        problemLevel: "",
        tag: "",
        title: "",
        video: "",
        createTime: "",
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      search: "",
      params: {
        id: 0,
        pageNumber: 1,
        pageSize: 9999,
      },
      params_del: {
        matrixUser: 8,
        pid: 0,
      },
      scoreData: [],
    };
  },
  watch: {
    tableData(val) {
      console.log(val, "@@");
    },
  },
  methods: {
    test() {},
    openNew(link) {
      window.open(link);
    },
    async setScore(row) {
      const res = await getBlogs(row.id);
      this.setScoreShow = true;
      this.scoreData = res.body.dataList;
      console.log(this.scoreData);
    },
    async setScoreHandle(row) {
      console.log(row);
      let res = await addScore({
        blogId: row.id,
        score: parseFloat(row.score),
        userId: 8,
      });
      this.$message.success(res.reMsg);
    },
    confirm_table() {
      console.log(this.formData);
      this.dialogTableVisible = false;
      changeTip(this.formData).then((res) => {
        if (res.reCode == 100) {
          this.$message.info(res.reMsg);
        } else {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.reSet();
        }
      });
    },
    confirm_add() {
      this.isShow = false;
      addTip(this.addTable).then((res) => {
        console.log(res);
        if (res.reCode == 100) {
          this.$message.info(res.reMsg);
        } else {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.reSet();
          this.addTable = {
            algorithmTag: "",
            answer: "",
            dataStructureTag: "",
            link: "",
            matrixUser: 8,
            problemDescribe: "",
            problemLevel: "",
            tag: "",
            title: "",
            video: "",
            createTime: "",
          };
        }
      });
    },
    handleEdit(index, row) {
      this.dialogTableVisible = true;
      this.formData = row;
      this.formData["matrixUser"] = 8;
    },
    handleDelete(index, row) {
      // this.formData["pid"] = 0;
      this.params_del.pid = row.id;
      deleteTip(this.params_del).then((res) => {
        if (res.reCode == 100) {
          this.$message.info(res.reMsg);
        } else {
          this.$message.closeAll();
          this.$message({
            message: "删除成功",
            type: "success",
          });
          this.reSet();
        }
      });
    },
    handleAdd() {
      console.log(111);
      this.isShow = true;
    },
    reSet() {
      getTip(this.params).then((res) => {
        console.log(res.body.dataList);
        this.tableData = res.body.dataList;
      });
    },
  },
  mounted() {
    this.reSet();
    this.test();
  },
};
</script>

<style lang="less" scoped>
// .wrapper {
//   height: 100vw;
//   width: 100vw;
//   overflow: hidden;
// }
.btn {
  margin-top: 15px;
  margin-left: 15px;
}
</style>
