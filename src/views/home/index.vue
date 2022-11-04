<template>
  <div class="wrapper">
    <div class="header"></div>
    <div class="table">
      欢迎使用！
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted: function () {},
};
</script>
<style lang="less" scoped>
.wrapper {
  flex-direction: column;
  height: 100%;
  width: 99%;
  margin: 0 auto;
}
.header {
  height: 80px;
  padding: 20px 10px;
  box-sizing: border-box;
}
.table {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  text-align: center;
  font-size: 30px;
}
</style>