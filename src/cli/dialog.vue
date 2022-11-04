<template>
  <div class="wrapper">
    <el-dialog title="背景图片设置" :visible.sync="backImgPopShow" width="40%">
      <el-form label-width="60px">
        <el-form-item label="图片">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            action="#"
            :http-request="handleUploadFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="backImgPopShow = false">取 消</el-button>
        <el-button type="primary" @click="handleBackImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods:{
    handleUploadFile(file){

    }
  }
};
</script>
<style lang="less" scoped>
</style>