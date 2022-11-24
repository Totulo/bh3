<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <h1>{{ id ? '编辑' : '新建' }}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select  v-model="items.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input  v-model="items.name"></el-input>
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
        items: {},
        parents: []
      }
    },
    methods: {
      async save() {
        if (this.id) {
          const res = await this.$http.put (`rest/categories/${this.id}`, this.items)
        } else {
          const res = await this.$http.post('rest/categories', this.items)
        }
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push('/categories')

      },
      async getItems() {
        const res = await this.$http.get(`rest/categories/${this.id}`)
        this.items = res.data
      },
      async getParents() {
        const res = await this.$http.get('rest/categories')
        this.parents = res.data
        
      }
      
    },
    created() {
      this.getParents()
      if(this.id) {
        this.getItems()
      }
    }
  }
</script>