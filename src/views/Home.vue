<template>
  <div class="wrapper">
    <div class="navside">
      <el-menu
        class="navside"
        :default-active="dPath"
        router
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="everytip">
          <i class="el-icon-menu"></i>
          <span slot="title">每日一题</span>
        </el-menu-item>
        <el-menu-item index="userManage">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <div class="header">martix后台管理系统
        <el-button style="float: right;margin-right: 20px;" @click="exit">退出登录</el-button>
      </div>
      <div class="body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}
.header {
  text-align: center;
  padding: 20px 0;
  font-size: 25px;
  background-color: white;
  letter-spacing: 20px;
}
.body {
  background-color: #eff1f4;
  height: calc(100% - 80px);
  // overflow: auto;
  overflow-y:auto;
  width: 99%;
  box-sizing: border-box;
  background-color: white;
  padding: 10px;
}
.main {
  flex: 1;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
}
.navside {
  width: 200px;
  height: 100%;
}
</style>
<script>
export default {
  name: "Home",
  data() {
    return {
      dPath: ''
    }
  },
  components: {},
  mounted(){
    this.dPath=this.$route.path.split('/')[2]
  },
  methods:{
    exit(){
      window.sessionStorage.clear()
      window.localStorage.clear()
      this.$router.push('/login')
      
    }
  }
};
</script>
