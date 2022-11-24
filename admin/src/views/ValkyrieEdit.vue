<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>女武神管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加女武神</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <h1>{{ id ? '编辑' : '添加' }}女武神</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select  v-model="model.categories" >
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input  v-model="model.name"></el-input>
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
        categories:[]
      }
    },
    methods: {
      async save() {
        if (this.id) {
          const res = await this.$http.put (`rest/valkyrie/${this.id}`, this.model)
        } else {
          const res = await this.$http.post('rest/valkyrie', this.model)
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push('/valkyrie')

      },
      async getValkyrieList() {
        const res = await this.$http.get(`rest/valkyrie/${this.id}`)
        this.model = res.data
      },
      async getCategories() {
        const res = await this.$http.get('rest/categories')
        this.categories = res.data
      },
      
    },
    created() {
      this.getCategories()
      if(this.id) {
        this.getValkyrieList()
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
