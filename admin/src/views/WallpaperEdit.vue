<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>壁纸管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加壁纸</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <h1>{{ id ? '编辑' : '添加' }}壁纸</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input  v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="壁纸">
        <el-upload
          class="avater-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :on-success="handleWPSuccess">
          <img v-if="model.pic" :src="model.pic" class="icon">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保 存</el-button>
      </el-form-item>

      </el-form> 
    </el-card>
  </div>
</template>

<script>

  export default {
    props: {
      id: {}
    },
    data() {
      return {
        model: {},
      }
    },
    methods: {
      async save() {
        if (this.id) {
          const res = await this.$http.put (`rest/wallpaper/${this.id}`, this.model)
        } else {
          const res = await this.$http.post('rest/wallpaper', this.model)
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push('/wallpaper')

      },
      async getwallpaper() {
        const res = await this.$http.get(`rest/wallpaper/${this.id}`)
        this.model = res.data
      },
      handleWPSuccess(res) {
          this.$set(this.model, 'pic', res.url )
        },
      
    },
    created() {
      if(this.id) {
        this.getwallpaper()
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
