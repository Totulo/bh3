<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <h1>{{ id ? '编辑' : '添加' }}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input  v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input  v-model="model.password"></el-input>
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
          const res = await this.$http.put (`rest/admin_users/${this.id}`, this.model)
        } else {
          const res = await this.$http.post('rest/admin_users', this.model)
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push('/admin_users')

      },
      async getUserList() {
        const res = await this.$http.get(`rest/admin_users/${this.id}`)
        this.model = res.data
      },
      
    },
    created() {
      if(this.id) {
        this.getUserList()
      }
    }
  }
</script>

<style>
  
</style>
