<template>
  <div>
    <!-- <el-card class="box-card"> -->
    <!-- 搜索,添加 -->
    <el-row :gutter="20" class="head">
      <el-col :span="8"
        ><el-input
          placeholder="请输入用户名"
          clearable
          @clear="getAllUser"
          v-model="input.username"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addDialogVisible = true"
          >添加用户</el-button
        >
      </el-col>
    </el-row>
    <!-- 用户列表 -->

    <el-table
      :data="filtereduserlist"
      stripe
      style="width: 100%"
      height="480px"
    >
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="studentNumber" label="学号"> </el-table-column>
      <el-table-column prop="sex" label="性别"> </el-table-column>
      <el-table-column prop="phone" label="手机"> </el-table-column>
      <el-table-column prop="qqNumber" label="QQ号"> </el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.$index + 1, scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index + 1, scope.row)"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index + 1, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 主体 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="150px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="addForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qqNumber">
          <el-input v-model="addForm.qqNumber"></el-input>
        </el-form-item>
        <el-form-item label="empId" prop="empId">
          <el-input v-model="addForm.empId"></el-input>
        </el-form-item>
        <el-form-item label="groupId" prop="groupId">
          <el-input v-model="addForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="addForm.id"></el-input>
        </el-form-item>
        <el-form-item label="isMatrix" prop="isMatrix">
          <el-input v-model="addForm.isMatrix"></el-input>
        </el-form-item>
        <el-form-item label="mentorId" prop="mentorId">
          <el-input v-model="addForm.mentorId"></el-input>
        </el-form-item>
        <el-form-item label="isSubscribe" prop="isSubscribe">
          <el-input v-model="addForm.isSubscribe"></el-input>
        </el-form-item>
        <el-form-item label="roleId" prop="roleId">
          <el-input v-model="addForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="score" prop="score">
          <el-input v-model="addForm.score"></el-input>
        </el-form-item>
        <el-form-item label="status" prop="status">
          <el-input v-model="addForm.status"></el-input>
        </el-form-item>
        <el-form-item label="userLevel" prop="userLevel">
          <el-input v-model="addForm.userLevel"></el-input>
        </el-form-item>
        <el-form-item label="studentNumber" prop="studentNumber">
          <el-input v-model="addForm.studentNumber"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        ref="editFormRef"
        :model="editForm"
        label-width="110px"
        :rules="editFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="editForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qqNumber">
          <el-input v-model="editForm.qqNumber"></el-input>
        </el-form-item>
        <!-- 用户登录的ID -->
        <!-- <el-form-item label="empId" prop="empId">
          <el-input v-model="editForm.empId"></el-input>
        </el-form-item> -->
        <el-form-item label="groupId" prop="groupId">
          <el-input v-model="editForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>
        <el-form-item label="isMatrix" prop="isMatrix">
          <el-input v-model="editForm.isMatrix"></el-input>
        </el-form-item>
        <el-form-item label="mentorId" prop="mentorId">
          <el-input v-model="editForm.mentorId"></el-input>
        </el-form-item>
        <el-form-item label="isSubscribe" prop="isSubscribe">
          <el-input v-model="editForm.isSubscribe"></el-input>
        </el-form-item>
        <el-form-item label="roleId" prop="roleId">
          <el-input v-model="editForm.roleId"></el-input>
        </el-form-item>
        <el-form-item label="score" prop="score">
          <el-input v-model="editForm.score"></el-input>
        </el-form-item>
        <el-form-item label="userLevel" prop="userLevel">
          <el-input v-model="editForm.userLevel"></el-input>
        </el-form-item>
        <el-form-item label="studentNumber" prop="studentNumber">
          <el-input v-model="editForm.studentNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editsernfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情对话框 -->
    <el-dialog title="详情" :visible.sync="dialogVisible" width="50%">
      <!-- 主体 -->
      <el-form :model="xqdata" label-width="110px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="xqdata.username" readonly></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="xqdata.password" readonly></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="xqdata.email" readonly></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="xqdata.phone" readonly></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="xqdata.sex" readonly></el-input>
        </el-form-item>
        <el-form-item label="qq" prop="qqNumber">
          <el-input v-model="xqdata.qqNumber" readonly></el-input>
        </el-form-item>
        <!-- <el-form-item label="empId" prop="empId">
          <el-input v-model="xqdata.empId" readonly></el-input>
        </el-form-item> -->
        <el-form-item label="groupId" prop="groupId">
          <el-input v-model="xqdata.groupId" readonly></el-input>
        </el-form-item>
        <el-form-item label="id" prop="id">
          <el-input v-model="xqdata.id" readonly></el-input>
        </el-form-item>
        <el-form-item label="isMatrix" prop="isMatrix">
          <el-input v-model="xqdata.isMatrix" readonly></el-input>
        </el-form-item>
        <el-form-item label="mentorId" prop="mentorId">
          <el-input v-model="xqdata.mentorId" readonly></el-input>
        </el-form-item>
        <el-form-item label="isSubscribe" prop="isSubscribe">
          <el-input v-model="xqdata.isSubscribe" readonly></el-input>
        </el-form-item>
        <el-form-item label="roleId" prop="roleId">
          <el-input v-model="xqdata.roleId" readonly></el-input>
        </el-form-item>
        <el-form-item label="score" prop="score">
          <el-input v-model="xqdata.score" readonly></el-input>
        </el-form-item>
        <el-form-item label="userLevel" prop="userLevel">
          <el-input v-model="xqdata.userLevel" readonly></el-input>
        </el-form-item>
        <el-form-item label="studentNumber" prop="studentNumber">
          <el-input v-model="xqdata.studentNumber" readonly></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNumber"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- </el-card> -->
  </div>
