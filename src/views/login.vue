<template>
  <div class="wrapper">
    <div class="wind">
      <div class="tit">Matrix后台管理</div>
      <el-form :model="info">
        <el-form-item label="账号" prop="username" style="margin-bottom: 5px">
          <el-input v-model="info.username" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-bottom: 30px">
          <el-input
            v-model="info.password"
            placeholder=""
            type="password"
            @keyup.enter.native="onSubmit"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="submit"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { userLogin } from "./../util/post";
import * as masEncrypt from "@/util/masEncrypt-es-min.js";
export default {
  data() {
    return {
      info: {
        username: "",
        password: "",
      },
      // 用户登录的ID
      myId: "",
    };
  },
  mounted() {
    let XDate = 172800000;
  },
  methods: {
    onSubmit() {
      if (this.info.username == "admin" && this.info.password == "abc123") {
        this.myId = 1;
        this.$message.success("登录成功！");
        sessionStorage.setItem("empid", this.myId);
        let Ndate = new Date().getTime();
        let code = masEncrypt.default.encode({ login: 1 }, "matrixYYDS");
        localStorage.setItem("loginCode", code);
        this.$router.push("/home");
        console.log("登录ID:" + this.myId);
        //把从后端获取过来的userid存储到本地
      } else {
        this.$message.error("登录失败!");
      }
      return;
      userLogin(this.info).then((res) => {
        if (parseInt(res.reCode) !== 200) {
          return this.$message.error("登录失败!");
        } else {
          this.$message.success("登录成功！");
          this.$router.push("/home");
          this.myId = res.body.id;
          console.log("登录ID:" + this.myId);
          //把从后端获取过来的userid存储到本地
          sessionStorage.setItem("empid", this.myId);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.setPassword {
  position: absolute;
  right: 0;
  cursor: pointer;
  color: #838383;
}
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #2a4b69;
  .tit {
    position: absolute;
    left: calc(50% + 10px);
    top: 0;
    color: white;
    font-size: 40px;
    letter-spacing: 20px;
    text-align: center;
    width: 100%;
    transform: translate(-50%, -150%);
  }
}
.wind {
  position: relative;
  left: 50%;
  top: 50%;
  box-sizing: border-box;
  padding: 15px;
  padding-top: 20px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 500px;
  height: 300px;
}
.submit {
  left: 50%;
  position: relative;
  transform: translateX(-50%);
}
</style>