</template>

<script>
import { getAll, deleteUser, add, edit, search } from "../../util/post";
export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法邮箱"));
    };
    // 验证手机规则
    var checkMobile = (rule, value, cb) => {
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入手机号"));
    };
    return {
      // 获取用户列表参数
      params: {
        id: 0,
        pageNumber: 1,
        pageSize: 6,
      },
      // 删除用户的参数
      removeparams: {
        empId: 8,
        id: 0,
        roleId: 0,
        username: "",
      },
      // 查询的用户
      editForm: {},
      //展示用户数据列表
      userlist: [],
      // 显示添加用户对话框
      addDialogVisible: false,
      // 添加用户的数据
      addForm: {
        email: "",
        // empId: sessionStorage.getItem("empid"),
        empId: 8,
        groupId: "",
        id: "",
        isMatrix: "",
        isSubscribe: "",
        mentorId: "",
        password: "",
        phone: "",
        qqNumber: "",
        roleId: "",
        score: "",
        sex: "",
        status: "",
        studentNumber: "",
        userLevel: "",
        username: "",
      },
      // 添加用户的验证规则
      addFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
      // 控制修改用户对话框
      editDialogVisible: false,
      // 验证修改用户信息规则
      editFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
      // 查询的用户
      editForm: {},
      // 查询输入
      input: {
        username: "",
      },
      // 控制详情页面显示
      dialogVisible: false,
      // 详情数据
      xqdata: [],
      // 总用户数量
      total: 0,
      // 控制修改用户对话框显示
      editDialogVisible: false,
      // 验证修改用户信息规则
      editFormRules: {
      },
    };
  },

  methods: {
    // 点击修改按钮显示修改对话框
    showEditDialog() { },
    // 获取用户列表
    getAllUser() {
      getAll(this.params).then((res) => {
        this.userlist = res.body.dataList;
        this.total = res.body.allTotal;
        // this.userlist = this.userlist.filter(v => v.id !== 8)
      });
    },
    // 监听添加用户对话框关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击编辑按钮
    handleEdit(index, row) {
      // console.log(index, row);
      this.editDialogVisible = true;
      this.editForm = row;
      this.editForm.empId = 8
      // console.log(888,this.editForm);
    },
    // 点击删除按钮
    async handleDelete(index, row) {
      console.log(index, row);
      // this.removeparams.empId = window.sessionStorage.getItem('empid') || 0;
      this.removeparams.empId = 8;
      this.removeparams.id = row.id;
      this.removeparams.roleId = row.roleId;
      // console.log(this.removeparams.empId);
      this.removeparams.username = row.username;
      const ress = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (ress !== "confirm") {
        return this.$message.error("取消删除");
      }
      // 发起删除请求
      deleteUser(this.removeparams).then((res) => {
        if (parseInt(res.reCode) !== 200) {
          return this.$message.error("删除失败");
        }
        this.getAllUser();

        return this.$message.success("删除成功");
      });
    },
    // 点击添加用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        // 发起添加用户请求
        // console.log(1111,this.addForm);
        add(this.addForm).then((res) => {
          if (parseInt(res.reCode) !== 200) {
            this.$message.error("添加用户失败");
          } else {
            this.$message.success("添加用户成功");
          }

          this.getAllUser();
        });
        // 隐藏对话框
        this.addDialogVisible = false;
      });
    },
    // 监听用户修改对话框的关闭
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 点击确定修改
    editsernfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 发修改请求
        // console.log(666,this.editForm);
        await edit(this.editForm).then((res) => {
          console.log(res);
          if (parseInt(res.reCode) !== 200) {
            return this.$message.error("修改信息失败");
          } else {
            // 关闭对话框
            this.editDialogVisible = false;
            // 更新用户列表
            this.getAllUser();
            // 提示成功
            this.$message.success("修改成功");
          }
        });
      });
    },
    // 点击搜索用户
    searchUser() {
      search(this.input).then((ress) => {
        console.log(ress.body.dataList);
        console.log(8989);
        getAll(this.input).then((res) => {
          this.userlist = ress.body.dataList;
        });
      });
    },
    // 点击查看详情
    handleDetail(index, row) {
      // console.log(index, row);
      this.dialogVisible = true;
      this.xqdata = row;
      console.log(this.xqdata);
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.params.pageSize = newSize;
      this.getAllUser();
    },
    // 监听页码值改变
    handleCurrentChange(newPage) {
      this.params.pageNumber = newPage;
      this.getAllUser();
    },
    // 监听用户修改对话框的关闭
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
  },
  created() {
    this.getAllUser();

    // console.log('^^^^^^^^^^',this.empid);
    // console.log(sessionStorage.getItem('empid'));
  },
  computed: {
    filtereduserlist: function () {
      return this.userlist.filter(v => v.id !== 8)
    }
  }
  };
</script>

<style lang="less" scoped>
.head {
  margin-bottom: 15px;
}
</style>